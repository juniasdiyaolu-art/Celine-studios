import React from 'react';
import { Sparkles, ArrowRight, Scissors, Ruler, Check, HeartHandshake } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CustomSpotlightProps {
  onRequestCustom: () => void;
}

export const CustomSpotlight: React.FC<CustomSpotlightProps> = ({ onRequestCustom }) => {
  const { buildWhatsAppUrl, recordAnalyticsEvent } = useData();

  const handleWhatsAppConsult = () => {
    recordAnalyticsEvent('whatsapp_click', 'custom_spotlight', 'Custom Spotlight WhatsApp');
    const url = buildWhatsAppUrl("Hello Celine Studio, I would like to request a bespoke custom outfit consultation.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const categories = [
    'Custom Dresses',
    'Native & Ankara',
    'Senator Styles',
    'Unisex Fashion',
    'Wedding & Bridal',
    'Birthday & Occasion',
    'Corporate & Blazers',
    'Luxury & Gala Attire'
  ];

  return (
    <section className="py-24 bg-[#0a0a0d] border-b border-[#1f1f26] relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#2d2d38] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                  alt="Celine Studio Master Tailor Craft"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating secondary badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#16161c] border border-[#c5a880]/40 rounded-xl p-5 shadow-2xl max-w-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold text-[#f5f3ef] tracking-wider">
                      Bespoke Master Tailors
                    </p>
                    <p className="text-[11px] text-[#9f9d96] mt-0.5">
                      Hand-stitched in Iyana-Isashi, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Narrative */}
          <div className="lg:col-span-7 lg:pl-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium border border-[#c5a880]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Fashion Experience</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#f5f3ef] font-medium leading-[1.1]">
              YOUR STYLE.<br />
              <span className="text-[#c5a880] italic">YOUR VISION.</span><br />
              YOUR PIECE.
            </h2>

            <p className="text-sm sm:text-base text-[#bfbdb6] leading-relaxed">
              At Celine Studio, we believe true luxury is intensely personal. Work directly with our master designers to sculpt outfits created specifically for your silhouette, occasion, personality, and exact measurements. Whether you arrive with a sketch, an Instagram photo, or a fabric idea, our atelier brings it to life.
            </p>

            {/* Category Tags */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8e8c85] font-semibold mb-3">
                Custom Specialties We Create:
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-lg bg-[#14141a] text-xs font-medium text-[#d8d6ce] border border-[#24242e] hover:border-[#c5a880]/50 transition-colors"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="custom-spotlight-cta-btn"
                onClick={onRequestCustom}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase hover:bg-[#d6be9a] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Request a Custom Design</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full sm:w-auto px-6 py-4 rounded-full border border-[#272733] bg-[#121218] text-[#e0ded8] text-xs sm:text-sm font-semibold tracking-[0.1em] hover:bg-[#1a1a24] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Consult on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
