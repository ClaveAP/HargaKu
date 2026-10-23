'use client';

import React from 'react';
import { Warning, Trash, ArrowsCounterClockwise } from '@phosphor-icons/react';

interface AdminConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'neutral';
}

export function AdminConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'danger',
}: AdminConfirmModalProps) {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white border border-[#E5E3DE] rounded-[24px] shadow-2xl p-6 z-10 text-center space-y-4">
        <div
          className={`w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto ${
            isDanger
              ? 'bg-red-50 border-red-200 text-red-600'
              : 'bg-[#FFF3ED] border-[#FFD8C2] text-[#FF7714]'
          }`}
        >
          {isDanger ? (
            <Trash size={22} weight="bold" />
          ) : (
            <ArrowsCounterClockwise size={22} weight="bold" />
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-[#1B1A18]">{title}</h3>
          <p className="text-xs text-[#706E6A] leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] hover:bg-white text-xs font-semibold text-[#1B1A18] transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-[#1B1A18] hover:bg-black text-white'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
