'use client';

import React, { useState } from 'react';
import type { AdminMarket } from '@/lib/types/admin';
import { useAdminStore } from '@/lib/store/admin-store';
import { MarketFormModal } from './MarketFormModal';
import {
  Plus,
  MagnifyingGlass,
  PencilSimple,
  Trash,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
} from '@phosphor-icons/react';

export function AdminMarketsView() {
  const { markets, addMarket, updateMarket, deleteMarket } = useAdminStore();

  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMarket | null>(null);

  const filtered = markets.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict =
      selectedDistrict === 'ALL' || item.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AdminMarket) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (item: AdminMarket) => {
    if (editingItem) {
      updateMarket(item.id, item);
    } else {
      addMarket(item);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus "${name}" dari daftar pantauan pasar publik?`)) {
      deleteMarket(id);
    }
  };

  const handleToggleActive = (item: AdminMarket) => {
    updateMarket(item.id, { isActive: !item.isActive });
  };

  const districts = ['ALL', ...Array.from(new Set(markets.map((m) => m.district)))];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7714]">
            Titik Pantau Spasial
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-[#1B1A18] mt-0.5">
            Kelola Pasar Tradisional
          </h1>
          <p className="text-sm text-[#706E6A]">
            Atur data pasar tradisional di Kota Bogor untuk titik koordinat Leaflet dan komparasi harga.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all self-start sm:self-auto shrink-0"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Pasar</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pasar tradisional atau kecamatan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E3DE] bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {districts.map((dist) => (
            <button
              key={dist}
              type="button"
              onClick={() => setSelectedDistrict(dist)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors shrink-0 ${
                selectedDistrict === dist
                  ? 'bg-[#1B1A18] text-white border-[#1B1A18]'
                  : 'bg-white text-[#706E6A] border-[#E5E3DE] hover:bg-[#FAF9F5]'
              }`}
            >
              {dist === 'ALL' ? 'Semua Wilayah' : dist}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F5] border-b border-[#E5E3DE] text-xs font-semibold text-[#706E6A] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Pasar & Wilayah</th>
                <th className="px-5 py-3.5">Titik GPS (Lat, Lng)</th>
                <th className="px-5 py-3.5">Jam Operasional</th>
                <th className="px-5 py-3.5">Sentra Spesialisasi</th>
                <th className="px-5 py-3.5">Status Peta</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DE]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-[#1B1A18]">{item.name}</div>
                    <div className="text-xs text-[#706E6A]">{item.district} · {item.address}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#E5E3DE] text-xs font-mono text-[#44403C]">
                      <MapPin size={13} weight="fill" className="text-[#FF7714]" />
                      <span>{item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#706E6A]">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#A8A29E]" />
                      <span>{item.operatingHours}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#1B1A18]">
                    {item.specialty}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        item.isActive
                          ? 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]'
                          : 'bg-[#F4F3F0] text-[#706E6A] border-[#E5E3DE]'
                      }`}
                    >
                      {item.isActive ? (
                        <>
                          <CheckCircle size={14} weight="fill" />
                          <span>Aktif</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} weight="fill" />
                          <span>Nonaktif</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        aria-label={`Edit ${item.name}`}
                        className="p-1.5 rounded-lg border border-[#E5E3DE] text-[#706E6A] hover:text-[#1B1A18] hover:bg-white"
                      >
                        <PencilSimple size={16} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        aria-label={`Hapus ${item.name}`}
                        className="p-1.5 rounded-lg border border-[#E5E3DE] text-[#706E6A] hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MarketFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingItem}
        onSave={handleSave}
      />
    </div>
  );
}
