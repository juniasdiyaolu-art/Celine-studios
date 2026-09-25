import React from 'react';
import { X, Heart, Trash2, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SavedDesignsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreShop: () => void;
}

export const SavedDesignsModal: React.FC<SavedDesignsModalProps> = ({
  isOpen,
  onClose,
  onExploreShop
}) => {
  const { savedItems, removeSavedDesign, buildWhatsAppUrl, recordAnalyticsEvent } = useData();

  if (!isOpen) return null;

  const handleEnquireAllWhatsApp = () => {
    if (savedItems.length === 0) return;
    recordAnalyticsEvent('whatsapp_click', 'saved_items_enquiry', `Enquire ${savedItems.length} saved designs`);

    let message = `Hello Celine Studio, here are the designs I've saved from your collection:\n\n`;
    savedItems.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} (${item.category})${item.price ? ` — ₦${item.price.toLocaleString()}` : ''}\n`;
    });
    message += `\nCould you please provide availability and custom tailoring guidance for these pieces?`;

    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="saved-designs-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="saved-designs-drawer"
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#121217] border-l border-[#282834] flex flex-col justify-between shadow-2xl p-6 overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#202028]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#c5a880] fill-[#c5a880]/20" />
            <h3 className="font-serif text-xl text-[#f5f3ef] font-medium tracking-wide">
              Saved Designs ({savedItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8e8c85] hover:text-white hover:bg-[#1a1a24] transition-colors"
            aria-label="Close saved items"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedItems.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-10 h-10 text-zinc-700 mx-auto" />
              <p className="font-serif text-lg text-[#f5f3ef]">Your Saved List is Empty</p>
              <p className="text-xs text-[#8e8c85] max-w-xs mx-auto">
                Explore our ready-to-wear drops and lookbook to save your dream silhouettes.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreShop();
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6be9a]"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            savedItems.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#171720] border border-[#23232e] group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-20 rounded-lg object-cover bg-zinc-900 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-medium">
                    {item.category}
                  </span>
                  <h4 className="text-sm text-[#f5f3ef] font-medium truncate">
                    {item.name}
                  </h4>
                  {item.price ? (
                    <p className="text-xs font-bold text-[#c5a880] mt-0.5">
                      ₦{item.price.toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-xs text-[#8e8c85] mt-0.5">Custom Bespoke</p>
                  )}
                </div>

                <button
                  onClick={() => removeSavedDesign(item.id)}
                  className="p-2 text-[#78766f] hover:text-red-400 transition-colors"
                  title="Remove from saved"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedItems.length > 0 && (
          <div className="pt-4 border-t border-[#202028] space-y-2">
            <button
              onClick={handleEnquireAllWhatsApp}
              className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Saved Designs to WhatsApp ({savedItems.length})</span>
            </button>
            <p className="text-[11px] text-[#76746e] text-center">
              Sends itemized list directly to Celine Studio tailors
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
