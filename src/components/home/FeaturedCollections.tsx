import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: string) => void;
  onOpenCustom: () => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCategory,
  onOpenCustom
}) => {
  const collections = [
    {
      id: 'custom-dresses',
      title: 'Custom Evening & Bridal Gowns',
      subtitle: 'Sculpted corsetry, French lace & sweeping trains',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
      action: () => onSelectCategory('Custom Dresses'),
      tag: 'Bespoke Couture'
    },
    {
      id: 'senator-styles',
      title: 'The Sovereign Senator Collection',
      subtitle: 'Italian cashmere wool & geometric chest embroidery',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      action: () => onSelectCategory('Senator Styles'),
      tag: 'Men’s Elegance'
    },
    {
      id: 'native-ankara',
      title: 'Heritage Ankara & Native Ensembles',
      subtitle: 'Premium Dutch wax prints in contemporary cuts',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
      action: () => onSelectCategory('Native / Ankara'),
      tag: 'African Heritage'
    },
    {
      id: 'occasion-agbada',
      title: 'Royal Agbada & Occasion Attire',
      subtitle: 'Three-piece Swiss damask jacquard grandeur',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      action: () => onSelectCategory('Occasion Wear'),
      tag: 'Aso Ebi & Royalty'
    },
    {
      id: 'unisex-fashion',
      title: 'Unisex Architectural Tunics',
      subtitle: 'Minimalist raw linen & gender-fluid silhouettes',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
      action: () => onSelectCategory('Unisex Fashion'),
      tag: 'Modern Neutral'
    },
    {
      id: 'ready-to-wear',
      title: 'Curated Ready-to-Wear Drops',
      subtitle: 'Immediate dispatch pieces cut for daily luxury',
      image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=80',
      action: () => onSelectCategory('Ready-to-Wear'),
      tag: 'Ready to Ship'
    }
  ];

  return (
    <section className="py-24 bg-[#0e0e11] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Atelier Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.05em] text-[#f5f3ef] font-medium">
              Curated for Distinction.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#9f9d96] max-w-md">
            Every garment from Celine Studio is an intentional dialogue between traditional African sartorial prestige and progressive modern luxury.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(col => (
            <div
              key={col.id}
              onClick={col.action}
              className="group relative h-[430px] rounded-2xl overflow-hidden cursor-pointer border border-[#23232b] bg-[#141418] transition-all duration-500 hover:border-[#c5a880]/60 hover:shadow-2xl"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-[#c5a880] border border-[#c5a880]/30">
                  {col.tag}
                </span>
              </div>

              {/* Content at Bottom */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#f5f3ef] tracking-wide group-hover:text-[#c5a880] transition-colors">
                    {col.title}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#2e2e38] flex items-center justify-center text-[#f5f3ef] group-hover:bg-[#c5a880] group-hover:text-[#0c0c0e] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#a8a69f] leading-relaxed line-clamp-2">
                  {col.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
