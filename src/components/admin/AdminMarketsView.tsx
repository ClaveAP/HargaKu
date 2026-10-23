'use client';

import React, { useState } from 'react';
import type { AdminMarket } from '@/lib/types/admin';
import { useAdminStore } from '@/lib/store/admin-store';
import { MarketFormModal } from './MarketFormModal';
import { AdminConfirmModal } from './AdminConfirmModal';
import { AdminPagination } from './AdminPagination';
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

const REGION_TO_ISLAND: Record<string, string> = {
  reg_jabar: 'JAWA',
  reg_jakarta: 'JAWA',
  reg_jateng: 'JAWA',
  reg_jatim: 'JAWA',
  reg_banten: 'JAWA',
  reg_diy: 'JAWA',
  reg_sumut: 'SUMATERA',
  reg_sumsel: 'SUMATERA',
  reg_sumbar: 'SUMATERA',
  reg_riau: 'SUMATERA',
  reg_lampung: 'SUMATERA',
  reg_kaltim: 'KALIMANTAN',
  reg_kalbar: 'KALIMANTAN',
  reg_kalsel: 'KALIMANTAN',
  reg_sulsel: 'SULAWESI',
  reg_sulut: 'SULAWESI',
  reg_bali: 'BALI_NUSRA',
  reg_ntb: 'BALI_NUSRA',
  reg_ntt: 'BALI_NUSRA',
  reg_maluku: 'MALUKU_PAPUA',
  reg_papua: 'MALUKU_PAPUA',
};

const ISLAND_TABS = [
  { id: 'ALL', label: 'Semua Wilayah' },
  { id: 'JAWA', label: 'Jawa' },
  { id: 'SUMATERA', label: 'Sumatera' },
  { id: 'KALIMANTAN', label: 'Kalimantan' },
  { id: 'SULAWESI', label: 'Sulawesi' },
  { id: 'BALI_NUSRA', label: 'Bali-Nusra' },
  { id: 'MALUKU_PAPUA', label: 'Maluku-Papua' },
];

const ITEMS_PER_PAGE = 10;

export function AdminMarketsView() {
  const { markets, addMarket, updateMarket, deleteMarket } = useAdminStore();

  const [search, setSearch] = useState('');
  const [selectedIsland, setSelectedIsland] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMarket | null>(null);
  const [deletingMarket, setDeletingMarket] = useState<{ id: string; name: string } | null>(null);

  const filtered = markets.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      (item.city && item.city.toLowerCase().includes(q)) ||
      (item.district && item.district.toLowerCase().includes(q)) ||
      (item.address && item.address.toLowerCase().includes(q));

    const itemIsland = (item.regionId && REGION_TO_ISLAND[item.regionId]) || 'JAWA';
    const matchesIsland = selectedIsland === 'ALL' || itemIsland === selectedIsland;

    return matchesSearch && matchesIsland;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMarkets = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleIslandChange = (islandId: string) => {
    setSelectedIsland(islandId);
    setCurrentPage(1);
  };

  const handleSave = (item: AdminMarket) => {
    if (editingItem) {
      updateMarket(item.id, item);
    } else {
      addMarket(item);
    }
  };

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
            Atur data pasar tradisional per koridor wilayah nusantara untuk titik peta spasial dan komparasi harga.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-xs font-bold shadow-[2px_2px_0px_#1B1A18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all self-start sm:self-auto shrink-0 cursor-pointer"
        >
          <Plus size={16} weight="bold" />
          <span>Tambah Pasar</span>
        </button>
      </div>

      {/* Filter and Search Bar: Full-width wrap (No Slider) */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari pasar, kota, atau kecamatan..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E3DE] bg-white text-sm text-[#1B1A18] focus:border-[#1B1A18] focus:outline-none"
          />
        </div>

        {/* Koridor Wilayah Pulau Tabs: Wrap naturally with zero gesture conflicts */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {ISLAND_TABS.map((tab) => {
            const isSelected = selectedIsland === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleIslandChange(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B1A18] text-white border-[#1B1A18] shadow-xs'
                    : 'bg-white text-[#706E6A] border-[#E5E3DE] hover:bg-[#FAF9F5] hover:text-[#1B1A18]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#E5E3DE] rounded-[24px] shadow-sm overflow-hidden min-h-[520px] flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm table-fixed">
            <thead className="bg-[#FAF9F5] border-b border-[#E5E3DE] text-xs font-semibold text-[#706E6A] uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5 w-[36%] min-w-[220px]">Pasar & Wilayah</th>
                <th className="px-5 py-3.5 w-[24%] min-w-[170px]">Titik GPS (Lat, Lng)</th>
                <th className="px-5 py-3.5 w-[20%] min-w-[140px]">Jam Operasional</th>
                <th className="px-5 py-3.5 w-[10%] min-w-[90px]">Status Peta</th>
                <th className="px-5 py-3.5 w-[10%] min-w-[100px] text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DE]">
              {paginatedMarkets.length > 0 ? (
                paginatedMarkets.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-[#1B1A18]">{item.name}</div>
                      <div className="text-xs text-[#706E6A]">
                        <span className="font-semibold text-[#1B1A18]">{item.city || 'Nasional'}</span> · {item.district}
                      </div>
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
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => updateMarket(item.id, { isActive: !item.isActive })}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
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
                    <td className="px-5 py-4 text-right pr-6">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItem(item);
                            setIsModalOpen(true);
                          }}
                          aria-label={`Edit ${item.name}`}
                          className="p-1.5 rounded-lg border border-[#E5E3DE] text-[#706E6A] hover:text-[#1B1A18] hover:bg-white cursor-pointer"
                        >
                          <PencilSimple size={16} weight="bold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingMarket({ id: item.id, name: item.name })}
                          aria-label={`Hapus ${item.name}`}
                          className="p-1.5 rounded-lg border border-[#E5E3DE] text-[#706E6A] hover:text-red-600 hover:border-red-200 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-xs text-[#706E6A]">
                    Tidak ada pasar tradisional yang sesuai dengan kata kunci pencarian atau wilayah ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <MarketFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingItem}
        onSave={handleSave}
      />

      <AdminConfirmModal
        isOpen={Boolean(deletingMarket)}
        onClose={() => setDeletingMarket(null)}
        onConfirm={() => {
          if (deletingMarket) {
            deleteMarket(deletingMarket.id);
            setDeletingMarket(null);
          }
        }}
        title={`Hapus ${deletingMarket?.name || 'Pasar'}?`}
        description="Pasar ini akan dihapus dari data pantauan dan tidak lagi muncul di komparasi harga maupun peta spasial."
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        variant="danger"
      />
    </div>
  );
}
