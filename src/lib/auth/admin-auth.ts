import type { AdminUserProfile } from '../types/admin.ts';
import { DEFAULT_ADMIN_USER } from '../store/admin-seed.ts';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthSession {
  token: string;
  user: AdminUserProfile;
  expiresAt: number;
}

export const AUTH_SESSION_KEY = 'hargaku_admin_session';

export const DEMO_ADMIN_CREDENTIALS = {
  email: 'admin@hargaku.id',
  password: 'admin',
};

export async function loginAdmin(
  credentials: LoginCredentials
): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
  // Simulate network latency for authentic feel
  await new Promise((resolve) => setTimeout(resolve, 150));

  const trimmedEmail = credentials.email.trim().toLowerCase();
  const trimmedPassword = credentials.password.trim();

  const isMatch =
    (trimmedEmail === 'admin@hargaku.id' ||
      trimmedEmail === 'admin' ||
      trimmedEmail === DEFAULT_ADMIN_USER.email.toLowerCase()) &&
    (trimmedPassword === 'admin' ||
      trimmedPassword === 'admin123' ||
      trimmedPassword === 'admin2026!');

  if (!isMatch) {
    return {
      success: false,
      error: 'Email atau kata sandi tidak valid.',
    };
  }

  // 24 hour expiry (or 7 days if remember me is active)
  const durationMs = credentials.rememberMe
    ? 7 * 24 * 60 * 60 * 1000
    : 24 * 60 * 60 * 1000;

  const session: AuthSession = {
    token: `tpid_jwt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    user: {
      ...DEFAULT_ADMIN_USER,
      lastLogin: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
    },
    expiresAt: Date.now() + durationMs,
  };

  try {
    if (typeof window !== 'undefined' || typeof localStorage !== 'undefined') {
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    }
  } catch {
    // Graceful fallback if localStorage is disabled
  }

  return {
    success: true,
    session,
  };
}

export function logoutAdmin(): void {
  try {
    if (typeof window !== 'undefined' || typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_SESSION_KEY);
    }
  } catch {
    // Ignore errors
  }
}

export function getAdminSession(): AuthSession | null {
  try {
    if (typeof window === 'undefined' && typeof localStorage === 'undefined') {
      return null;
    }
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed || !parsed.token || !parsed.expiresAt) return null;

    // Check expiry
    if (Date.now() > parsed.expiresAt) {
      logoutAdmin();
      return null;
    }

    // Sanitize legacy persona if user browser had stale storage
    const userName = parsed.user?.name || parsed.user?.fullName || '';
    const userEmail = parsed.user?.email || '';
    if (
      userName.toLowerCase().includes('hendra') ||
      userEmail.toLowerCase().includes('hendra')
    ) {
      parsed.user = {
        ...DEFAULT_ADMIN_USER,
        lastLogin: parsed.user?.lastLogin || DEFAULT_ADMIN_USER.lastLogin,
      };
      try {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(parsed));
      } catch {}
    }

    return parsed;
  } catch {
    return null;
  }
}

export function isAuthenticatedAdmin(): boolean {
  return getAdminSession() !== null;
}
