'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminModule } from '@/lib/types/admin';
import { useAdminStore } from '@/lib/store/admin-store';
import { DEFAULT_ADMIN_USER } from '@/lib/store/admin-seed';
import { logoutAdmin } from '@/lib/auth/admin-auth';
import { AdminConfirmModal } from './AdminConfirmModal';
import { AdminProfileModal } from './AdminProfileModal';
import { AdminHelpModal } from './AdminHelpModal';
import {
  ChartBar,
  ShieldCheck,
  Plant,
  Storefront,
  Lightning,
  ArrowsCounterClockwise,
  SignOut,
  Question,
  X,
} from '@phosphor-icons/react';

interface AdminSidebarProps {
  activeModule: AdminModule;
  onSelectModule: (module: AdminModule) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  activeModule,
  onSelectModule,
  isOpenMobile,
  onCloseMobile,
}: AdminSidebarProps) {
  const router = useRouter();
  const { commodities, markets, reports, resetToDefaultData, currentUser } = useAdminStore();
  const user = currentUser || DEFAULT_ADMIN_USER;

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  const rawName = user?.name || user?.fullName || 'Admin';
  const displayName = rawName.toLowerCase().includes('hendra') ? 'Admin' : rawName;
  const avatarSrc =
    user?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';

  const pendingReportsCount = reports.filter(
    (r) => r.status === 'PENDING' || r.status === 'ANOMALY'
  ).length;

  const menuItems: Array<{
    id: AdminModule;
    label: string;
    description: string;
    icon: React.ComponentType<{ size?: number; weight?: 'regular' | 'bold' | 'fill' }>;
    badge?: number;
    badgeColor?: string;
  }> = [
    {
      id: 'overview',
      label: 'Ringkasan',
      description: 'Kesehatan & metrik pangan',
      icon: ChartBar,
    },
    {
      id: 'reports',
      label: 'Moderasi Laporan',
      description: 'Verifikasi nota & anomali',
      icon: ShieldCheck,
      badge: pendingReportsCount,
      badgeColor: 'bg-[#FF7714] text-white',
    },
    {
      id: 'commodities',
      label: 'Katalog Komoditas',
      description: 'Master data & batas harga',
      icon: Plant,
    },
    {
      id: 'markets',
      label: 'Pasar Tradisional',
      description: 'Titik pantau & koordinat GPS',
      icon: Storefront,
    },
    {
      id: 'daily-prices',
      label: 'Entri Harga Harian',
      description: 'Matriks survei 06:00 WIB',
      icon: Lightning,
    },
  ];

  const handleReset = () => {
    setIsResetConfirmOpen(true);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between gap-6">
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#A8A29E]">
          Menu Utama Admin
        </div>

        {menuItems.map((item) => {
          const isActive = activeModule === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectModule(item.id);
                onCloseMobile();
              }}
              className={`w-full text-left px-3.5 py-3 rounded-2xl border transition-all flex items-center justify-between group ${
                isActive
                  ? 'bg-white border-[#1B1A18] shadow-[2px_2px_0px_#1B1A18] text-[#1B1A18]'
                  : 'bg-transparent border-transparent hover:bg-white hover:border-[#E5E3DE] text-[#44403C]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18]'
                      : 'bg-[#F4F3F0] text-[#706E6A] group-hover:bg-[#FAF9F5]'
                  }`}
                >
                  <Icon size={18} weight={isActive ? 'bold' : 'regular'} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-sm font-medium truncate ${
                      isActive ? 'text-[#1B1A18] font-semibold' : 'text-[#292524]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[11px] text-[#A8A29E] truncate">
                    {item.description}
                  </span>
                </div>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                    item.badgeColor || 'bg-[#1B1A18] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pinned Bottom Area: Profile & Utility */}
      <div className="pt-3 border-t border-[#E5E3DE] mt-auto flex flex-col gap-2 shrink-0">
        {/* User Profile Card */}
        <div className="p-2 rounded-2xl bg-white border border-[#E5E3DE] flex items-center justify-between gap-2 shadow-2xs">
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2.5 min-w-0 flex-1 text-left hover:opacity-85 transition-opacity cursor-pointer"
            title="Buka Profil & Pengaturan Akun"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#E5E3DE] bg-neutral-100 shrink-0">
              <img
                src={avatarSrc}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#1B1A18] truncate leading-tight">
                {displayName}
              </span>
              <span className="text-[10px] text-[#706E6A] truncate">
                Petugas Pengawas
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="p-1.5 rounded-lg text-[#A8A29E] hover:text-[#DC2626] hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
            title="Keluar dari Konsol Admin"
          >
            <SignOut size={16} weight="bold" />
          </button>
        </div>

        {/* Reset Demo & Help Utilities */}
        <div className="px-2 flex items-center justify-between text-[11px] text-[#A8A29E]">
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-[#1B1A18] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Kembalikan data ke simulasi awal"
          >
            <ArrowsCounterClockwise size={12} weight="bold" />
            <span>Reset Demo</span>
          </button>

          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="hover:text-[#1B1A18] transition-colors flex items-center gap-1 cursor-pointer"
            title="Panduan Operasional & Bantuan Admin"
          >
            <Question size={12} weight="bold" />
            <span>Bantuan</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Full-Height Sidebar - Perfectly sized to fit viewport on load */}
      <aside className="hidden lg:flex flex-col justify-between w-[240px] shrink-0 bg-[#FAF9F5] p-2.5 border border-[#E5E3DE] rounded-[24px] sticky top-6 h-[calc(100vh-8.5rem)] min-h-[480px] shadow-2xs">
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-[280px] max-w-[85vw] bg-[#FAF9F5] h-full p-5 shadow-2xl flex flex-col justify-between border-r border-[#E5E3DE] z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E3DE]">
              <span className="font-semibold text-sm text-[#1B1A18]">
                Navigasi Admin
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 text-[#706E6A] hover:text-[#1B1A18] rounded-lg border border-[#E5E3DE]"
              >
                <X size={16} weight="bold" />
              </button>
            </div>
            <div className="py-4 flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}

      {/* Profile Management Modal */}
      <AdminProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Help & Support Modal */}
      <AdminHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Logout Confirmation Modal */}
      <AdminConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Konfirmasi Keluar"
        description="Apakah Anda yakin ingin keluar dari Konsol Admin HargaKu? Sesi otorisasi Anda akan diakhiri."
        confirmLabel="Ya, Keluar"
        cancelLabel="Batal"
        variant="warning"
      />

      {/* Reset Confirmation Modal */}
      <AdminConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetToDefaultData}
        title="Kembalikan Dataset Awal?"
        description="Seluruh perubahan data komoditas, pasar, dan laporan warga akan dikembalikan ke kondisi awal demonstrasi simulasi."
        confirmLabel="Ya, Reset Data"
        cancelLabel="Batal"
        variant="warning"
      />
    </>
  );
}
