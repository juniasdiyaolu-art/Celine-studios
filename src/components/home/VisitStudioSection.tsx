import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ArrowUpRight, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface VisitStudioSectionProps {
  onBookAppointment: () => void;
}

export const VisitStudioSection: React.FC<VisitStudioSectionProps> = ({ onBookAppointment }) => {
  const { siteSettings, buildWhatsAppUrl, recordAnalyticsEvent } = useData();

  const handleContactStudio = () => {
    recordAnalyticsEvent('whatsapp_click', 'visit_studio', 'Visit Studio Contact');
    const url = buildWhatsAppUrl("Hello Celine Studio, I would like to visit the studio in Iyana-Isashi for a consultation/fitting.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGetDirections = () => {
    recordAnalyticsEvent('whatsapp_click', 'map_directions', 'Get Directions Click');
    window.open(siteSettings.googleMapsDirectionsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-24 bg-[#0a0a0c] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium border border-[#c5a880]/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Studio Atelier & Fitting Salon</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#f5f3ef] font-medium">
              Visit Celine Studio
            </h2>

            <p className="text-sm text-[#a8a69e] leading-relaxed">
              Experience the private salon atmosphere where fabrics are draped, measurements are taken, and your vision takes tangible shape. We welcome clients for bespoke appointments and ready-to-wear private viewings.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-sm text-[#dedcd5]">
                <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#272732] flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8a8880] font-medium">Location</p>
                  <p className="font-medium text-base text-[#f5f3ef]">{siteSettings.address}</p>
                  <p className="text-xs text-[#9e9c94]">{siteSettings.city}, {siteSettings.country}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#dedcd5]">
                <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#272732] flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8a8880] font-medium">Opening Hours</p>
                  <p className="text-xs text-[#d6d4ce]">{siteSettings.openingHoursWeekday}</p>
                  <p className="text-xs text-[#d6d4ce]">{siteSettings.openingHoursSaturday}</p>
                  <p className="text-xs text-[#c5a880] font-medium">{siteSettings.openingHoursSunday}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#dedcd5]">
                <div className="w-9 h-9 rounded-full bg-[#181820] border border-[#272732] flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8a8880] font-medium">Contact & WhatsApp</p>
                  <p className="font-semibold text-sm text-[#f5f3ef]">{siteSettings.whatsappInternational}</p>
                  <p className="text-xs text-[#8a8880]">Direct Atelier Hotline: {siteSettings.phone}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                id="visit-get-directions-btn"
                onClick={handleGetDirections}
                className="px-6 py-3.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all flex items-center gap-2 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </button>

              <button
                id="visit-contact-studio-btn"
                onClick={handleContactStudio}
                className="px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all flex items-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Contact Studio</span>
              </button>

              <button
                onClick={onBookAppointment}
                className="px-6 py-3.5 rounded-full border border-[#2d2d38] bg-[#14141c] text-[#dcdad3] text-xs font-semibold tracking-wider uppercase hover:bg-[#1d1d28] hover:text-white transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#c5a880]" />
                <span>Book Fitting Appointment</span>
              </button>
            </div>
          </div>

          {/* Right column: Interactive Google Map view */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#282834] bg-[#13131a] shadow-2xl">
              {/* Map header info */}
              <div className="px-5 py-3.5 bg-[#161620] border-b border-[#252530] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-xs font-medium text-[#dedcd5]">Studio Active & Open</span>
                </div>
                <a
                  href={siteSettings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c5a880] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map embed container with responsive 16:9 or 4:3 ratio */}
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full relative">
                <iframe
                  title="Celine Studio Location Map"
                  src={siteSettings.googleMapsEmbedUrl}
                  className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Map Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-[#0e0e14]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#c5a880]/40 shadow-xl max-w-xs">
                  <p className="font-serif text-sm font-semibold text-[#f5f3ef]">
                    CELINE STUDIO
                  </p>
                  <p className="text-[11px] text-[#b8b6af] mt-0.5">
                    Iyana-Isashi, La Clothine, Nigeria
                  </p>
                  <p className="text-[10px] text-[#c5a880] mt-1 font-medium">
                    WhatsApp: 09124465224
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
