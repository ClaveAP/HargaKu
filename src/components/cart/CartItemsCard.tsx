'use client';

import { useState } from 'react';
import {
  Plus,
  Minus,
  Trash,
  PlusCircle,
  CaretDown,
  ShoppingCartSimple,
} from '@phosphor-icons/react';
import { CartItem, AVAILABLE_COMMODITIES_TO_ADD } from './cart-data';
import { formatRupiah } from '@/lib/utils';

interface Props {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: (item: CartItem) => void;
}

export function CartItemsCard({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddItem,
}: Props) {
  const [selectedToAddId, setSelectedToAddId] = useState<string>(
    AVAILABLE_COMMODITIES_TO_ADD[0]?.id || ''
  );

  const availableToAdd = AVAILABLE_COMMODITIES_TO_ADD.filter(
    (a) => !items.some((i) => i.id === a.id)
  );

  const handleAdd = () => {
    const itemToAdd = AVAILABLE_COMMODITIES_TO_ADD.find(
      (a) => a.id === selectedToAddId
    );
    if (!itemToAdd) return;

    onAddItem({
      id: itemToAdd.id,
      name: itemToAdd.name,
      unit: itemToAdd.unit,
      quantity: 1,
      avgPricePerUnit: itemToAdd.avgPricePerUnit,
      pricesByMarket: itemToAdd.pricesByMarket,
    });
  };

  return (
    <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-5 sm:p-7 shadow-xs flex flex-col gap-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E3DE]">
        <div className="flex items-center gap-2.5">
          <ShoppingCartSimple size={20} weight="bold" className="text-[#1B1A18]" />
          <h2 className="text-[17px] font-bold text-[#1B1A18] tracking-tight">
            Daftar Komoditas Belanja
          </h2>
        </div>
        <span className="text-[11px] font-bold text-[#1B1A18] bg-[#FAF9F5] px-2.5 py-0.5 rounded-full outline outline-1 outline-[#E5E3DE]">
          {items.length} Komoditas
        </span>
      </div>

      {/* Items List */}
      <div className="divide-y divide-[#F4F3F0]">
        {items.map((item) => {
          const itemSubtotal = item.quantity * item.avgPricePerUnit;

          return (
            <div
              key={item.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#1B1A18]">
                  {item.name}
                </span>
                <span className="text-[11px] text-[#8E8D86]">
                  Rerata acuan: {formatRupiah(item.avgPricePerUnit)} / {item.unit}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5">
                {/* Stepper Counter */}
                <div className="flex items-center rounded-[8px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] p-0.5">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center text-[#1B1A18] hover:bg-white rounded-[6px] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <Minus size={12} weight="bold" />
                  </button>
                  <span className="w-10 text-center text-[13px] font-bold text-[#1B1A18] tabular-nums">
                    {item.quantity} {item.unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#1B1A18] hover:bg-white rounded-[6px] transition-colors"
                  >
                    <Plus size={12} weight="bold" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <span className="text-[14px] font-bold text-[#1B1A18] tabular-nums block">
                    {formatRupiah(itemSubtotal)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  title="Hapus komoditas"
                  className="p-1.5 rounded-[6px] text-[#8E8D86] hover:text-[#991B1B] hover:bg-[#FAF9F5] transition-colors"
                >
                  <Trash size={15} weight="bold" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add More Commodity Selector */}
      {availableToAdd.length > 0 && (
        <div className="pt-3 border-t border-[#E5E3DE] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <select
              value={selectedToAddId}
              onChange={(e) => setSelectedToAddId(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-[10px] bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] text-[12px] text-[#1B1A18] font-medium shadow-xs focus:outline-[#1B1A18] cursor-pointer"
            >
              {availableToAdd.map((a) => (
                <option key={a.id} value={a.id}>
                  + {a.name} ({formatRupiah(a.avgPricePerUnit)}/{a.unit})
                </option>
              ))}
            </select>
            <CaretDown
              size={13}
              weight="bold"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B85] pointer-events-none"
            />
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto py-2 px-4 rounded-[10px] bg-[#1B1A18] hover:bg-[#32312E] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0"
          >
            <PlusCircle size={15} weight="bold" />
            <span>Tambah ke Keranjang</span>
          </button>
        </div>
      )}
    </div>
  );
}
