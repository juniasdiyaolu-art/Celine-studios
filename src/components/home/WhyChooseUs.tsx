import React from 'react';
import { Scissors, Sparkles, ShieldCheck, Clock, Award, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Flawless Fit Guarantee',
      description: 'Every custom outfit is cut against individual anatomical proportions with built-in micro allowances and multi-stage basting.',
      icon: Scissors
    },
    {
      title: 'Curated Authentic Textiles',
      description: 'We source genuine Dutch Hollandais wax prints, Swiss voile lace, Super 160s Italian wool, and French duchess silk directly.',
      icon: Sparkles
    },
    {
      title: 'Bespoke In-House Tailoring',
      description: 'Zero automated mass production. Master Nigerian artisans draft, hand-stitch, embroider, and finish each piece in our atelier.',
      icon: Award
    },
    {
      title: 'Direct WhatsApp Concierge',
      description: 'No robotic layers. Chat directly with the atelier design team to receive fabric swatches, progress videos, and fitting advice.',
      icon: Users
    },
    {
      title: 'Timely Event Assurance',
      description: 'We honor your defining calendar dates — weddings, birthdays, and conferences — with disciplined production timelines.',
      icon: Clock
    },
    {
      title: 'Heritage & Contemporary Harmony',
      description: 'Honoring Nigerian regal identity while crafting cuts that command respect in Lagos, London, New York, or Paris.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 bg-[#0c0c0f] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            The Celine Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#f5f3ef] font-medium">
            Why Discerning Clients Choose Celine Studio
          </h2>
          <p className="mt-3 text-sm text-[#9f9d96]">
            Where exceptional craftsmanship transforms high-fashion aspiration into wearable legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-[#121217] rounded-2xl p-8 border border-[#23232c] hover:border-[#c5a880]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a1a24] text-[#c5a880] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#f5f3ef] mb-2 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9b9992] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
