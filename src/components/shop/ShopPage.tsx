import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Heart,
  MessageCircle,
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onRequestCustomLook: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onRequestCustomLook
}) => {
  const {
    products,
    toggleSaveDesign,
    isDesignSaved,
    buildWhatsAppUrl,
    getProductWhatsAppMessage,
    recordAnalyticsEvent
  } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');

  const categories = [
    'All',
    'Custom Dresses',
    'Senator Styles',
    'Native / Ankara',
    'Occasion Wear',
    'Unisex Fashion',
    'Ready-to-Wear'
  ];

  const genders = ['All', 'Women', 'Men', 'Unisex'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesCategory =
          selectedCategory === 'All' ||
          product.category.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesGender =
          selectedGender === 'All' ||
          product.gender.toLowerCase() === selectedGender.toLowerCase();
        const matchesSearch =
          !searchQuery.trim() ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesGender && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedGender, searchQuery, sortBy]);

  const handleWhatsAppOrder = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    recordAnalyticsEvent('whatsapp_click', product.id, `Shop Order: ${product.name}`);
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
    <div className="py-12 sm:py-16 bg-[#0a0a0c] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-8 border-b border-[#1f1f26]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold block mb-2">
              Instant Nigerian Luxury
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#f5f3ef] font-medium tracking-tight">
              Ready-to-Wear Atelier
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#9e9c95] max-w-xl">
              Precision-crafted dresses, Senator suits, and contemporary African sets ready for dispatch or immediate fitting.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={onRequestCustomLook}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c5a880]/60 bg-[#16161f] text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0c0e] text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need Bespoke Custom Sizing?</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#8a8880] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search styles, Senator, dresses, Ankara..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#121217] border border-[#23232e] text-xs text-[#f5f3ef] placeholder-[#6d6b64] focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            {/* Gender Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs uppercase tracking-wider text-[#73716a] mr-1 hidden sm:inline">
                Audience:
              </span>
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    selectedGender === g
                      ? 'bg-[#c5a880] text-[#0c0c0e] font-semibold'
                      : 'bg-[#14141a] text-[#a4a29a] hover:text-white border border-[#23232c]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8a8880]" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-full bg-[#121217] border border-[#23232e] text-xs text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs tracking-wider transition-all uppercase ${
                  selectedCategory === cat
                    ? 'bg-[#f5f3ef] text-[#0c0c0e] font-bold'
                    : 'bg-[#131318] text-[#8e8c85] hover:text-white border border-[#202028]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#7e7c75]">
          <span>
            Showing <strong className="text-[#f5f3ef]">{filteredProducts.length}</strong> creations
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedGender !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedGender('All');
              }}
              className="text-[#c5a880] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#111116] rounded-2xl border border-[#22222a] p-8 space-y-4">
            <Sparkles className="w-8 h-8 text-[#c5a880] mx-auto opacity-70" />
            <h3 className="font-serif text-xl text-[#f5f3ef]">No matching creations found</h3>
            <p className="text-xs text-[#8e8c85] max-w-md mx-auto">
              Our atelier can custom craft any style you envision. Contact our master tailors or submit a custom request with your reference pictures.
            </p>
            <button
              onClick={onRequestCustomLook}
              className="px-6 py-3 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6be9a]"
            >
              Request Custom Outfit
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const isSaved = isDesignSaved(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group flex flex-col bg-[#121217] rounded-2xl overflow-hidden border border-[#23232c] hover:border-[#c5a880]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
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
                      onClick={e => handleToggleSave(e, product)}
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

                    {/* Stock status tag */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md text-[10px] tracking-wider uppercase font-medium text-[#c5a880] border border-[#c5a880]/30">
                        {product.leadTime || 'In Stock'}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-[#181822]/80 backdrop-blur-md text-[10px] tracking-wider uppercase font-medium text-[#9e9c95]">
                        {product.gender}
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
                      <p className="text-base font-bold text-[#c5a880] mt-1.5">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1e1e24] flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#78766f] truncate max-w-[40%]">
                        {product.sizes.join(', ')}
                      </span>

                      {/* WhatsApp Direct Order Button */}
                      <button
                        onClick={e => handleWhatsAppOrder(e, product)}
                        className="px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] sm:text-xs font-semibold tracking-wide flex items-center gap-1.5 hover:bg-[#20bd5a] transition-colors active:scale-95 shrink-0 whitespace-nowrap"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                        <span>Order via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
