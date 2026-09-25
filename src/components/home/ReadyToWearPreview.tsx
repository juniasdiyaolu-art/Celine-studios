import React from 'react';
import { Heart, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';

interface ReadyToWearPreviewProps {
  onViewAllShop: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ReadyToWearPreview: React.FC<ReadyToWearPreviewProps> = ({
  onViewAllShop,
  onSelectProduct
}) => {
  const {
    products,
    toggleSaveDesign,
    isDesignSaved,
    buildWhatsAppUrl,
    getProductWhatsAppMessage,
    recordAnalyticsEvent
  } = useData();

  // Show up to 4 featured products
  const previewProducts = products.filter(p => p.featured).slice(0, 4);

  const handleWhatsAppOrder = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    recordAnalyticsEvent('whatsapp_click', product.id, `Order WhatsApp: ${product.name}`);
    const message = getProductWhatsAppMessage(product);
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleSave = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    toggleSaveDesign({
      id: product.id,
      type: 'product',
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.images[0]
    });
  };

  return (
    <section className="py-24 bg-[#0c0c0f] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Instant Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#f5f3ef] font-medium">
              Ready-to-Wear Edit
            </h2>
          </div>
          <button
            onClick={onViewAllShop}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#c5a880] tracking-[0.15em] uppercase hover:underline"
          >
            <span>View Complete Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewProducts.map(product => {
            const isSaved = isDesignSaved(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-[#121217] rounded-2xl overflow-hidden border border-[#23232c] hover:border-[#c5a880]/50 transition-all duration-300 cursor-pointer shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#18181f]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Save Design Button */}
                  <button
                    onClick={(e) => handleToggleSave(e, product)}
                    className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all ${
                      isSaved
                        ? 'bg-[#c5a880] text-[#0c0c0e]'
                        : 'bg-[#0e0e12]/70 text-[#f5f3ef] hover:bg-[#c5a880] hover:text-[#0c0c0e]'
                    }`}
                    title={isSaved ? 'Remove from Saved' : 'Save Design'}
                    aria-label="Save Design"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* Stock tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md text-[10px] tracking-wider uppercase font-medium text-[#c5a880] border border-[#c5a880]/30">
                      {product.leadTime || 'In Stock'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#8a8880] font-medium">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg text-[#f5f3ef] font-medium tracking-wide mt-1 group-hover:text-[#c5a880] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#c5a880] mt-1.5">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1e1e24] flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#78766f]">
                      {product.sizes.slice(0, 3).join(', ')}
                    </span>

                    {/* WhatsApp Direct Order Button */}
                    <button
                      onClick={(e) => handleWhatsAppOrder(e, product)}
                      className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 hover:bg-[#20bd5a] transition-colors active:scale-95"
                      title="Order via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Order via WhatsApp</span>
                    </button>
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
