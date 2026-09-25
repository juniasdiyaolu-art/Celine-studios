import React from 'react';
import { Sparkles, Scissors, Clock, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { CustomRequestForm } from './CustomRequestForm';
import { CustomRequest } from '../../types';
import { useData } from '../../context/DataContext';

interface CustomFashionPageProps {
  initialData?: Partial<CustomRequest>;
  onBookFitting: (request?: CustomRequest) => void;
}

export const CustomFashionPage: React.FC<CustomFashionPageProps> = ({
  initialData,
  onBookFitting
}) => {
  const { siteSettings, buildWhatsAppUrl } = useData();

  const faqs = [
    {
      q: 'How long does a custom bespoke outfit take to craft?',
      a: 'Standard custom pieces take 5–10 business days from fabric confirmation and measurement locking. For urgent wedding dates, express rush tailoring (48–72 hours) is available upon request.'
    },
    {
      q: 'Can I bring my own fabric, Ankara wax, or lace?',
      a: 'Absolutely. Many clients bring family Aso Ebi lace, vintage Dutch Hollandais, or hand-woven George fabrics to our studio in Iyana-Isashi. We inspect the fabric yield and recommend cuts accordingly.'
    },
    {
      q: 'I do not live in Lagos or Nigeria. How do I send measurements?',
      a: 'We dress international clients across the UK, USA, Canada, and Ghana regularly. Select "Send on WhatsApp" during submission, and our head tailor will send our video measurement guide or hop on a live video consultation.'
    },
    {
      q: 'How does payment and pricing work?',
      a: 'Once you submit your custom request, our master tailor reviews the fabric, beadwork, and complexity, then provides an exact quotation on WhatsApp. We typically work with a 70% production deposit and 30% upon fitting approval.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#16161f] text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Atelier Commission</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-[#f5f3ef] font-medium tracking-tight">
            Custom Fashion. Designed for You.
          </h1>

          <p className="text-sm sm:text-base text-[#a8a69f] leading-relaxed">
            Collaborate with Celine Studio to commission garments cut to your precise proportions, fabric dreams, and event grandeur. Every stitch is completed by our master Nigerian tailors.
          </p>
        </div>

        {/* The Multi-Step Form */}
        <CustomRequestForm
          initialData={initialData}
          onBookFittingNow={(req) => onBookFitting(req)}
        />

        {/* Custom Tailoring FAQs */}
        <div className="mt-24 max-w-3xl mx-auto pt-16 border-t border-[#1f1f28]">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold block mb-1">
              Atelier Guidance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#111116] border border-[#22222c]">
                <h3 className="font-serif text-lg text-[#f5f3ef] mb-2 flex items-start gap-2.5">
                  <span className="text-[#c5a880] font-light">0{i + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#9f9d96] pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Quick WhatsApp helper box */}
          <div className="mt-10 p-6 rounded-2xl bg-[#14141d] border border-[#c5a880]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="font-serif text-base text-[#f5f3ef] font-medium">
                Prefer to discuss directly with a human stylist?
              </p>
              <p className="text-xs text-[#8e8c85]">
                Our master tailor is available right now on WhatsApp.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl("Hello Celine Studio, I'd like to request a custom outfit.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#20bd5a] transition-all flex items-center gap-2 shrink-0 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Request on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
