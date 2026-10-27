'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SimulationBadge } from '@/components/ui/SimulationBadge';
import { RegionProvider } from '@/lib/store/region-store';
import { AssistantProvider } from '@/lib/store/assistant-store';
import { AdminStoreProvider } from '@/lib/store/admin-store';
import { CartProvider } from '@/lib/store/cart-store';
import { AssistantDrawer } from '@/components/assistant/AssistantDrawer';

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <AdminStoreProvider>
      <RegionProvider>
        <AssistantProvider>
          <CartProvider>
            {isAdminRoute ? (
              <div className="min-h-screen w-full flex flex-col bg-[#F4F3F0] text-[#1B1A18]">
                {children}
              </div>
            ) : (
              <>
                <SimulationBadge />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <AssistantDrawer />
              </>
            )}
          </CartProvider>
        </AssistantProvider>
      </RegionProvider>
    </AdminStoreProvider>
  );
}
