import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onCreateCustomLook: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onCreateCustomLook
}) => {
  const { siteSettings, buildWhatsAppUrl, recordAnalyticsEvent } = useData();

  const handleWhatsAppChat = () => {
    recordAnalyticsEvent('whatsapp_click', 'hero_cta', 'Hero WhatsApp button');
    const url = buildWhatsAppUrl("Hello Celine Studio, I would like to enquire about your custom outfits and ready-to-wear pieces.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* Background Editorial Imagery with Layered Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=85"
          alt="Celine Studio Haute Couture"
          className="w-full h-full object-cover object-center opacity-40 filter brightness-90 contrast-105"
        />
        {/* Soft luxury vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e]/95 via-transparent to-[#0c0c0e]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/40 bg-[#16161d]/80 backdrop-blur-md text-[#d6be9a] text-xs uppercase tracking-[0.25em] font-medium mb-8 animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Lagos Atelier • Bespoke & Ready-to-Wear</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-[0.04em] sm:tracking-[0.08em] font-medium text-[#f5f3ef] uppercase max-w-5xl leading-[1.08] drop-shadow-sm break-words">
          Wear Your <span className="italic font-normal text-[#c5a880]">Vision.</span>
        </h1>

        {/* Supporting description */}
        <p className="mt-6 text-sm sm:text-lg md:text-xl text-[#d4d2cb] max-w-2xl font-light leading-relaxed tracking-wide">
          Custom and ready-to-wear fashion, crafted to reflect your style. Where personal distinction meets exceptional Nigerian tailoring.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          <button
            id="hero-explore-collection-btn"
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#f5f3ef] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase hover:bg-[#c5a880] hover:text-[#0c0c0e] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-create-custom-btn"
            onClick={onCreateCustomLook}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#c5a880]/60 bg-[#14141a]/80 text-[#f5f3ef] text-xs sm:text-sm font-semibold tracking-[0.1em] sm:tracking-[0.15em] uppercase hover:bg-[#c5a880]/20 hover:border-[#c5a880] transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#c5a880]" />
            <span>Create Your Custom Look</span>
          </button>

          <button
            id="hero-whatsapp-btn"
            onClick={handleWhatsAppChat}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#25D366]/90 text-white text-xs sm:text-sm font-semibold tracking-[0.08em] sm:tracking-[0.1em] hover:bg-[#20bd5a] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Trust & Craft Highlights */}
        <div className="mt-16 pt-8 border-t border-[#222228]/80 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="flex items-center gap-2.5 text-xs text-[#a3a19b]">
            <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>100% Bespoke Fit Guarantee</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#a3a19b]">
            <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>Authentic Dutch Wax & Italian Wool</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#a3a19b]">
            <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>Studio in Iyana-Isashi, Lagos</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#a3a19b]">
            <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
            <span>Direct WhatsApp Tailor Access</span>
          </div>
        </div>
      </div>
    </section>
  );
};
