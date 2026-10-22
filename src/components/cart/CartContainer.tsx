'use client';

import { useState } from 'react';
import { CartItem, INITIAL_CART_ITEMS } from './cart-data';
import { CartItemsCard } from './CartItemsCard';
import { CartMarketComparisonCard } from './CartMarketComparisonCard';
import { ShoppingCartSimple, ArrowCounterClockwise } from '@phosphor-icons/react';

export function CartContainer() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = (newItem: CartItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleResetDefaults = () => {
    setItems(INITIAL_CART_ITEMS);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[24px] outline outline-1 outline-[#E5E3DE] p-8 text-center flex flex-col items-center gap-4 max-w-[500px] mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#FAF9F5] outline outline-1 outline-[#E5E3DE] flex items-center justify-center text-[#8E8D86]">
          <ShoppingCartSimple size={24} weight="bold" />
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-[#1B1A18]">
            Keranjang Belanja Kosong
          </h3>
          <p className="text-[13px] text-[#6E6D67] mt-1">
            Belum ada komoditas di dalam daftar simulasi belanjaanmu.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetDefaults}
          className="py-2.5 px-4 rounded-[10px] bg-[#1B1A18] hover:bg-[#32312E] text-white text-[12px] font-semibold flex items-center gap-2 transition-colors shadow-xs"
        >
          <ArrowCounterClockwise size={14} weight="bold" />
          <span>Muat Paket Belanja Mingguan Contoh</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Cart Items List */}
      <div className="lg:col-span-7 xl:col-span-7">
        <CartItemsCard
          items={items}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onAddItem={handleAddItem}
        />
      </div>

      {/* Right Column: 5-Market Comparison & Best Route */}
      <div className="lg:col-span-5 xl:col-span-5">
        <CartMarketComparisonCard items={items} />
      </div>
    </div>
  );
}
