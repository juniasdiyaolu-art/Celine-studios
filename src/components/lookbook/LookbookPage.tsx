import React, { useState, useMemo } from 'react';
import { Sparkles, Heart, Eye, ArrowRight, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LookbookItem } from '../../types';

interface LookbookPageProps {
  onSelectLook: (item: LookbookItem) => void;
  onRequestCustomFromLookbook: (item?: LookbookItem) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  onSelectLook,
  onRequestCustomFromLookbook
}) => {
  const { lookbook, toggleSaveDesign, isDesignSaved, recordAnalyticsEvent } = useData();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Custom Dresses',
    'Senator Styles',
    'Native & Ankara',
    'Occasion Wear',
    'Unisex Fashion',
    'Ready-to-Wear'
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return lookbook;
    return lookbook.filter(
      item =>
        item.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [lookbook, activeCategory]);

  const handleSave = (e: React.MouseEvent, item: LookbookItem) => {
    e.stopPropagation();
    toggleSaveDesign({
      id: item.id,
      type: 'lookbook',
      name: item.title,
      category: item.category,
      imageUrl: item.imageUrl
    });
  };

  return (
    <div className="py-12 sm:py-16 bg-[#0a0a0c] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#16161f] text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Archives</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-6xl text-[#f5f3ef] font-medium tracking-tight">
            The Celine Studio Lookbook
          </h1>

          <p className="text-xs sm:text-sm text-[#9f9d96] leading-relaxed">
            A visual anthology of custom-tailored masterpieces, royal ceremonies, and contemporary African couture crafted in our Iyana-Isashi atelier.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                recordAnalyticsEvent('lookbook_filter', cat, `Filter by ${cat}`);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#c5a880] text-[#0c0c0e] font-bold shadow-md'
                  : 'bg-[#14141a] text-[#8e8c85] hover:text-[#f5f3ef] border border-[#23232e]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => {
            const isSaved = isDesignSaved(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectLook(item)}
                className="group relative h-[520px] rounded-2xl overflow-hidden cursor-pointer bg-[#121217] border border-[#23232c] hover:border-[#c5a880]/60 transition-all duration-500 shadow-xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/35 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Controls */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#c5a880] border border-[#c5a880]/30">
                    {item.category}
                  </span>

                  <button
                    onClick={e => handleSave(e, item)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-[#c5a880] text-[#0c0c0e]'
                        : 'bg-[#0e0e12]/75 text-[#f5f3ef] hover:bg-[#c5a880] hover:text-[#0c0c0e]'
                    }`}
                    title={isSaved ? 'Remove from Saved' : 'Save Design'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-[#c5a880]/90 bg-[#16161f]/80 px-2.5 py-0.5 rounded-full border border-[#c5a880]/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-2xl text-[#f5f3ef] tracking-wide group-hover:text-[#c5a880] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#b0aea6] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-[#c5a880] font-medium inline-flex items-center gap-1 group-hover:underline">
                      <span>View Look Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onRequestCustomFromLookbook(item);
                      }}
                      className="px-3 py-1 rounded-full bg-[#c5a880]/20 text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0c0e] text-[11px] font-semibold tracking-wide border border-[#c5a880]/40 transition-colors"
                    >
                      Commission Similar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
