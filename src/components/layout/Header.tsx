import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Calendar,
  Layers,
  ShoppingBag,
  Sparkle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAiAssistant: () => void;
  openSavedDesigns: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openAiAssistant,
  openSavedDesigns
}) => {
  const { siteSettings, savedItems, buildWhatsAppUrl, recordAnalyticsEvent } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Ready-to-Wear' },
    { id: 'custom', label: 'Custom Fashion' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact & Studio' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    recordAnalyticsEvent('page_view', tabId, `Navigation to ${tabId}`);
  };

  const handleDirectWhatsApp = () => {
    recordAnalyticsEvent('whatsapp_click', 'header_button', 'Header WhatsApp CTA');
    const url = buildWhatsAppUrl("Hello Celine Studio, I'm visiting your website and would like to enquire about your designs.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#232328] bg-[#0c0c0e]/95 backdrop-blur-md transition-all duration-200">
      {/* Top micro announcement bar */}
      <div className="bg-[#141418] px-4 py-1.5 border-b border-[#202026] text-center text-xs tracking-wider text-[#b8b6af] flex items-center justify-center gap-4">
        <span className="hidden sm:inline text-[#c5a880] font-medium">
          BESPOKE NIGERIAN HAUTE COUTURE & READY-TO-WEAR
        </span>
        <span className="hidden md:inline text-zinc-600">•</span>
        <span className="inline-flex items-center gap-1 text-zinc-300">
          Studio in Iyana-Isashi, Nigeria
        </span>
        <span className="text-zinc-600">•</span>
        <a
          href={buildWhatsAppUrl("Hello Celine Studio, I would like to make an enquiry.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5a880] hover:underline font-medium inline-flex items-center gap-1"
        >
          <Phone className="w-3 h-3 inline" /> WhatsApp: {siteSettings.whatsappInternational}
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex flex-col items-start select-none"
            id="brand-logo-btn"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-[#f5f3ef] group-hover:text-[#c5a880] transition-colors duration-200">
              CELINE STUDIO
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#9a9890] uppercase font-light -mt-0.5">
              Custom Fashion. Designed for You.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-xs xl:text-sm tracking-wider font-medium transition-all duration-200 uppercase rounded-sm ${
                    isActive
                      ? 'text-[#c5a880] font-semibold'
                      : 'text-[#d8d6ce] hover:text-[#f5f3ef] hover:bg-[#18181e]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#c5a880] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Fashion Assistant Button */}
            <button
              id="header-ai-assistant-btn"
              onClick={openAiAssistant}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#c5a880]/30 bg-[#17171d] text-[#e3cfb3] hover:bg-[#202028] hover:border-[#c5a880] transition-all duration-200 text-xs tracking-wider"
              title="Celine AI Fashion Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
              <span className="hidden sm:inline font-medium">Celine AI</span>
            </button>

            {/* Saved Designs (Wishlist) */}
            <button
              id="header-saved-designs-btn"
              onClick={openSavedDesigns}
              className="relative p-2.5 rounded-full text-[#d8d6ce] hover:text-[#f5f3ef] hover:bg-[#18181e] transition-colors"
              title="Saved Designs"
              aria-label="Saved Designs"
            >
              <Heart className={`w-5 h-5 ${savedItems.length > 0 ? 'text-[#c5a880] fill-[#c5a880]/20' : ''}`} />
              {savedItems.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a880] text-[10px] font-bold text-[#0c0c0e]">
                  {savedItems.length}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <button
              id="header-whatsapp-cta"
              onClick={handleDirectWhatsApp}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wide hover:bg-[#20bd5a] transition-all shadow-md active:scale-95"
            >
              <span>Order on WhatsApp</span>
            </button>

            {/* Admin Dashboard Entry */}
            <button
              id="header-admin-btn"
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 rounded-full transition-colors ${
                activeTab === 'admin'
                  ? 'bg-[#c5a880]/20 text-[#c5a880]'
                  : 'text-[#6b6964] hover:text-[#d8d6ce] hover:bg-[#18181e]'
              }`}
              title="Studio Management Portal"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-[#d8d6ce] hover:text-[#f5f3ef] hover:bg-[#18181e] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#101014] border-b border-[#232328] px-5 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200"
        >
          <div className="py-2 mb-2 border-b border-[#1c1c22]">
            <p className="text-[11px] uppercase tracking-widest text-[#8a8880]">Menu</p>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-sm font-medium tracking-wide flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#1e1e26] text-[#c5a880] font-semibold'
                      : 'text-[#d8d6ce] hover:bg-[#18181e]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />}
                </button>
              );
            })}
          </div>

          {/* Quick mobile links */}
          <div className="pt-4 border-t border-[#1e1e24] space-y-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSavedDesigns();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#16161d] text-xs font-medium text-[#d8d6ce]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#c5a880]" /> Saved Designs
              </span>
              <span className="text-[11px] font-bold text-[#c5a880]">{savedItems.length} items</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAiAssistant();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#181822] text-xs font-medium text-[#e3cfb3] border border-[#c5a880]/30"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a880]" /> Ask Celine AI Concierge
              </span>
              <span className="text-[10px] uppercase font-bold text-[#c5a880]">Live</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleDirectWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white text-sm font-semibold tracking-wide"
            >
              <Phone className="w-4 h-4" />
              <span>Chat on WhatsApp (09124465224)</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-center text-xs text-[#7d7b75] hover:text-[#c5a880] py-1"
            >
              Business Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
