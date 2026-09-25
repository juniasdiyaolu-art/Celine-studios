import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle, Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, submitTestimonial } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Form state
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Only show approved testimonials
  const approvedTestimonials = testimonials.filter(t => t.approved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;

    await submitTestimonial({
      customerName: name.trim(),
      productOrService: service.trim() || 'Custom Bespoke Outfit',
      rating,
      review: review.trim(),
      location: location.trim() || 'Nigeria',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    });

    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setName('');
      setService('');
      setReview('');
      setLocation('');
    }, 2500);
  };

  const nextMobile = () => {
    setMobileIndex(prev => (prev + 1) % approvedTestimonials.length);
  };

  const prevMobile = () => {
    setMobileIndex(prev => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length);
  };

  return (
    <section className="py-24 bg-[#0a0a0d] border-b border-[#1f1f26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium block mb-2">
              Client Reverence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#f5f3ef] font-medium">
              Voices of Distinction
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c5a880]/40 bg-[#16161d] text-[#e0ded8] hover:bg-[#20202a] hover:border-[#c5a880] text-xs font-semibold tracking-wider transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {approvedTestimonials.map(item => (
            <div
              key={item.id}
              className="bg-[#121217] border border-[#23232c] rounded-2xl p-6 flex flex-col justify-between hover:border-[#c5a880]/40 transition-colors shadow-md"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#c5a880]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < item.rating ? 'fill-current' : 'text-zinc-700'}`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-[13px] text-[#c7c5be] leading-relaxed italic mb-6 break-words">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1e1e24] flex items-center gap-3 min-w-0">
                <img
                  src={item.profileImage}
                  alt={item.customerName}
                  className="w-10 h-10 rounded-full object-cover border border-[#c5a880]/30 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[#f5f3ef] flex items-center gap-1 truncate">
                    <span className="truncate">{item.customerName}</span>
                    <CheckCircle className="w-3 h-3 text-[#c5a880] shrink-0" />
                  </h4>
                  <p className="text-[10px] text-[#c5a880] font-medium truncate">
                    {item.productOrService}
                  </p>
                  {item.location && (
                    <p className="text-[10px] text-[#716f6a] truncate">{item.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          {approvedTestimonials.length > 0 && (
            <div className="bg-[#121217] border border-[#23232c] rounded-2xl p-6 relative">
              <div className="flex items-center gap-1 mb-4 text-[#c5a880]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < approvedTestimonials[mobileIndex].rating ? 'fill-current' : 'text-zinc-700'}`}
                  />
                ))}
              </div>

              <p className="text-sm text-[#c7c5be] leading-relaxed italic mb-6 break-words">
                "{approvedTestimonials[mobileIndex].review}"
              </p>

              <div className="pt-4 border-t border-[#1e1e24] flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={approvedTestimonials[mobileIndex].profileImage}
                    alt={approvedTestimonials[mobileIndex].customerName}
                    className="w-10 h-10 rounded-full object-cover border border-[#c5a880]/30 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-semibold text-[#f5f3ef] truncate">
                      {approvedTestimonials[mobileIndex].customerName}
                    </h4>
                    <p className="text-[11px] text-[#c5a880] truncate">
                      {approvedTestimonials[mobileIndex].productOrService}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMobile}
                    className="p-2 rounded-full bg-[#181820] text-[#f5f3ef] border border-[#272730]"
                    aria-label="Previous review"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextMobile}
                    className="p-2 rounded-full bg-[#181820] text-[#f5f3ef] border border-[#272730]"
                    aria-label="Next review"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Experience Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#14141a] border border-[#2d2d38] rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#f5f3ef]">
              Share Your Celine Studio Experience
            </h3>
            <p className="text-xs text-[#9f9d96] mt-1">
              Your feedback inspires our tailors and guides fellow fashion patrons.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#c5a880] mx-auto" />
                <h4 className="font-serif text-xl text-[#f5f3ef]">Thank You</h4>
                <p className="text-xs text-[#9f9d96]">
                  Your review has been submitted to the atelier team and will be displayed after review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Adebayo Adeleke"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8e8c85] mb-1 font-medium">
                      Outfit / Service Purchased
                    </label>
                    <input
                      type="text"
                      value={service}
                      onChange={e => setService(e.target.value)}
                      placeholder="e.g. Custom Senator Suit"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8e8c85] mb-1 font-medium">
                      Location / City
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Lekki, Lagos"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] mb-1 font-medium">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-2 text-[#c5a880]">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-zinc-700'}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#a6a49e] ml-2">{rating} of 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8e8c85] mb-1 font-medium">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    placeholder="Tell us about the craftsmanship, fitting, fabric quality, and service..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0e0e12] border border-[#24242e] text-sm text-[#f5f3ef] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-medium text-[#8e8c85] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold tracking-wider uppercase hover:bg-[#d6be9a] transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
