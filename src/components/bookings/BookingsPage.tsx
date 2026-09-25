import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Video,
  Scissors,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Booking } from '../../types';

interface BookingsPageProps {
  initialService?: string;
}

export const BookingsPage: React.FC<BookingsPageProps> = ({ initialService }) => {
  const { siteSettings, createBooking, buildWhatsAppUrl, getBookingWhatsAppMessage, recordAnalyticsEvent } = useData();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [service, setService] = useState<string>(
    initialService || 'Custom Design Consultation'
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [locationType, setLocationType] = useState<'studio' | 'virtual'>('studio');
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const services: string[] = [
    'Custom Design Consultation',
    'Measurement Appointment',
    'Bespoke Fitting Session',
    'Bridal & Groom Consultation',
    'Studio Visit & Fabric Viewing',
    'Other Appointment'
  ];

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !preferredDate) return;

    const newBooking = await createBooking({
      customerName: customerName.trim(),
      whatsappNumber: customerPhone.trim(),
      customerPhone: customerPhone.trim(),
      email: customerEmail.trim() || undefined,
      appointmentType: (service as any) || 'Custom Design Consultation',
      service,
      preferredDate,
      preferredTime,
      locationType,
      notes: notes.trim() || undefined
    });

    setConfirmedBooking(newBooking);
    recordAnalyticsEvent('booking_submitted', newBooking.id, `Booking: ${service}`);
  };

  const handleWhatsAppConfirm = () => {
    if (!confirmedBooking) return;
    const message = getBookingWhatsAppMessage(confirmedBooking);
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (confirmedBooking) {
    const formattedMsg = getBookingWhatsAppMessage(confirmedBooking);
    return (
      <div className="py-16 bg-[#0a0a0c] min-h-[85vh] flex items-center justify-center">
        <div className="bg-[#121218] border border-[#2d2d3c] rounded-2xl p-6 sm:p-10 text-center max-w-xl mx-auto shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
            Appointment Booked
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ef] font-medium mt-2">
            We Look Forward to Welcoming You.
          </h2>

          <div className="mt-4 p-4 rounded-xl bg-[#161622] border border-[#252535] inline-block text-left text-xs">
            <p className="text-[#8e8c85]">Booking Reference ID:</p>
            <p className="font-mono text-base font-bold text-[#c5a880]">{confirmedBooking.id}</p>
          </div>

          <p className="mt-6 text-sm text-[#b8b6ae] leading-relaxed">
            Your appointment for <strong className="text-white">{confirmedBooking.service}</strong> has been scheduled for{' '}
            <strong className="text-white">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</strong> ({confirmedBooking.locationType === 'studio' ? 'In-Studio at Iyana-Isashi' : 'Virtual on WhatsApp'}).
          </p>

          <div className="mt-6 text-left p-4 rounded-xl bg-[#0d0d12] border border-[#23232e] text-xs text-[#9f9d96] font-mono whitespace-pre-line max-h-40 overflow-y-auto">
            {formattedMsg}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleWhatsAppConfirm}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Continue on WhatsApp</span>
            </button>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full sm:w-auto px-6 py-4 rounded-full border border-[#2c2c38] text-[#a4a29a] text-xs uppercase tracking-wider hover:text-white"
            >
              Schedule Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#16161f] text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Private Atelier Consultation</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#f5f3ef] font-medium tracking-tight">
            Book a Fitting or Consultation
          </h1>
          <p className="text-xs sm:text-sm text-[#9f9d96] leading-relaxed">
            Reserve a private session with our master tailor in Iyana-Isashi, Nigeria, or schedule a virtual video consultation from anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Studio info & perks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-4">
              <h3 className="font-serif text-xl text-[#f5f3ef]">The Studio Experience</h3>
              <p className="text-xs text-[#9e9c95] leading-relaxed">
                During your visit to Celine Studio, our head stylist guides you through authentic African and European luxury fabric swatches, captures over 18 precise anatomical measurements, and sketches design modifications.
              </p>

              <div className="pt-2 space-y-3 text-xs text-[#dedcd5]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f5f3ef]">{siteSettings.address}</p>
                    <p className="text-[#8e8c85]">{siteSettings.city}, {siteSettings.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <p>{siteSettings.openingHoursWeekday}</p>
                    <p>{siteSettings.openingHoursSaturday}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#14141d] border border-[#c5a880]/30 rounded-2xl p-6 space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                Quick WhatsApp Booking
              </p>
              <p className="text-xs text-[#a6a49d] leading-relaxed">
                Prefer to schedule immediately on your phone with our concierge?
              </p>
              <a
                href={buildWhatsAppUrl("Hello Celine Studio, I'd like to book an appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Continue on WhatsApp</span>
              </a>
            </div>

            <div className="bg-[#14141d] border border-[#242430] rounded-2xl p-6 space-y-2">
              <p className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                International Clients
              </p>
              <p className="text-xs text-[#a6a49d] leading-relaxed">
                Living in the UK, USA, Canada, or outside Lagos? Select <strong>Virtual Consultation</strong> and our head tailor will conduct a live measurement session on WhatsApp.
              </p>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 bg-[#121217] border border-[#242430] rounded-2xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Chief Adeleke or Dr. Amara"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="For calendar invite"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              {/* Service selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                  Service Needed *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={`p-3 rounded-xl text-xs font-medium text-left border transition-all ${
                        service === s
                          ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                          : 'border-[#22222c] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                  Meeting Location Preference *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType('studio')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                      locationType === 'studio'
                        ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0c0e]'
                        : 'border-[#24242e] bg-[#0e0e12] text-[#dedcd5]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>In Studio (Iyana-Isashi)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('virtual')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                      locationType === 'virtual'
                        ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0c0e]'
                        : 'border-[#24242e] bg-[#0e0e12] text-[#dedcd5]'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Virtual (WhatsApp Video)</span>
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={e => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t} className="bg-[#14141a]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Appointment Notes / Special Requests
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Mention if you are bringing your own fabric, have an upcoming wedding date, or any specific requests..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Continue on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
