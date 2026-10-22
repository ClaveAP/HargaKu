'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/lib/store/admin-store';
import { DEFAULT_ADMIN_USER } from '@/lib/store/admin-seed';
import { logoutAdmin } from '@/lib/auth/admin-auth';
import { AdminProfileModal } from './AdminProfileModal';
import { AdminHelpModal } from './AdminHelpModal';
import {
  List,
  ArrowSquareOut,
  Gear,
  Question,
  SignOut,
  CaretDown,
} from '@phosphor-icons/react';

interface AdminTopbarProps {
  onOpenMobileSidebar: () => void;
}

export function AdminTopbar({ onOpenMobileSidebar }: AdminTopbarProps) {
  const router = useRouter();
  const { currentUser } = useAdminStore();
  const user = currentUser || DEFAULT_ADMIN_USER;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  const rawName = user?.name || user?.fullName || 'Admin';
  const displayName = rawName.toLowerCase().includes('hendra') ? 'Admin' : rawName;
  const rawEmail = user?.email || 'admin@hargaku.id';
  const displayEmail = rawEmail.toLowerCase().includes('hendra')
    ? 'admin@hargaku.id'
    : rawEmail;
  const avatarSrc =
    user?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';

  return (
    <>
      <header className="w-full bg-white border border-[#E5E3DE] rounded-[20px] px-4 sm:px-6 py-3.5 shadow-sm flex items-center justify-between gap-4">
        {/* Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            aria-label="Buka Menu Navigasi Admin"
            className="lg:hidden p-2 text-[#1B1A18] hover:bg-[#FAF9F5] border border-[#E5E3DE] rounded-xl transition-colors"
          >
            <List size={20} weight="bold" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EEF773] border-1.5 border-[#1B1A18] flex items-center justify-center font-bold text-sm text-[#1B1A18] shadow-[1px_1px_0px_#1B1A18]">
              H.
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#1B1A18]">
                  HargaKu Console
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FAF9F5] text-[#1B1A18] border border-[#E5E3DE]">
                  Admin
                </span>
              </div>
              <span className="text-xs text-[#706E6A] hidden sm:inline">
                Pusat Kendali Data Pangan Kota Bogor
              </span>
            </div>
          </div>
        </div>

        {/* Public Site & Circular Profile Dropdown */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F3F0] text-[#1B1A18] border border-[#E5E3DE] text-xs font-medium transition-colors"
          >
            <span>Website Publik</span>
            <ArrowSquareOut size={14} weight="bold" />
          </Link>

          {/* Profile Trigger Button: Circular Avatar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              className="flex items-center gap-2.5 p-1 pr-2.5 rounded-full border border-[#E5E3DE] bg-[#FAF9F5] hover:bg-white text-xs text-[#1B1A18] transition-colors"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E5E3DE] bg-neutral-100 shrink-0">
                <img
                  src={avatarSrc}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-xs text-[#1B1A18] hidden sm:inline">
                {displayName}
              </span>
              <CaretDown size={12} weight="bold" className="text-[#706E6A]" />
            </button>

            {/* Profile Dropdown Popover */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#E5E3DE] rounded-2xl shadow-xl p-3 z-50 space-y-2">
                  {/* Account Header */}
                  <div className="flex items-center gap-3 p-2 border-b border-[#E5E3DE]">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E5E3DE] shrink-0">
                      <img
                        src={avatarSrc}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-xs text-[#1B1A18] truncate">
                        {displayName}
                      </span>
                      <span className="text-[11px] text-[#706E6A] truncate">
                        {displayEmail}
                      </span>
                    </div>
                  </div>

                  {/* Actions matching SaaS standards */}
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsProfileOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#FAF9F5] text-xs text-[#1B1A18] flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <Gear size={16} weight="bold" className="text-[#706E6A]" />
                      <span>Settings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsHelpOpen(true);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#FAF9F5] text-xs text-[#1B1A18] flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <Question size={16} weight="bold" className="text-[#706E6A]" />
                      <span>Help & Support</span>
                    </button>

                    <Link
                      href="/"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-[#FAF9F5] text-xs text-[#1B1A18] flex items-center gap-2.5 transition-colors font-medium sm:hidden"
                    >
                      <ArrowSquareOut size={16} weight="bold" className="text-[#706E6A]" />
                      <span>Lihat Website Publik</span>
                    </Link>

                    <div className="pt-1 border-t border-[#E5E3DE]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsLogoutModalOpen(true);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-red-50 text-xs text-red-600 flex items-center gap-2.5 transition-colors font-medium cursor-pointer"
                      >
                        <SignOut size={16} weight="bold" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <AdminProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <AdminHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Modern In-App Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsLogoutModalOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white border border-[#E5E3DE] rounded-[24px] shadow-2xl p-6 z-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <SignOut size={24} weight="bold" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-[#1B1A18]">
                Keluar dari Sesi Admin?
              </h3>
              <p className="text-xs text-[#706E6A] leading-relaxed">
                Apakah Anda yakin ingin keluar? Anda harus masuk kembali dengan kredensial administrator untuk mengelola data HargaKu.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] hover:bg-white text-xs font-semibold text-[#1B1A18] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
