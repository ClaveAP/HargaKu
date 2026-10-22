'use client';

import React, { useState, useEffect } from 'react';
import type { AdminCommodity, CommodityCategory } from '@/lib/types/admin';
import { X } from '@phosphor-icons/react';

interface CommodityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: AdminCommodity | null;
  onSave: (commodity: AdminCommodity) => void;
}

const CATEGORIES: Array<{ value: CommodityCategory; label: string }> = [
  { value: 'CABAI_BAWANG', label: 'Cabai & Bawang' },
  { value: 'BERAS', label: 'Beras & Padi' },
  { value: 'DAGING', label: 'Daging, Telur & Unggas' },
  { value: 'MINYAK', label: 'Minyak & Gula' },
  { value: 'SAYUR', label: 'Sayur Mayur' },
];

export function CommodityFormModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: CommodityFormModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<CommodityCategory>('CABAI_BAWANG');
  const [unit, setUnit] = useState('kg');
  const [hapHetPrice, setHapHetPrice] = useState('');
  const [tolerancePercentage, setTolerancePercentage] = useState('10');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setCategory(initialData.category);
      setUnit(initialData.unit);
      setHapHetPrice(initialData.hapHetPrice.toString());
      setTolerancePercentage(initialData.tolerancePercentage.toString());
      setIsActive(initialData.isActive);
      setError('');
    } else {
      setName('');
      setSlug('');
      setCategory('CABAI_BAWANG');
      setUnit('kg');
      setHapHetPrice('');
      setTolerancePercentage('10');
      setIsActive(true);
      setError('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama komoditas wajib diisi.');
      return;
    }
    const priceNum = parseInt(hapHetPrice, 10);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Harga acuan HAP/HET harus berupa angka positif.');
      return;
    }
    const tolNum = parseFloat(tolerancePercentage) || 10;

    const savedItem: AdminCommodity = {
      id: initialData?.id || slug || `com_${Date.now()}`,
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      category,
      unit: unit.trim() || 'kg',
      hapHetPrice: priceNum,
      tolerancePercentage: tolNum,
      isActive,
    };

    onSave(savedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white border border-[#E5E3DE] rounded-[24px] shadow-2xl p-6 z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <h2 className="text-lg font-semibold text-[#1B1A18]">
            {initialData ? 'Edit Komoditas Pangan' : 'Tambah Komoditas Baru'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#706E6A] hover:text-[#1B1A18] rounded-xl border border-[#E5E3DE]"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1B1A18]">Nama Komoditas</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Contoh: Cabai Rawit Merah Super"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CommodityCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Satuan Standar</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="kg / liter / ikat"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Harga Acuan HAP (Rp)</label>
              <input
                type="number"
                value={hapHetPrice}
                onChange={(e) => setHapHetPrice(e.target.value)}
                placeholder="57000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Toleransi Wajar (±%)</label>
              <input
                type="number"
                value={tolerancePercentage}
                onChange={(e) => setTolerancePercentage(e.target.value)}
                placeholder="10"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#1B1A18] border-[#E5E3DE] focus:ring-0"
            />
            <label htmlFor="isActive" className="text-xs font-medium text-[#1B1A18] cursor-pointer">
              Tampilkan di Website Publik (Status Aktif)
            </label>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E3DE]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E5E3DE] bg-white text-xs font-semibold text-[#706E6A] hover:bg-[#FAF9F5]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Simpan Komoditas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
