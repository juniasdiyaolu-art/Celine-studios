import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  Heart,
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openSavedDesigns: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openSavedDesigns }) => {
  const { siteSettings, buildWhatsAppUrl, recordAnalyticsEvent } = useData();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    recordAnalyticsEvent('page_view', tab, `Footer link to ${tab}`);
  };

  const handleWhatsApp = () => {
    recordAnalyticsEvent('whatsapp_click', 'footer', 'Footer WhatsApp');
    const url = buildWhatsAppUrl("Hello Celine Studio, I would like to make an enquiry.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#09090b] text-[#d6d4cd] border-t border-[#1e1e24] pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#1c1c22]">
          {/* Col 1: Brand & Craft */}
          <div className="lg:col-span-2 space-y-4">
            <div className="select-none">
              <span className="font-serif text-3xl tracking-[0.2em] font-medium text-[#f5f3ef]">
                CELINE STUDIO
              </span>
              <p className="text-xs tracking-[0.2em] text-[#c5a880] uppercase mt-1 font-light">
                {siteSettings.tagline}
              </p>
            </div>
            <p className="text-sm text-[#9b9992] leading-relaxed max-w-sm">
              {siteSettings.supportingPhrase} Handcrafted in Nigeria with obsessive attention to silhouette, African heritage, and bespoke luxury tailoring.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={buildWhatsAppUrl("Hello Celine Studio, I'm following you from your website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#18181f] text-xs text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp: {siteSettings.whatsappNumber}</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#18181f] text-[#d6d4cd] hover:text-[#c5a880] border border-[#26262e] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#f5f3ef] font-semibold">
              Collections & Atelier
            </p>
            <ul className="space-y-2 text-sm text-[#9b9992]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#c5a880] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#c5a880] transition-colors">
                  Shop Ready-to-Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('custom')} className="hover:text-[#c5a880] transition-colors">
                  Custom Fashion
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('lookbook')} className="hover:text-[#c5a880] transition-colors">
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bookings')} className="hover:text-[#c5a880] transition-colors">
                  Book Fitting & Consultation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#c5a880] transition-colors">
                  Our Story & Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#f5f3ef] font-semibold">
              Client Experience
            </p>
            <ul className="space-y-2 text-sm text-[#9b9992]">
              <li>
                <button onClick={openSavedDesigns} className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Saved Designs</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bookings')} className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Studio Appointments</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('custom')} className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Request Custom Outfit</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#c5a880] transition-colors">
                  Contact & Studio Enquiries
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-[#c5a880] transition-colors text-xs text-zinc-600">
                  Business Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Location & Hours */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#f5f3ef] font-semibold">
              Visit Celine Studio
            </p>
            <div className="space-y-2 text-xs text-[#9b9992] leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>{siteSettings.address}, {siteSettings.country}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <p>{siteSettings.openingHoursWeekday}</p>
                  <p>{siteSettings.openingHoursSaturday}</p>
                  <p className="text-[#c5a880]">{siteSettings.openingHoursSunday}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={siteSettings.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#c5a880] hover:underline font-medium"
              >
                <span>Get Google Maps Directions</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6e6c66]">
          <p>© {new Date().getFullYear()} CELINE STUDIO. All rights reserved. Made in Nigeria.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('contact')} className="hover:text-[#d6d4cd]">
              Studio Policies
            </button>
            <button onClick={() => handleNav('about')} className="hover:text-[#d6d4cd]">
              Bespoke Measurement Guide
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-[#d6d4cd]">
              Privacy & Discretion
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
