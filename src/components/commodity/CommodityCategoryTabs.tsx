'use client';

import { CommodityCategory } from '@/types';

interface Props {
  selectedCategory: CommodityCategory | 'ALL';
  onSelectCategory: (category: CommodityCategory | 'ALL') => void;
}

const CATEGORIES: Array<{ key: CommodityCategory | 'ALL'; label: string }> = [
  { key: 'ALL', label: 'Semua Komoditas' },
  { key: 'CABAI_BAWANG', label: 'Cabai & Bawang' },
  { key: 'BERAS', label: 'Beras' },
  { key: 'DAGING_TELUR', label: 'Daging & Telur' },
  { key: 'MINYAK_GULA', label: 'Minyak & Gula' },
];

export function CommodityCategoryTabs({ selectedCategory, onSelectCategory }: Props) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.key;
        return (
          <button
            key={cat.key}
            type="button"
            onClick={() => onSelectCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              isSelected
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
