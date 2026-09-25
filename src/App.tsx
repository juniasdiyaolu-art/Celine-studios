/**
 * CELINE STUDIO — Luxury Fashion Website & Business Management Platform
 * Bespoke Couture & Ready-to-Wear Atelier (Iyana-Isashi, La Clothine, Nigeria)
 */
import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingCTA } from './components/common/WhatsAppFloatingCTA';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Home Subsections
import { HeroSection } from './components/home/HeroSection';
import { FeaturedCollections } from './components/home/FeaturedCollections';
import { CustomSpotlight } from './components/home/CustomSpotlight';
import { ReadyToWearPreview } from './components/home/ReadyToWearPreview';
import { HowItWorks } from './components/home/HowItWorks';
import { LookbookPreview } from './components/home/LookbookPreview';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { VisitStudioSection } from './components/home/VisitStudioSection';
import { InstagramSection } from './components/home/InstagramSection';

// Page Views
import { ShopPage } from './components/shop/ShopPage';
import { CustomFashionPage } from './components/custom/CustomFashionPage';
import { LookbookPage } from './components/lookbook/LookbookPage';
import { BookingsPage } from './components/bookings/BookingsPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { LookbookDetailModal } from './components/lookbook/LookbookDetailModal';
import { CelineAIAssistant } from './components/ai/CelineAIAssistant';
import { SavedDesignsModal } from './components/saved/SavedDesignsModal';
import { Product, LookbookItem, CustomRequest } from './types';

const MainApp: React.FC = () => {
  const getInitialTab = (): string => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash === '#admin') return 'admin';
      if (path.includes('/shop') || hash === '#shop') return 'shop';
      if (path.includes('/custom') || hash === '#custom') return 'custom';
      if (path.includes('/lookbook') || hash === '#lookbook') return 'lookbook';
      if (path.includes('/bookings') || hash === '#bookings') return 'bookings';
      if (path.includes('/about') || hash === '#about') return 'about';
      if (path.includes('/contact') || hash === '#contact') return 'contact';
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isSavedDesignsOpen, setIsSavedDesignsOpen] = useState(false);
  const [customFormInitialData, setCustomFormInitialData] = useState<Partial<CustomRequest> | undefined>(undefined);
  const [bookingInitialService, setBookingInitialService] = useState<string | undefined>(undefined);

  // Sync with browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Helper actions
  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      const targetUrl = tab === 'home' ? '/' : `/${tab}`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({ tab }, '', targetUrl);
      }
    }
  };

  const handleStartCustomFromLookbook = (look?: LookbookItem) => {
    if (look) {
      setCustomFormInitialData({
        outfitType: look.category.includes('Senator') ? 'Senator' : look.category.includes('Dress') ? 'Dress' : 'Native / Ankara',
        gender: look.category.includes('Senator') ? 'Men' : 'Women',
        additionalNotes: `Inspired by lookbook style: "${look.title}".`,
        inspirationImages: [look.imageUrl]
      });
    } else {
      setCustomFormInitialData(undefined);
    }
    navigateToTab('custom');
  };

  const handleCustomWithProduct = (product: Product) => {
    setCustomFormInitialData({
      outfitType: product.category.includes('Senator') ? 'Senator' : product.category.includes('Dress') ? 'Dress' : 'Native / Ankara',
      gender: product.gender,
      preferredColor: product.colors[0],
      preferredFabric: product.material || product.fabric || 'Luxury African Fabric',
      additionalNotes: `Custom tailored variation of ready-to-wear piece: "${product.name}".`,
      inspirationImages: product.images
    });
    navigateToTab('custom');
  };

  const handleBookFittingForRequest = (request?: CustomRequest) => {
    setBookingInitialService('Bespoke Fitting Session');
    navigateToTab('bookings');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f5f3ef] flex flex-col selection:bg-[#c5a880] selection:text-[#0c0c0e]">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        openAiAssistant={() => setIsAiAssistantOpen(true)}
        openSavedDesigns={() => setIsSavedDesignsOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1 pb-16 lg:pb-0">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HeroSection
              onExploreCollection={() => navigateToTab('shop')}
              onCreateCustomLook={() => navigateToTab('custom')}
            />
            <FeaturedCollections
              onSelectCategory={(cat) => navigateToTab('shop')}
              onOpenCustom={() => navigateToTab('custom')}
            />
            <CustomSpotlight
              onRequestCustom={() => navigateToTab('custom')}
            />
            <ReadyToWearPreview
              onViewAllShop={() => navigateToTab('shop')}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />
            <HowItWorks
              onStartCustomRequest={() => navigateToTab('custom')}
            />
            <LookbookPreview
              onViewAllLookbook={() => navigateToTab('lookbook')}
              onSelectLook={(item) => setSelectedLook(item)}
            />
            <WhyChooseUs />
            <TestimonialsSection />
            <VisitStudioSection
              onBookAppointment={() => {
                setBookingInitialService('Studio Visit & Fabric Viewing');
                navigateToTab('bookings');
              }}
            />
            <InstagramSection />
          </div>
        )}

        {activeTab === 'shop' && (
          <ShopPage
            onSelectProduct={(p) => setSelectedProduct(p)}
            onRequestCustomLook={() => navigateToTab('custom')}
          />
        )}

        {activeTab === 'custom' && (
          <CustomFashionPage
            initialData={customFormInitialData}
            onBookFitting={handleBookFittingForRequest}
          />
        )}

        {activeTab === 'lookbook' && (
          <LookbookPage
            onSelectLook={(item) => setSelectedLook(item)}
            onRequestCustomFromLookbook={handleStartCustomFromLookbook}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingsPage initialService={bookingInitialService} />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onStartCustom={() => navigateToTab('custom')}
            onBookFitting={() => {
              setBookingInitialService('Bespoke Fitting Session');
              navigateToTab('bookings');
            }}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard onNavigateHome={() => navigateToTab('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={navigateToTab}
        openSavedDesigns={() => setIsSavedDesignsOpen(true)}
      />

      {/* Persistent Floating WhatsApp CTA */}
      <WhatsAppFloatingCTA />

      {/* Persistent Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        openSavedDesigns={() => setIsSavedDesignsOpen(true)}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCustomWithProduct={handleCustomWithProduct}
        />
      )}

      {/* Lookbook Detail Modal */}
      {selectedLook && (
        <LookbookDetailModal
          item={selectedLook}
          onClose={() => setSelectedLook(null)}
          onRequestSimilar={handleStartCustomFromLookbook}
        />
      )}

      {/* Celine AI Fashion Concierge Modal */}
      <CelineAIAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpenCustomRequest={() => navigateToTab('custom')}
      />

      {/* Saved Designs Drawer */}
      <SavedDesignsModal
        isOpen={isSavedDesignsOpen}
        onClose={() => setIsSavedDesignsOpen(false)}
        onExploreShop={() => navigateToTab('shop')}
      />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
