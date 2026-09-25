import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WhatsAppFloatingCTA: React.FC = () => {
  const { siteSettings, buildWhatsAppUrl, recordAnalyticsEvent } = useData();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    recordAnalyticsEvent('whatsapp_click', 'floating_button', 'Floating WhatsApp CTA');
    const url = buildWhatsAppUrl("Hello Celine Studio, I'd like to make an enquiry.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Tooltip on hover / prompt */}
      {showTooltip && (
        <div
          id="whatsapp-tooltip-box"
          className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-xs rounded-2xl bg-[#141418] p-3.5 sm:p-4 text-xs text-[#f5f3ef] shadow-2xl border border-[#c5a880]/30 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-[#c5a880] tracking-wider uppercase text-[10px]">
              Celine Studio Concierge
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#9e9ea7] hover:text-white p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
              aria-label="Close concierge tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-zinc-300 text-[11px] sm:text-xs leading-relaxed break-words">
            Need a custom outfit quote, sizing assistance, or instant fitting booking? Chat directly with our master tailors.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-[#c5a880] pt-2 border-t border-[#252530]">
            <span className="font-mono">{siteSettings.phone}</span>
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#25D366]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              Online
            </span>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="pointer-events-auto group relative flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 sm:px-4 sm:py-3.5 text-white shadow-[0_6px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:bg-[#20bd5a] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/60 min-h-[48px] min-w-[48px]"
        aria-label="Chat with Celine Studio on WhatsApp (09124465224)"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current shrink-0" />
        {/* Mobile: compact "Chat" text, Desktop: full "Chat with Celine Studio" */}
        <span className="text-xs font-bold tracking-wide sm:hidden">
          Chat
        </span>
        <span className="text-sm font-semibold tracking-wide hidden sm:inline-block">
          Chat with Celine Studio
        </span>
      </button>
    </div>
  );
};
