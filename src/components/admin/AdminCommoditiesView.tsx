'use client';

import React, { useState } from 'react';
import type { AdminCommodity, CommodityCategory } from '@/lib/types/admin';
import { useAdminStore } from '@/lib/store/admin-store';
import { CommodityFormModal } from './CommodityFormModal';
import {
  Plus,
  MagnifyingGlass,
  PencilSimple,
  Trash,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react';

export function AdminCommoditiesView() {
  const { commodities, addCommodity, updateCommodity, deleteCommodity } =
    useAdminStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminCommodity | null>(null);

  const filtered = commodities.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AdminCommodity) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (item: AdminCommodity) => {
    if (editingItem) {
      updateCommodity(item.id, item);
    } else {
      addCommodity(item);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus komoditas "${name}" dari website publik?`)) {
      deleteCommodity(id);
    }
  };

  const handleToggleActive = (item: AdminCommodity) => {
    updateCommodity(item.id, { isActive: !item.isActive });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF7714]">
            Katalog Pangan Publik
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-[#1B1A18] mt-0.5">
            Kelola Komoditas Pangan
          </h1>
          <p className="text-sm text-[#706E6A]">
            Atur nama, kategori, harga acuan HAP/HET Bapanas, dan status tayang di publik.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all self-start sm:self-auto shrink-0"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Komoditas</span>
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
            placeholder="Cari komoditas..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E3DE] bg-white text-sm text-[#1B1A18] focus:outline-[#1B1A18]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'CABAI_BAWANG', 'BERAS', 'DAGING', 'MINYAK', 'SAYUR'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#1B1A18] text-white border-[#1B1A18]'
                    : 'bg-white text-[#706E6A] border-[#E5E3DE] hover:bg-[#FAF9F5]'
                }`}
              >
                {cat === 'ALL'
                  ? 'Semua'
                  : cat === 'CABAI_BAWANG'
                  ? 'Cabai/Bawang'
                  : cat === 'BERAS'
                  ? 'Beras'
                  : cat === 'DAGING'
                  ? 'Daging/Telur'
                  : cat === 'MINYAK'
                  ? 'Minyak/Gula'
                  : 'Sayur'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F5] border-b border-[#E5E3DE] text-xs font-semibold text-[#706E6A] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Komoditas</th>
                <th className="px-5 py-3.5">Kategori</th>
                <th className="px-5 py-3.5">Satuan</th>
                <th className="px-5 py-3.5">HAP Acuan Resmi</th>
                <th className="px-5 py-3.5">Toleransi</th>
                <th className="px-5 py-3.5">Status Publik</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DE]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-[#1B1A18]">{item.name}</div>
                    <div className="text-xs text-[#A8A29E]">{item.slug}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF9F5] border border-[#E5E3DE] text-[#44403C]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#706E6A] font-mono text-xs">
                    {item.unit}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#1B1A18]">
                    Rp {item.hapHetPrice.toLocaleString('id-ID')}
                  </td>
                  <td className="px-5 py-4 text-xs text-[#706E6A]">
                    ±{item.tolerancePercentage}%
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

      <CommodityFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingItem}
        onSave={handleSave}
      />
    </div>
  );
}
