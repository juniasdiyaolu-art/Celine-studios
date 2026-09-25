import React from 'react';
import { X, Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { LookbookItem } from '../../types';
import { useData } from '../../context/DataContext';

interface LookbookDetailModalProps {
  item: LookbookItem;
  onClose: () => void;
  onRequestSimilar: (item: LookbookItem) => void;
}

export const LookbookDetailModal: React.FC<LookbookDetailModalProps> = ({
  item,
  onClose,
  onRequestSimilar
}) => {
  const { toggleSaveDesign, isDesignSaved, buildWhatsAppUrl, recordAnalyticsEvent } = useData();
  const isSaved = isDesignSaved(item.id);

  const handleToggleSave = () => {
    toggleSaveDesign({
      id: item.id,
      type: 'lookbook',
      name: item.title,
      category: item.category,
      imageUrl: item.imageUrl
    });
  };

  const handleWhatsAppEnquiry = () => {
    recordAnalyticsEvent('whatsapp_click', item.id, `Lookbook Enquiry: ${item.title}`);
    const message = `Hello Celine Studio, I love this look: ${item.title}. Can you make something like this for me?`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="lookbook-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="lookbook-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#121217] border border-[#2d2d38] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl my-auto grid grid-cols-1 md:grid-cols-12 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#0e0e12]/80 text-[#9e9c94] hover:text-white transition-colors"
          aria-label="Close view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Column */}
        <div className="md:col-span-6 aspect-[3/4] md:aspect-auto bg-[#181820] relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center"
          />
          <button
            onClick={handleToggleSave}
            className={`absolute top-4 left-4 p-3 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-[#c5a880] text-[#0c0c0e]'
                : 'bg-[#0e0e12]/75 text-[#f5f3ef] hover:bg-[#c5a880] hover:text-[#0c0c0e]'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Design'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content Column */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c5a880]">
              {item.category}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef] font-medium tracking-wide mt-2">
              {item.title}
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[#b8b6ae] leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#181822] text-xs font-medium text-[#c5a880] border border-[#c5a880]/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#16161d] border border-[#23232c] text-xs text-[#a09e97]">
              <p className="font-semibold text-[#f5f3ef] mb-1">
                Custom Tailoring Note:
              </p>
              <p>
                Every piece in our Lookbook can be tailored to your precise measurements, preferred color palette, or alternative African/European luxury fabrics.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-4 border-t border-[#202028]">
            <button
              id="lookbook-request-similar-btn"
              onClick={() => {
                onClose();
                onRequestSimilar(item);
              }}
              className="w-full py-3.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Custom Outfit Like This</span>
            </button>

            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Recreate on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
