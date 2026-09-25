import React, { useState } from 'react';
import { Heart, MessageCircle, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { LookbookItem } from '../../types';

interface LookbookPreviewProps {
  onViewAllLookbook: () => void;
  onSelectLook: (item: LookbookItem) => void;
}

export const LookbookPreview: React.FC<LookbookPreviewProps> = ({
  onViewAllLookbook,
  onSelectLook
}) => {
  const { lookbook, isDesignSaved, toggleSaveDesign, recordAnalyticsEvent } = useData();
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Couture', 'Senator', 'Ankara', 'Agbada', 'Unisex'];

  const filtered = selectedTag === 'All'
    ? lookbook.slice(0, 4)
    : lookbook.filter(item => item.tags.includes(selectedTag) || item.category.toLowerCase().includes(selectedTag.toLowerCase())).slice(0, 4);

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
    <section className="py-24 bg-[#0c0c0e] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Editorial Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#f5f3ef] font-medium">
              The Lookbook
            </h2>
          </div>
          <button
            onClick={onViewAllLookbook}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#c5a880] tracking-[0.15em] uppercase hover:underline"
          >
            <span>Explore Full Lookbook</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                selectedTag === t
                  ? 'bg-[#c5a880] text-[#0c0c0e] font-semibold'
                  : 'bg-[#15151b] text-[#a4a29a] hover:bg-[#1f1f26] hover:text-white border border-[#24242c]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Lookbook Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(item => {
            const isSaved = isDesignSaved(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectLook(item)}
                className="group relative h-[460px] rounded-2xl overflow-hidden cursor-pointer bg-[#121217] border border-[#23232c] hover:border-[#c5a880]/60 transition-all duration-500 shadow-xl"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                {/* Top Controls */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md text-[10px] uppercase tracking-wider font-medium text-[#c5a880] border border-[#c5a880]/30">
                    {item.category}
                  </span>

                  <button
                    onClick={(e) => handleSave(e, item)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-[#c5a880] text-[#0c0c0e]'
                        : 'bg-[#0e0e12]/70 text-[#f5f3ef] hover:bg-[#c5a880] hover:text-[#0c0c0e]'
                    }`}
                    title={isSaved ? 'Saved' : 'Save Design'}
                    aria-label="Save Design"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] text-[#c5a880]/80 bg-[#16161f]/80 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif text-xl text-[#f5f3ef] tracking-wide group-hover:text-[#c5a880] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#a3a19b] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#c5a880] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Look & Request Similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
