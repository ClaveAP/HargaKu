'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, INITIAL_CART_ITEMS } from '@/components/cart/cart-data';

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  resetDefaults: () => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'hargaku_user_cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync with localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage errors in restricted contexts
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Persist to localStorage whenever items change after initial load
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }, [items, isInitialized]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
          avgPricePerUnit: item.avgPricePerUnit || updated[existingIndex].avgPricePerUnit,
        };
        return updated;
      }
      return [...prev, { ...item, quantity: qty, pricesByMarket: item.pricesByMarket || {} }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
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

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetDefaults = () => {
    setItems(INITIAL_CART_ITEMS);
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        resetDefaults,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
