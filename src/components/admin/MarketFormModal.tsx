'use client';

import React, { useState, useEffect } from 'react';
import type { AdminMarket } from '@/lib/types/admin';
import { X } from '@phosphor-icons/react';

interface MarketFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: AdminMarket | null;
  onSave: (market: AdminMarket) => void;
}

const STANDARD_DISTRICTS = [
  'Wilayah Sentral / Pusat',
  'Wilayah Utara',
  'Wilayah Selatan',
  'Wilayah Barat',
  'Wilayah Timur',
  'Kawasan Pasar Induk',
];

export function MarketFormModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: MarketFormModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [district, setDistrict] = useState(STANDARD_DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('-6.5925');
  const [longitude, setLongitude] = useState('106.7905');
  const [operatingHours, setOperatingHours] = useState('04:00 – 14:00 WIB');
  const [specialty, setSpecialty] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setDistrict(initialData.district);
      setAddress(initialData.address);
      setLatitude(initialData.latitude.toString());
      setLongitude(initialData.longitude.toString());
      setOperatingHours(initialData.operatingHours);
      setSpecialty(initialData.specialty);
      setIsActive(initialData.isActive);
      setError('');
    } else {
      setName('');
      setSlug('');
      setDistrict(STANDARD_DISTRICTS[0]);
      setAddress('');
      setLatitude('-6.5925');
      setLongitude('106.7905');
      setOperatingHours('04:00 – 14:00 WIB');
      setSpecialty('');
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
      setError('Nama pasar tradisional wajib diisi.');
      return;
    }
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);
    if (isNaN(latNum) || isNaN(lngNum)) {
      setError('Titik koordinat GPS latitude dan longitude harus berupa angka desimal.');
      return;
    }

    const savedMarket: AdminMarket = {
      id: initialData?.id || slug || `mkt_${Date.now()}`,
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      district,
      address: address.trim() || 'Pasar Tradisional',
      latitude: latNum,
      longitude: lngNum,
      operatingHours: operatingHours.trim() || '04:00 – 14:00 WIB',
      specialty: specialty.trim() || 'Komoditas Pangan Tradisional',
      isActive,
    };

    onSave(savedMarket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white border border-[#E5E3DE] rounded-[24px] shadow-2xl p-6 z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
          <h2 className="text-lg font-semibold text-[#1B1A18]">
            {initialData ? 'Edit Pasar Tradisional' : 'Tambah Pasar Tradisional Baru'}
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Nama Pasar</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Contoh: Pasar Anyar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Kecamatan / Wilayah</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              >
                {STANDARD_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1B1A18]">Alamat Lengkap</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Contoh: Jl. Merdeka No. 12"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Latitude GPS</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="-6.5925"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Longitude GPS</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="106.7905"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Jam Bongkar Muat</label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                placeholder="04:00 – 14:00 WIB"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1B1A18]">Spesialisasi Lapak</label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Sentra Cabai & Rempah"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DE] bg-[#FAF9F5] focus:bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isMarketActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#1B1A18] border-[#E5E3DE] focus:ring-0"
            />
            <label htmlFor="isMarketActive" className="text-xs font-medium text-[#1B1A18] cursor-pointer">
              Pantau Pasar di Peta Publik (Status Aktif)
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
              Simpan Pasar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
