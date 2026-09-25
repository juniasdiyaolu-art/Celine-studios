import React from 'react';
import { Sparkles, Scissors, Award, Users, ShieldCheck, Heart, MapPin, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AboutPageProps {
  onStartCustom: () => void;
  onBookFitting: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartCustom, onBookFitting }) => {
  const { siteSettings } = useData();

  return (
    <div className="py-12 sm:py-20 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#16161f] text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Celine Studio Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#f5f3ef] font-medium tracking-tight">
            Where Personal Style Meets Exceptional Craftsmanship.
          </h1>

          <p className="text-sm sm:text-base text-[#a8a69f] leading-relaxed">
            Founded with a singular devotion: to dress discerning individuals in clothing that commands respect, honors African heritage, and fits with bespoke architectural precision.
          </p>
        </div>

        {/* Story Section with Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-[#2a2a36] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="Celine Studio Master Tailor Crafting Senator Suit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-[#14141c] border border-[#c5a880]/40 rounded-xl p-5 shadow-2xl max-w-xs">
              <p className="font-serif text-lg text-[#f5f3ef]">Iyana-Isashi Atelier</p>
              <p className="text-xs text-[#9f9d96] mt-0.5">La Clothine, Lagos, Nigeria</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
              Our Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ef] leading-tight">
              Honoring Nigerian Sartorial Prestige.
            </h2>
            <p className="text-sm text-[#b5b3ab] leading-relaxed">
              Celine Studio was established in Iyana-Isashi, Nigeria, out of frustration with ill-fitting mass-produced garments and impersonal tailors. We recognized that true African luxury lies in celebrating the uniqueness of every human form.
            </p>
            <p className="text-sm text-[#b5b3ab] leading-relaxed">
              Whether cutting a regal three-piece Agbada for a state dignitary, engineering a sculpted French-lace corseted gown for an Aso Ebi bride, or draping contemporary minimal linen for everyday distinction, we balance time-honored handcraft with sharp, modern silhouettes.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f1f28]">
              <div>
                <p className="font-serif text-2xl text-[#c5a880] font-semibold">1,200+</p>
                <p className="text-xs text-[#8e8c85]">Custom Pieces Created</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#c5a880] font-semibold">100%</p>
                <p className="text-xs text-[#8e8c85]">Bespoke Hand-Finished Fit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Craft */}
        <div className="bg-[#111116] border border-[#23232e] rounded-3xl p-8 sm:p-14">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold block mb-2">
              Atelier Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ef]">
              The Celine Studio Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#181822] text-[#c5a880] flex items-center justify-center">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#f5f3ef]">Anatomical Pattern Drafting</h3>
              <p className="text-xs text-[#9b9992] leading-relaxed">
                We do not use cookie-cutter templates. Patterns are drafted against your posture, shoulder slope, and natural curves, creating garments that drape effortlessly.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#181822] text-[#c5a880] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#f5f3ef]">Ethical Fabric Provenance</h3>
              <p className="text-xs text-[#9b9992] leading-relaxed">
                We work directly with certified textile merchants to source genuine Vlisco Hollandais wax, Swiss voile, French duchess satin, and Italian cashmere wools.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#181822] text-[#c5a880] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#f5f3ef]">WhatsApp-First Concierge</h3>
              <p className="text-xs text-[#9b9992] leading-relaxed">
                No corporate call centers. You converse directly with master fashion designers who advise you on styling, share cutting room updates, and refine your fit.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="text-center space-y-6 pt-4">
          <h2 className="font-serif text-3xl text-[#f5f3ef]">
            Begin Your Sartorial Collaboration
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartCustom}
              className="px-8 py-4 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all"
            >
              Start Custom Request
            </button>
            <button
              onClick={onBookFitting}
              className="px-8 py-4 rounded-full border border-[#2e2e3c] bg-[#14141c] text-[#dedcd5] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#1f1f2b] transition-all"
            >
              Book Studio Fitting in Iyana-Isashi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
