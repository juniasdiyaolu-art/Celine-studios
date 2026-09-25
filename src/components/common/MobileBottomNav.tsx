import React from 'react';
import { Home, ShoppingBag, Sparkles, Image, Calendar, MessageCircle, Heart } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSavedDesigns: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  openSavedDesigns
}) => {
  const { buildWhatsAppUrl, recordAnalyticsEvent, savedItems } = useData();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    recordAnalyticsEvent('page_view', tab, `Mobile nav to ${tab}`);
  };

  const handleWhatsApp = () => {
    recordAnalyticsEvent('whatsapp_click', 'mobile_bottom_bar', 'Mobile Nav WhatsApp');
    const url = buildWhatsAppUrl("Hello Celine Studio, I would like to make an enquiry.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'custom', label: 'Custom', icon: Sparkles },
    { id: 'lookbook', label: 'Lookbook', icon: Image },
    { id: 'bookings', label: 'Bookings', icon: Calendar }
  ];

  return (
    <div
      id="mobile-bottom-nav-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e12]/95 backdrop-blur-lg border-t border-[#222228] px-2 py-1.5 flex items-center justify-around"
    >
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`mobile-tab-${item.id}`}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
              isActive ? 'text-[#c5a880]' : 'text-[#8e8c85] hover:text-[#f5f3ef]'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] tracking-tight font-medium">{item.label}</span>
          </button>
        );
      })}

      {/* Saved items */}
      <button
        onClick={openSavedDesigns}
        className="relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[#8e8c85] hover:text-[#f5f3ef]"
        aria-label="Saved Designs"
      >
        <Heart className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] tracking-tight font-medium">Saved</span>
        {savedItems.length > 0 && (
          <span className="absolute top-0 right-2 w-3.5 h-3.5 bg-[#c5a880] text-[#0c0c0e] rounded-full text-[9px] font-bold flex items-center justify-center">
            {savedItems.length}
          </span>
        )}
      </button>

      {/* Persistent WhatsApp mobile action */}
      <button
        id="mobile-nav-whatsapp-btn"
        onClick={handleWhatsApp}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[#25D366] hover:bg-[#25D366]/10"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-4 h-4 mb-0.5 fill-current" />
        <span className="text-[10px] tracking-tight font-semibold">WhatsApp</span>
      </button>
    </div>
  );
};
