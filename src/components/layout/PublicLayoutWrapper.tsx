'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SimulationBadge } from '@/components/ui/SimulationBadge';

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // If viewing the admin console, isolate it completely from the public consumer layout
  if (isAdminRoute) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-[#F4F3F0] text-[#1B1A18]">
        {children}
      </div>
    );
  }

  // Standard public consumer website layout with marquee, navbar, and footer
  return (
    <>
      <SimulationBadge />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
