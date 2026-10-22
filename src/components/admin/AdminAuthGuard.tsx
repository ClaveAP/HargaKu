'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticatedAdmin } from '@/lib/auth/admin-auth';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check local session validity
    if (!isAuthenticatedAdmin()) {
      router.replace('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EEF773] border-1.5 border-[#1B1A18] flex items-center justify-center font-bold text-base text-[#1B1A18] shadow-[2px_2px_0px_#1B1A18] animate-bounce">
          H.
        </div>
        <div className="text-xs font-semibold text-[#1B1A18]">
          Memverifikasi Otorisasi Petugas TPID...
        </div>
        <span className="text-[11px] text-[#706E6A]">
          Mengalihkan ke portal masuk jika sesi tidak valid.
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
