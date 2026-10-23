'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ChatCircleDots,
  X,
  PaperPlaneRight,
  ArrowsCounterClockwise,
  MapPin,
  ArrowSquareOut,
  Tag,
} from '@phosphor-icons/react';
import { useAssistant } from '@/lib/store/assistant-store';
import { useRegion } from '@/lib/store/region-store';
import { DEFAULT_PROMPT_PRESETS } from '@/lib/assistant/assistant-engine';

export function AssistantDrawer() {
  const {
    isOpen,
    closeAssistant,
    messages,
    isTyping,
    sendMessage,
    clearConversation,
  } = useAssistant();
  const { selectedRegion } = useRegion();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on drawer open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    sendMessage(inputText);
    setInputText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeAssistant}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Shell */}
      <aside
        className="fixed inset-y-0 right-0 max-w-full flex pl-10 animate-in slide-in-from-right duration-250 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="Panel Asisten Pangan AI"
      >
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E5E3DE] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-5 py-4 bg-white border-b border-[#E5E3DE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#EEF773] outline outline-1 outline-[#1B1A18] flex items-center justify-center text-[#1B1A18] shadow-xs">
                <ChatCircleDots size={20} weight="fill" className="text-[#1B1A18]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[15px] font-bold text-[#1B1A18] tracking-tight">
                    Asisten Pangan AI
                  </h2>
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#6E6D67]">
                  <MapPin size={11} weight="fill" className="text-[#FF7714]" />
                  <span>Acuan: {selectedRegion.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearConversation}
                className="p-2 rounded-[8px] text-[#8C8B85] hover:text-[#1B1A18] hover:bg-[#F4F3F0] transition-colors"
                title="Reset Percakapan"
              >
                <ArrowsCounterClockwise size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={closeAssistant}
                className="p-2 rounded-[8px] text-[#8C8B85] hover:text-[#1B1A18] hover:bg-[#F4F3F0] transition-colors"
                title="Tutup Panel"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1.5`}
                >
                  <div
                    className={`max-w-[88%] rounded-[16px] p-3.5 sm:p-4 text-[13px] leading-[20px] shadow-2xs ${
                      isUser
                        ? 'bg-[#1B1A18] text-white rounded-tr-[4px]'
                        : 'bg-white border border-[#E5E3DE] text-[#1B1A18] rounded-tl-[4px]'
                    }`}
                  >
                    <div className="whitespace-pre-line space-y-1">
                      {msg.content}
                    </div>

                    {/* Referenced Commodities Chips */}
                    {msg.referencedCommodities && msg.referencedCommodities.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#E5E3DE] flex flex-wrap gap-1.5">
                        {msg.referencedCommodities.map((com) => (
                          <div
                            key={com.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FAF9F5] border border-[#E5E3DE] text-[11px]"
                          >
                            <Tag size={12} weight="bold" className="text-[#FF7714]" />
                            <span className="font-semibold text-[#1B1A18]">{com.name}</span>
                            <span className="text-[#6E6D67]">
                              Rp {com.currentPrice.toLocaleString('id-ID')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggested Action Quick Links */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#E5E3DE] flex flex-wrap gap-2">
                        {msg.suggestedActions.map((act) => (
                          <Link
                            key={act.href}
                            href={act.href}
                            onClick={closeAssistant}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF9F5] hover:bg-[#F4F3F0] text-[#1B1A18] border border-[#E5E3DE] text-[11px] font-semibold transition-colors"
                          >
                            <span>{act.label}</span>
                            <ArrowSquareOut size={11} weight="bold" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8C8B85] px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Animation Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] bg-white border border-[#E5E3DE] w-fit">
                <span className="text-[11px] font-medium text-[#6E6D67]">Asisten sedang menganalisis</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7714] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7714] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7714] animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 bg-white/70 border-t border-[#E5E3DE] overflow-x-auto scrollbar-none flex items-center gap-2">
            {DEFAULT_PROMPT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => sendMessage(preset.prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#E5E3DE] text-[11px] font-medium text-[#1B1A18] whitespace-nowrap transition-colors shrink-0 disabled:opacity-50 cursor-pointer shadow-2xs"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3.5 sm:p-4 bg-white border-t border-[#E5E3DE] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tanya resep, budget, atau cek tawaran lapak..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2.5 rounded-[10px] bg-[#FAF9F5] border border-[#E5E3DE] text-[13px] text-[#1B1A18] placeholder:text-[#8C8B85] focus:outline-none focus:border-[#1B1A18] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-4 py-2.5 rounded-[10px] bg-[#EEF773] text-[#1B1A18] border border-[#1B1A18] text-[13px] font-bold shadow-[2px_2px_0px_#1B1A18] hover:bg-[#dce663] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Kirim Pesan"
            >
              <PaperPlaneRight size={16} weight="bold" />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
