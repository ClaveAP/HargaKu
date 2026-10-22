'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  loginAdmin,
  isAuthenticatedAdmin,
} from '@/lib/auth/admin-auth';
import {
  LockKey,
  EnvelopeSimple,
  Eye,
  EyeSlash,
  ArrowRight,
  ArrowLeft,
  WarningCircle,
  CheckCircle,
} from '@phosphor-icons/react';

export function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticatedAdmin()) {
      router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email dan kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);
    const result = await loginAdmin({ email, password, rememberMe });
    setIsLoading(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 400);
    } else {
      setErrorMessage(result.error || 'Email atau kata sandi tidak valid.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-[#E5E3DE] rounded-[28px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EEF773] border-1.5 border-[#1B1A18] flex items-center justify-center font-bold text-base text-[#1B1A18] shadow-[1px_1px_0px_#1B1A18]">
            H.
          </div>
          <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF9F5] text-[#1B1A18] border border-[#E5E3DE]">
            ADMIN CONSOLE
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1B1A18]">
            Masuk ke Dashboard Admin
          </h1>
          <p className="text-xs text-[#706E6A] mt-1">
            Gunakan akun administrator untuk mengakses panel kontrol HargaKu.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600 flex items-center gap-2">
          <WarningCircle size={16} weight="fill" className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700 flex items-center gap-2">
          <CheckCircle size={16} weight="fill" className="shrink-0" />
          <span>Autentikasi berhasil! Mengalihkan...</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1B1A18]">Email Administrator</label>
          <div className="relative">
            <EnvelopeSimple size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hargaku.id"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1B1A18]">Kata Sandi</label>
          <div className="relative">
            <LockKey size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1B1A18]"
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#706E6A]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#E5E3DE] text-[#1B1A18] focus:ring-0"
            />
            <span>Ingat sesi saya</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full py-3 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        >
          <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
          <ArrowRight size={16} weight="bold" />
        </button>
      </form>

      {/* Back to public link */}
      <div className="text-center pt-2 border-t border-[#E5E3DE]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#706E6A] hover:text-[#1B1A18] transition-colors"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Kembali ke Website Publik</span>
        </Link>
      </div>
    </div>
  );
}
