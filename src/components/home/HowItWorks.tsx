import React from 'react';
import { Compass, Sparkles, Scissors, Trophy, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartCustomRequest: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartCustomRequest }) => {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Explore Celine Studio designs.',
      description: 'Browse our ready-to-wear drops, editorial lookbook archives, or bring your own visual references.',
      icon: Compass
    },
    {
      num: '02',
      title: 'SHARE',
      subtitle: 'Tell us what you want or send your inspiration.',
      description: 'Fill out our bespoke form or WhatsApp us your event date, style preferences, colors, and reference photos.',
      icon: Sparkles
    },
    {
      num: '03',
      title: 'CREATE',
      subtitle: 'Our fashion team works on your look.',
      description: 'Master tailors draft the pattern, source authentic fabrics, execute precision corsetry or embroidery, and schedule fittings.',
      icon: Scissors
    },
    {
      num: '04',
      title: 'WEAR',
      subtitle: 'Receive a piece made for your moment.',
      description: 'Step into your defining event in Lagos, Abuja, or anywhere globally with confidence and unmistakable distinction.',
      icon: Trophy
    }
  ];

  return (
    <section className="py-24 bg-[#09090c] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
            The Bespoke Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#f5f3ef] font-medium">
            How It Works
          </h2>
          <p className="mt-3 text-sm text-[#9f9d96]">
            From concept to coronation: four deliberate steps to your custom couture piece.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-[#111116] rounded-2xl p-7 border border-[#22222a] flex flex-col justify-between hover:border-[#c5a880]/50 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl sm:text-4xl text-[#c5a880] font-light">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#181820] flex items-center justify-center text-[#c5a880] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#f5f3ef] tracking-wider mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#c5a880] mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-[#8f8d86] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            id="how-it-works-start-request-btn"
            onClick={onStartCustomRequest}
            className="px-8 py-4 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase hover:bg-[#d6be9a] transition-all shadow-xl inline-flex items-center gap-2 active:scale-95"
          >
            <span>Start Your Custom Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
