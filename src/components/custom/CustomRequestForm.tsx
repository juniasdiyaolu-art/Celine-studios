import React, { useState } from 'react';
import {
  Upload,
  Sparkles,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  X,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Info
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CustomRequest } from '../../types';

interface CustomRequestFormProps {
  initialData?: Partial<CustomRequest>;
  onSuccess?: (request: CustomRequest) => void;
  onBookFittingNow?: (request: CustomRequest) => void;
}

export const CustomRequestForm: React.FC<CustomRequestFormProps> = ({
  initialData,
  onSuccess,
  onBookFittingNow
}) => {
  const { createCustomRequest, buildWhatsAppUrl, getCustomRequestWhatsAppMessage, recordAnalyticsEvent } = useData();

  const [step, setStep] = useState<number>(1);
  const [submittedRequest, setSubmittedRequest] = useState<CustomRequest | null>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState(initialData?.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(initialData?.customerPhone || '');
  const [customerEmail, setCustomerEmail] = useState(initialData?.customerEmail || '');
  const [gender, setGender] = useState<'Men' | 'Women' | 'Unisex'>(initialData?.gender || 'Women');
  const [outfitType, setOutfitType] = useState(initialData?.outfitType || 'Dress');
  const [occasion, setOccasion] = useState(initialData?.occasion || 'Wedding');
  const [preferredColor, setPreferredColor] = useState(initialData?.preferredColor || '');
  const [preferredFabric, setPreferredFabric] = useState(initialData?.preferredFabric || 'Ankara / African Wax');
  const [preferredStyle, setPreferredStyle] = useState(initialData?.preferredStyle || 'Structured');
  const [eventDate, setEventDate] = useState(initialData?.eventDate || '');
  const [budgetRange, setBudgetRange] = useState(initialData?.budgetRange || '₦100,000 - ₦200,000');
  const [additionalNotes, setAdditionalNotes] = useState(initialData?.additionalNotes || '');
  const [measurementPreference, setMeasurementPreference] = useState<'provide_now' | 'book_fitting' | 'send_whatsapp'>(
    initialData?.measurementPreference || 'send_whatsapp'
  );

  // Measurements if "provide_now"
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [sleeve, setSleeve] = useState('');
  const [outfitLength, setOutfitLength] = useState('');

  // Inspiration images
  const [inspirationImages, setInspirationImages] = useState<string[]>(
    initialData?.inspirationImages || []
  );

  const sampleInspirations = [
    {
      title: 'French Lace Corseted Gown',
      url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Super 160s Sovereign Senator',
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Royal Hollandais Wax Ensemble',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Swiss Damask Agbada',
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const outfitTypes = [
    'Dress',
    'Native / Ankara',
    'Senator',
    'Two-piece Set',
    'Shirt',
    'Trousers',
    'Gown',
    'Corporate Blazer',
    'Occasion Wear',
    'Wedding Reception',
    'Agbada 3-Piece',
    'Other'
  ];

  const occasions = [
    'Wedding',
    'Traditional Ceremony',
    'Birthday Celebration',
    'Gala / Red Carpet',
    'Corporate / Executive',
    'Dinner Date',
    'Church / Thanksgiving',
    'Casual / Resort',
    'Other'
  ];

  const fabrics = [
    'Ankara / African Wax',
    'Super Italian Wool / Cashmere',
    'Swiss Voile Lace',
    'French Duchess Silk / Satin',
    'Chiffon & Organza',
    'Brocade / Damask',
    'Raw Linen',
    'Client Providing Fabric',
    'Tailor Advice Needed'
  ];

  const styles = [
    'Fitted & Corseted',
    'Flowing & Ethereal',
    'Structured & Architectural',
    'Minimalist Modern',
    'Dramatic & Regal',
    'Traditional Classic',
    'Modern African Fusion'
  ];

  const budgetRanges = [
    'Under ₦75,000',
    '₦75,000 - ₦120,000',
    '₦120,000 - ₦200,000',
    '₦200,000 - ₦500,000',
    '₦500,000+ (VIP Bespoke)'
  ];

  // Handle image upload from computer / mobile
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setInspirationImages(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addSampleInspiration = (url: string) => {
    if (!inspirationImages.includes(url)) {
      setInspirationImages(prev => [...prev, url]);
    }
  };

  const removeImage = (index: number) => {
    setInspirationImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRequestData: Omit<CustomRequest, 'id' | 'createdAt' | 'status'> = {
      customerName: customerName.trim(),
      whatsappNumber: customerPhone.trim(),
      customerPhone: customerPhone.trim(),
      email: customerEmail.trim() || undefined,
      gender,
      outfitType,
      occasion,
      preferredColor: preferredColor.trim() || 'Client to confirm on WhatsApp',
      preferredFabric,
      preferredStyle,
      eventDate: eventDate || 'Flexible',
      budgetRange,
      notes: additionalNotes.trim() || 'Custom bespoke tailoring request.',
      additionalNotes: additionalNotes.trim() || undefined,
      inspirationImages,
      measurementPreference,
      measurements: measurementPreference === 'provide_now' ? {
        chest: chest ? Number(chest) : undefined,
        waist: waist ? Number(waist) : undefined,
        hips: hips ? Number(hips) : undefined,
        shoulder: shoulder ? Number(shoulder) : undefined,
        sleeve: sleeve ? Number(sleeve) : undefined,
        length: outfitLength ? Number(outfitLength) : undefined
      } : undefined
    };

    const savedRequest = await createCustomRequest(newRequestData);
    setSubmittedRequest(savedRequest);
    recordAnalyticsEvent('custom_request_submitted', savedRequest.id, `Custom Request: ${outfitType}`);

    if (onSuccess) {
      onSuccess(savedRequest);
    }
  };

  const handleSendToWhatsApp = () => {
    if (!submittedRequest) return;
    const message = getCustomRequestWhatsAppMessage(submittedRequest);
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // SUCCESS VIEW
  if (submittedRequest) {
    const formattedWhatsAppMsg = getCustomRequestWhatsAppMessage(submittedRequest);

    return (
      <div className="bg-[#121218] border border-[#2d2d3c] rounded-2xl p-6 sm:p-10 text-center max-w-2xl mx-auto shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
          Design Request Registered
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f3ef] font-medium mt-2">
          Your Vision is in Motion.
        </h2>

        <div className="mt-4 p-4 rounded-xl bg-[#161622] border border-[#252535] inline-block text-left text-xs">
          <p className="text-[#8e8c85]">Request Reference ID:</p>
          <p className="font-mono text-base font-bold text-[#c5a880]">{submittedRequest.id}</p>
        </div>

        <p className="mt-6 text-sm text-[#b8b6ae] leading-relaxed max-w-lg mx-auto">
          We have recorded your custom order for <strong className="text-white">{submittedRequest.outfitType}</strong>. To finalize fabric swatches, confirm fitting schedules, and get master tailor pricing, send your request directly to our WhatsApp.
        </p>

        {/* WhatsApp Message Preview Accordion */}
        <div className="mt-6 text-left p-4 rounded-xl bg-[#0d0d12] border border-[#23232e] text-xs text-[#9f9d96] font-mono whitespace-pre-line max-h-48 overflow-y-auto">
          {formattedWhatsAppMsg}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="custom-send-whatsapp-final-btn"
            onClick={handleSendToWhatsApp}
            className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span>Send Request on WhatsApp</span>
          </button>

          {onBookFittingNow && (
            <button
              onClick={() => onBookFittingNow(submittedRequest)}
              className="w-full sm:w-auto px-6 py-4 rounded-full border border-[#c5a880]/50 bg-[#171722] text-[#dedcd5] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#212130] transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#c5a880]" />
              <span>Book Fitting at Studio</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121217] border border-[#262633] rounded-2xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
            Bespoke Request Step {step} of 3
          </span>
          <span className="text-xs text-[#8e8c85]">
            {step === 1 && 'Personal & Outfit Silhouette'}
            {step === 2 && 'Textile, Style & Inspirations'}
            {step === 3 && 'Measurements & Timeline'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#1f1f2a] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c5a880] transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(prev => Math.min(3, prev + 1)); }}>
        {/* STEP 1: Personal & Outfit Category */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Chioma Okafor or Tunde Bakare"
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 08012345678 or +234..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="For order tracking & invoice"
                className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            {/* Gender Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                Outfit Category / Gender *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Women', 'Men', 'Unisex'] as const).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                      gender === g
                        ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0c0e]'
                        : 'border-[#252530] bg-[#0e0e12] text-[#dedcd5] hover:border-[#3d3d4e]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Type of outfit */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                Type of Outfit *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {outfitTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOutfitType(type)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                      outfitType === type
                        ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                        : 'border-[#22222c] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5] hover:border-[#333342]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                Defining Occasion *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {occasions.map(occ => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                      occasion === occ
                        ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                        : 'border-[#22222c] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5] hover:border-[#333342]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={!customerName || !customerPhone}
                className="px-8 py-3.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all flex items-center gap-2 disabled:opacity-40"
              >
                <span>Continue to Fabric & Design</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Textile, Color, Style & Inspiration Upload */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Preferred Color Palette
                </label>
                <input
                  type="text"
                  value={preferredColor}
                  onChange={e => setPreferredColor(e.target.value)}
                  placeholder="e.g. Emerald green, Royal navy, Champagne gold..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Fabric Preference
                </label>
                <select
                  value={preferredFabric}
                  onChange={e => setPreferredFabric(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                >
                  {fabrics.map(f => (
                    <option key={f} value={f} className="bg-[#14141a]">
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Silhouette Style */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                Silhouette & Cut Feel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {styles.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPreferredStyle(s)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                      preferredStyle === s
                        ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                        : 'border-[#22222c] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* INSPIRATION IMAGES UPLOAD (Drag and drop + file selector + sample picker) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-[#8e8c85] font-medium">
                  Inspiration Photos / Sketches
                </label>
                <span className="text-[11px] text-[#716f6a]">
                  Upload your photos or select from our studio looks
                </span>
              </div>

              {/* Upload Drop Area */}
              <div className="border-2 border-dashed border-[#282836] hover:border-[#c5a880]/60 rounded-xl p-6 text-center bg-[#0d0d12] transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-[#c5a880] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs text-[#dedcd5] font-medium">
                  Click to upload or drag inspiration images here
                </p>
                <p className="text-[11px] text-[#78766f] mt-1">
                  Supports PNG, JPG, WEBP from your phone or gallery
                </p>
              </div>

              {/* Display Uploaded Photos */}
              {inspirationImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {inspirationImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-24 rounded-lg overflow-hidden border border-[#c5a880]/40 group">
                      <img src={img} alt="Inspiration" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Sample Inspiration Quick Picker */}
              <div className="mt-4 pt-3 border-t border-[#1e1e28]">
                <p className="text-[11px] text-[#8e8c85] mb-2 font-medium">
                  Or pick a reference from Celine Studio archive:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sampleInspirations.map((sample, i) => (
                    <div
                      key={i}
                      onClick={() => addSampleInspiration(sample.url)}
                      className="group cursor-pointer rounded-lg overflow-hidden border border-[#262633] hover:border-[#c5a880] bg-[#14141a] p-1.5 transition-all"
                    >
                      <div className="aspect-[3/2] overflow-hidden rounded mb-1">
                        <img src={sample.url} alt={sample.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <p className="text-[10px] text-[#b8b6ae] line-clamp-1 group-hover:text-[#c5a880]">
                        + Add {sample.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                Tell Us More About Your Vision
              </label>
              <textarea
                rows={3}
                value={additionalNotes}
                onChange={e => setAdditionalNotes(e.target.value)}
                placeholder="Mention specific neckline preferences, embroidery placement, train length, corsetry details, or questions..."
                className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#8e8c85] hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all flex items-center gap-2"
              >
                <span>Continue to Timeline & Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Timeline, Budget & Measurements */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Needed By / Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-1.5">
                  Estimated Budget Range
                </label>
                <select
                  value={budgetRange}
                  onChange={e => setBudgetRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                >
                  {budgetRanges.map(b => (
                    <option key={b} value={b} className="bg-[#14141a]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Measurement Preference */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8e8c85] font-medium mb-2">
                How would you prefer to handle measurements?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMeasurementPreference('send_whatsapp')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    measurementPreference === 'send_whatsapp'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                      : 'border-[#252530] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5]'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] mb-2" />
                  <p className="text-xs font-semibold">Send on WhatsApp</p>
                  <p className="text-[10px] text-[#7e7c75] mt-1">
                    Send measurements or voice note directly to our tailor.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMeasurementPreference('book_fitting')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    measurementPreference === 'book_fitting'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                      : 'border-[#252530] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5]'
                  }`}
                >
                  <Calendar className="w-5 h-5 text-[#c5a880] mb-2" />
                  <p className="text-xs font-semibold">In-Studio Fitting</p>
                  <p className="text-[10px] text-[#7e7c75] mt-1">
                    Visit Celine Studio in Iyana-Isashi for physical draping.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMeasurementPreference('provide_now')}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    measurementPreference === 'provide_now'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#f5f3ef]'
                      : 'border-[#252530] bg-[#0e0e12] text-[#8e8c85] hover:text-[#dedcd5]'
                  }`}
                >
                  <Ruler className="w-5 h-5 text-[#c5a880] mb-2" />
                  <p className="text-xs font-semibold">Enter Values Now</p>
                  <p className="text-[10px] text-[#7e7c75] mt-1">
                    Input your inches or cm right here in this form.
                  </p>
                </button>
              </div>
            </div>

            {/* Optional Measurement Fields if selected */}
            {measurementPreference === 'provide_now' && (
              <div className="p-4 rounded-xl bg-[#0e0e12] border border-[#242430] space-y-3">
                <p className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold">
                  Body Measurements (Inches)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-[#8e8c85]">Chest / Bust</label>
                    <input
                      type="number"
                      placeholder="e.g. 38"
                      value={chest}
                      onChange={e => setChest(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#14141a] border border-[#272734] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8e8c85]">Waist</label>
                    <input
                      type="number"
                      placeholder="e.g. 32"
                      value={waist}
                      onChange={e => setWaist(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#14141a] border border-[#272734] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8e8c85]">Hips</label>
                    <input
                      type="number"
                      placeholder="e.g. 42"
                      value={hips}
                      onChange={e => setHips(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#14141a] border border-[#272734] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8e8c85]">Shoulder Width</label>
                    <input
                      type="number"
                      placeholder="e.g. 17"
                      value={shoulder}
                      onChange={e => setShoulder(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#14141a] border border-[#272734] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8e8c85]">Sleeve Length</label>
                    <input
                      type="number"
                      placeholder="e.g. 25"
                      value={sleeve}
                      onChange={e => setSleeve(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#14141a] border border-[#272734] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8e8c85]">Outfit Length</label>
                    <input
                      type="number"
                      placeholder="e.g. 60"
                      value={outfitLength}
                      onChange={e => setOutfitLength(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[#14141a] border border-[#272734] text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 flex items-center justify-between border-t border-[#202028]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#8e8c85] hover:text-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                id="submit-custom-request-btn"
                type="submit"
                className="px-8 py-4 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-all shadow-xl flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit & Generate WhatsApp Message</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
