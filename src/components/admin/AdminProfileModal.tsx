'use client';

import React, { useState, useEffect } from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import { DEFAULT_ADMIN_USER } from '@/lib/store/admin-seed';
import {
  X,
  User,
  ShieldCheck,
  LockKey,
  ClockCounterClockwise,
  CheckCircle,
} from '@phosphor-icons/react';

interface AdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminProfileModal({ isOpen, onClose }: AdminProfileModalProps) {
  const { currentUser, updateProfile } = useAdminStore();
  const user = currentUser || DEFAULT_ADMIN_USER;

  const [activeTab, setActiveTab] = useState<'PROFILE' | 'SECURITY' | 'AUDIT'>('PROFILE');

  const getCleanName = (val?: string) =>
    val?.toLowerCase().includes('hendra') ? 'Admin' : val || 'Admin';
  const getCleanEmail = (val?: string) =>
    val?.toLowerCase().includes('hendra') ? 'admin@hargaku.id' : val || 'admin@hargaku.id';

  // Form states
  const [name, setName] = useState(getCleanName(user.name || user.fullName));
  const [email, setEmail] = useState(getCleanEmail(user.email));
  const [successMessage, setSuccessMessage] = useState('');

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) {
      setName(getCleanName(user.name || user.fullName));
      setEmail(getCleanEmail(user.email));
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      fullName: name.trim(),
      email: email.trim(),
    });
    setSuccessMessage('Pengaturan profil berhasil disimpan!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!oldPassword) {
      setPasswordError('Kata sandi saat ini wajib diisi.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Kata sandi baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSuccessMessage('Kata sandi berhasil diperbarui!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white border border-[#E5E3DE] rounded-[24px] shadow-2xl p-6 z-10 space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E5E3DE] bg-[#FAF9F5] shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#EEF773] text-[#1B1A18] font-bold text-xs">
                  AD
                </div>
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1B1A18]">
                Pengaturan Akun Admin
              </h2>
              <span className="text-xs text-[#706E6A]">
                {user.email || 'admin@hargaku.id'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#706E6A] hover:text-[#1B1A18] rounded-xl border border-[#E5E3DE]"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 border-b border-[#E5E3DE] pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('PROFILE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'PROFILE'
                ? 'bg-[#1B1A18] text-white'
                : 'text-[#706E6A] hover:bg-[#FAF9F5]'
            }`}
          >
            <User size={14} weight="bold" />
            <span>Profil</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SECURITY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'SECURITY'
                ? 'bg-[#1B1A18] text-white'
                : 'text-[#706E6A] hover:bg-[#FAF9F5]'
            }`}
          >
            <LockKey size={14} weight="bold" />
            <span>Kata Sandi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('AUDIT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'AUDIT'
                ? 'bg-[#1B1A18] text-white'
                : 'text-[#706E6A] hover:bg-[#FAF9F5]'
            }`}
          >
            <ClockCounterClockwise size={14} weight="bold" />
            <span>Sesi Aktif</span>
          </button>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700 flex items-center gap-2">
            <CheckCircle size={16} weight="fill" />
            <span>{successMessage}</span>
          </div>
        )}
        {passwordError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {passwordError}
          </div>
        )}

        {/* Tab Content: Profile */}
        {activeTab === 'PROFILE' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1B1A18]">Nama Tampilan</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-sm text-[#1B1A18] focus:bg-white focus:outline-[#1B1A18]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1B1A18]">Email Administrator</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-sm text-[#1B1A18] focus:bg-white focus:outline-[#1B1A18]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DE] text-xs text-[#706E6A] space-y-1">
              <div className="flex justify-between">
                <span>Peran:</span>
                <span className="font-semibold text-[#1B1A18]">Administrator Penuh</span>
              </div>
              <div className="flex justify-between">
                <span>Hak Akses:</span>
                <span className="font-semibold text-[#15803D]">CRUD Komoditas, Pasar, Harga &amp; Moderasi</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}

        {/* Tab Content: Security */}
        {activeTab === 'SECURITY' && (
          <form onSubmit={handleSavePassword} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#1B1A18]">Kata Sandi Saat Ini</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-sm text-[#1B1A18] focus:bg-white focus:outline-[#1B1A18]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1B1A18]">Kata Sandi Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 karakter"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-sm text-[#1B1A18] focus:bg-white focus:outline-[#1B1A18]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1B1A18]">Ulangi Kata Sandi Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi sandi baru"
                  className="w-full px-3 py-2 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] text-sm text-[#1B1A18] focus:bg-white focus:outline-[#1B1A18]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        )}

        {/* Tab Content: Audit */}
        {activeTab === 'AUDIT' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E5E3DE] space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[#706E6A]">Status Sesi:</span>
                <span className="text-[#15803D] font-bold flex items-center gap-1">
                  <ShieldCheck size={14} weight="fill" />
                  Aktif &amp; Terverifikasi
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#706E6A]">Token Autentikasi:</span>
                <span className="font-mono text-[#1B1A18]">JWT-SHA256 (Exp: 24 Jam)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
