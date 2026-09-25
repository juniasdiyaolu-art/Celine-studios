import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ContactPage: React.FC = () => {
  const { siteSettings, buildWhatsAppUrl, recordAnalyticsEvent } = useData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Custom Outfit Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleWhatsAppDirect = () => {
    recordAnalyticsEvent('whatsapp_click', 'contact_page_direct', 'Contact Page WhatsApp');
    const url = buildWhatsAppUrl("Hello Celine Studio, I'd like to make an enquiry.");
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    recordAnalyticsEvent('contact_form_submit', subject, `Contact Form: ${name}`);
    const whatsappMessage = `Hello Celine Studio,\nMy name is ${name}.\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const url = buildWhatsAppUrl(whatsappMessage);

    setSent(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 sm:py-20 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
            Connect With The Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f5f3ef] font-medium tracking-tight">
            Contact Celine Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#9f9d96] leading-relaxed">
            Our atelier doors in Iyana-Isashi are open for appointments, measurements, and consultations.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181822] text-[#c5a880] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#f5f3ef]">Studio Address</h3>
            <p className="text-xs text-[#a6a49d] leading-relaxed">
              {siteSettings.address}, {siteSettings.city}, {siteSettings.country}
            </p>
            <a
              href={siteSettings.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#c5a880] hover:underline font-medium pt-1"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181822] text-[#25D366] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#f5f3ef]">WhatsApp & Phone</h3>
            <p className="text-xs text-[#a6a49d] leading-relaxed">
              Direct line: {siteSettings.phone}<br />
              WhatsApp: {siteSettings.whatsappInternational}
            </p>
            <button
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline font-semibold pt-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Chat With Us</span>
            </button>
          </div>

          <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#181822] text-[#c5a880] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#f5f3ef]">Studio Hours</h3>
            <div className="text-xs text-[#a6a49d] space-y-1">
              <p>{siteSettings.openingHoursWeekday}</p>
              <p>{siteSettings.openingHoursSaturday}</p>
              <p className="text-[#c5a880] font-medium">{siteSettings.openingHoursSunday}</p>
            </div>
          </div>
        </div>

        {/* Map & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-6 bg-[#121217] border border-[#242430] rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-serif text-2xl text-[#f5f3ef] mb-2">Send an Atelier Message</h3>
            <p className="text-xs text-[#9b9992] mb-6">
              Fill out this form and we'll instantly connect with you on WhatsApp with your query ready.
            </p>

            {sent ? (
              <div className="p-8 text-center space-y-3 bg-[#15151e] rounded-xl border border-[#c5a880]/30">
                <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                <h4 className="font-serif text-xl text-[#f5f3ef]">Message Dispatched</h4>
                <p className="text-xs text-[#9f9d96]">
                  Your WhatsApp has opened with your inquiry. Our master tailor will respond promptly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs text-[#c5a880] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Bukola Saraki"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 09124465224"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Custom Outfit Inquiry">Custom Outfit Inquiry</option>
                    <option value="Fitting & Alteration Policy">Fitting & Alteration Policy</option>
                    <option value="Wedding & Aso Ebi Commission">Wedding & Aso Ebi Commission</option>
                    <option value="Ready-to-Wear Stock Availability">Ready-to-Wear Stock Availability</option>
                    <option value="International Order Delivery">International Order Delivery</option>
                    <option value="Other Studio Matter">Other Studio Matter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to ask or achieve..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#242430] bg-[#121217] shadow-xl">
            <div className="p-4 bg-[#161620] border-b border-[#252530] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#f5f3ef]">
                Celine Studio Location (Iyana-Isashi, Nigeria)
              </span>
              <a
                href={siteSettings.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#c5a880] hover:underline flex items-center gap-1"
              >
                <span>Open in Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="aspect-[16/11] w-full">
              <iframe
                title="Celine Studio Full Location Map"
                src={siteSettings.googleMapsEmbedUrl}
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
