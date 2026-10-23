'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, ChatCircleDots } from '@phosphor-icons/react';
import { RegionSelector } from '@/components/common/RegionSelector';
import { useAssistant } from '@/lib/store/assistant-store';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Harga' },
  { href: '/cek-harga', label: 'Cek Harga' },
  { href: '/peta', label: 'Peta' },
  { href: '/lapor', label: 'Lapor Harga' },
  { href: '/keranjang', label: 'Keranjang' },
];

export function Navbar() {
  const { openAssistant } = useAssistant();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(pathname);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const [activeRect, setActiveRect] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const [hoverRect, setHoverRect] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  // Sync activeHref when pathname changes externally (e.g. back button)
  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  // Update active pill position
  useEffect(() => {
    if (!navRef.current) return;

    const updateActivePill = () => {
      if (!navRef.current) return;
      const activeLink = navRef.current.querySelector<HTMLAnchorElement>(
        `[data-nav-href="${activeHref}"]`
      );

      if (activeLink) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setActiveRect({
          left: Math.round(linkRect.left - navRect.left),
          width: Math.round(linkRect.width),
          opacity: 1,
        });
      } else {
        setActiveRect((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateActivePill();
    window.addEventListener('resize', updateActivePill);
    return () => window.removeEventListener('resize', updateActivePill);
  }, [activeHref]);

  // Update hover ghost pill position
  useEffect(() => {
    if (!navRef.current || !hoveredHref || hoveredHref === activeHref) {
      setHoverRect((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const hoveredLink = navRef.current.querySelector<HTMLAnchorElement>(
      `[data-nav-href="${hoveredHref}"]`
    );

    if (hoveredLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = hoveredLink.getBoundingClientRect();
      setHoverRect({
        left: Math.round(linkRect.left - navRect.left),
        width: Math.round(linkRect.width),
        opacity: 1,
      });
    }
  }, [hoveredHref, activeHref]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E5E3DE] transition-all px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto h-[72px] flex items-center justify-between relative">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-7 h-7 rounded-[8px] bg-[#EEF773] outline outline-[1.5px] outline-[#1B1A18] -outline-offset-[0.75px] flex items-center justify-center font-bold text-[16px] text-[#1B1A18] shadow-xs transition-transform group-hover:scale-105">
            H
          </div>
          <div className="flex items-baseline">
            <span className="font-bold text-[20px] tracking-tight text-[#1B1A18]">
              HargaKu
            </span>
            <span className="font-bold text-[22px] text-[#FF7714]">.</span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Pill with Magnetic Slide (True Center) */}
        <nav
          ref={navRef}
          onMouseLeave={() => setHoveredHref(null)}
          className="absolute left-1/2 -translate-x-1/2 hidden lg:inline-flex items-center p-1 rounded-full bg-white/90 backdrop-blur-xs outline outline-1 outline-[#E5E3DE] shadow-xs"
        >
          {/* Subtle Hover Ghost Pill */}
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-0 rounded-full bg-[#FAF9F5] pointer-events-none transition-[transform,width,opacity] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translate3d(${hoverRect.left}px, 0, 0)`,
              width: `${hoverRect.width}px`,
              opacity: hoverRect.opacity,
            }}
          />

          {/* Active Magnetic Dark Pill (GPU Accelerated) */}
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-0 rounded-full bg-[#1B1A18] pointer-events-none shadow-xs transition-[transform,width,opacity] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translate3d(${activeRect.left}px, 0, 0)`,
              width: `${activeRect.width}px`,
              opacity: activeRect.opacity,
            }}
          />

          {NAV_ITEMS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                data-nav-href={item.href}
                onClick={() => setActiveHref(item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-[#6E6D67] hover:text-[#1B1A18]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Region Selector */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <RegionSelector variant="pill" />
          <button
            type="button"
            onClick={() => openAssistant()}
            className="inline-flex items-center justify-center gap-1.5 px-[16px] py-[9px] rounded-[8px] bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] -outline-offset-1 text-[13px] font-semibold shadow-[0_2px_0_#1B1A18] hover:bg-[#dce663] active:translate-y-[1px] transition-all cursor-pointer"
          >
            <ChatCircleDots size={16} weight="fill" className="text-[#1B1A18]" />
            <span>Tanya Asisten</span>
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => openAssistant()}
            className="w-8 h-8 rounded-full bg-[#EEF773] outline outline-1 outline-[#1B1A18] flex items-center justify-center text-[#1B1A18] cursor-pointer shadow-xs"
            title="Tanya Asisten Pangan"
          >
            <ChatCircleDots size={16} weight="fill" className="text-[#1B1A18]" />
          </button>
          <RegionSelector variant="compact" />
          <button
            type="button"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#1B1A18] hover:text-[#FF7714] transition-colors"
          >
            {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[#E5E3DE] bg-[#FAF9F5] px-6 py-4 space-y-3 shadow-lg">
          <div className="pb-2 border-b border-[#E5E3DE]">
            <p className="text-[11px] font-bold text-[#8C8B85] uppercase tracking-wider mb-1.5">
              Wilayah Acuan Belanja
            </p>
            <RegionSelector variant="card" />
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-[8px] text-[14px] font-medium text-[#1B1A18] hover:bg-[#F4F3F0]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#E5E3DE] mt-2 space-y-2">
            <Link
              href="/tentang"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-[8px] text-[13px] font-medium text-[#6E6D67] hover:text-[#1B1A18] hover:bg-[#F4F3F0]"
            >
              Tentang &amp; Sumber Data
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openAssistant();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#EEF773] text-[#1B1A18] outline outline-1 outline-[#1B1A18] text-[13px] font-semibold cursor-pointer"
            >
              <ChatCircleDots size={17} weight="fill" className="text-[#1B1A18]" />
              <span>Tanya Asisten Pangan</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
