import React, { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Sparkles,
  Check,
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import { Product } from '../../types';
import { useData } from '../../context/DataContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOpenCustomWithProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCustomWithProduct
}) => {
  const { toggleSaveDesign, isDesignSaved, buildWhatsAppUrl, recordAnalyticsEvent } = useData();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');

  const isSaved = isDesignSaved(product.id);

  const handleToggleSave = () => {
    toggleSaveDesign({
      id: product.id,
      type: 'product',
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.images[0]
    });
  };

  const handleWhatsAppOrder = () => {
    recordAnalyticsEvent('whatsapp_click', product.id, `Modal Enquire: ${product.name}`);
    const message = `Hello Celine Studio, I'm interested in ${product.name}.\nSize: ${selectedSize}\nColor: ${selectedColor}\nPrice: ₦${product.price.toLocaleString()}\n\nIs this piece currently available for delivery or atelier fitting?`;
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#121217] border border-[#2d2d38] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl my-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#0e0e12]/80 text-[#9e9c94] hover:text-white hover:bg-[#1f1f28] transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left Column: Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#181820] border border-[#23232d]">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
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

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                      selectedImage === idx ? 'border-[#c5a880]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Order Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Lead time */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a880]">
                  {product.category} • {product.gender}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#181822] text-[10px] text-[#25D366] border border-[#25D366]/30 font-medium">
                  {product.inStock ? 'Ready to Ship / Craft' : 'Made to Order'}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef] font-medium tracking-wide mt-2">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#c5a880]">
                  ₦{product.price.toLocaleString()}
                </span>
                <span className="text-xs text-[#8f8d86]">
                  (Inclusive of master hand-tailoring)
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#b8b6ae] leading-relaxed">
                {product.description}
              </p>

              {/* Color selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                    Select Color: <span className="text-[#f5f3ef] font-semibold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedColor === color
                            ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                            : 'border-[#24242f] bg-[#14141a] text-[#8e8c85] hover:border-[#383848]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs uppercase tracking-wider text-[#8e8c85] font-medium">
                      Select Size: <span className="text-[#f5f3ef] font-semibold">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-[#c5a880] flex items-center gap-1">
                      <Ruler className="w-3 h-3" /> Standard Nigerian Fit
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                          selectedSize === size
                            ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0c0e]'
                            : 'border-[#24242f] bg-[#14141a] text-[#dedcd5] hover:border-[#383848]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fabric details if present */}
              {product.fabric && (
                <div className="mt-4 p-3 rounded-xl bg-[#16161d] border border-[#22222a] text-xs text-[#a4a29a] space-y-1">
                  <p><span className="text-[#c5a880] font-medium">Fabric:</span> {product.fabric}</p>
                  {product.careInstructions && (
                    <p><span className="text-[#c5a880] font-medium">Care:</span> {product.careInstructions}</p>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#202028]">
              {/* Primary: Order on WhatsApp */}
              <button
                id="modal-order-whatsapp-btn"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 sm:py-4 px-4 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>Enquire on WhatsApp</span>
              </button>

              {/* Secondary: Request custom variation */}
              {onOpenCustomWithProduct && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomWithProduct(product);
                  }}
                  className="w-full py-3 rounded-full border border-[#c5a880]/50 bg-[#161620] text-[#e0ded8] text-xs font-semibold tracking-wider uppercase hover:bg-[#20202c] hover:border-[#c5a880] transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#c5a880]" />
                  <span>Request Custom Fit or Different Fabric</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
