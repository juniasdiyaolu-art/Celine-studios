import { Product, LookbookItem, CustomRequest, Booking, Testimonial, SiteSettings, NotificationItem } from '../types';

export const initialSiteSettings: SiteSettings = {
  brandName: 'CELINE STUDIO',
  tagline: 'Custom Fashion. Designed for You.',
  supportingPhrase: 'Where Personal Style Meets Exceptional Craftsmanship.',
  phone: '09124465224',
  whatsappNumber: '09124465224',
  whatsappInternational: '+234 912 446 5224',
  whatsappLink: 'https://wa.me/2349124465224',
  address: 'Iyana-Isashi, La Clothine, Nigeria',
  city: 'Lagos State',
  country: 'Nigeria',
  openingHoursWeekday: 'Monday – Friday: 9:00 AM – 7:00 PM',
  openingHoursSaturday: 'Saturday: 10:00 AM – 6:00 PM',
  openingHoursSunday: 'Sunday: By Special Appointment Only',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15857.77884879796!2d3.1492025!3d6.4907994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b879155799c8f%3A0x6a0a030cb0460c5a!2sIyana%20Isashi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Iyana-Isashi,+Lagos,+Nigeria',
  instagramHandle: '@celinestudiong',
  instagramUrl: 'https://instagram.com'
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'The Royal Emerald Mermaid Gown',
    category: 'Custom Dresses',
    price: 185000,
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'Custom Measurement'],
    colors: ['Emerald Green', 'Royal Gold', 'Obsidian Black', 'Wine Red'],
    description: 'Sculpted corseted silhouette adorned with handcrafted glass beading and subtle metallic embroidery. Designed for gala evenings, luxury weddings, and red carpet elegance.',
    material: 'Raw Duchess Satin & Hand-Beaded French Lace',
    inStock: true,
    stockCount: 4,
    featured: true,
    savesCount: 142,
    viewsCount: 1240,
    leadTime: 'Ready to ship or 5 days bespoke tailoring'
  },
  {
    id: 'prod-2',
    name: 'The Sovereign Midnight Senator Suit',
    category: 'Senator Styles',
    price: 125000,
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)', 'Bespoke Fit'],
    colors: ['Midnight Charcoal', 'Deep Navy', 'Ivory Cream', 'Onyx Black'],
    description: 'Impeccably tailored Nigerian Senator ensemble featuring asymmetric geometric chest embroidery, structured mandarin collar, and tapered slim-cut trousers with double welt finish.',
    material: 'Super 160s Italian Cashmere Wool & Silk Blend',
    inStock: true,
    stockCount: 6,
    featured: true,
    savesCount: 198,
    viewsCount: 1680,
    leadTime: '3-4 working days'
  },
  {
    id: 'prod-3',
    name: 'Adunni Luxe Ankara Wrap Two-Piece',
    category: 'Native / Ankara',
    price: 78000,
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ochre & Indigo Print', 'Crimson Sunburst', 'Teal Flora'],
    description: 'A contemporary take on traditional Nigerian wax prints. Features statement voluminous bishop sleeves, adjustable belted peplum top, and wide-leg palazzo trousers.',
    material: '100% Premium Cotton Dutch Hollandais Wax Print',
    inStock: true,
    stockCount: 8,
    featured: true,
    savesCount: 165,
    viewsCount: 1420,
    leadTime: 'Available Ready-to-Wear'
  },
  {
    id: 'prod-4',
    name: 'The Viceroy Agbada & Tunic Ensemble',
    category: 'Occasion Wear',
    price: 240000,
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'Custom Measurement'],
    colors: ['Champagne Gold', 'Jet Black', 'Regal White', 'Navy Blue'],
    description: 'The pinnacle of Nigerian regal attire. Three-piece set comprising an architectural sweeping Agbada with filigree neckline embroidery, matching inner buba tunic, and tailored sokoto pants.',
    material: 'Heavy Weight Swiss Jacquard Brocade & Silk Embroidery',
    inStock: true,
    stockCount: 3,
    featured: true,
    savesCount: 220,
    viewsCount: 2150,
    leadTime: '7-10 days bespoke delivery'
  },
  {
    id: 'prod-5',
    name: 'Zaria Minimalist Unisex Kimono Tunic',
    category: 'Unisex Fashion',
    price: 65000,
    gender: 'Unisex',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Free Size (Fits S-L)', 'Oversized (Fits XL-3XL)'],
    colors: ['Oatmeal Raw Linen', 'Charcoal Sand', 'Forest Olive'],
    description: 'An understated gender-fluid silhouette designed for discerning modern tastes. Features raw edge trims, deep patch pockets, and breezy open-front styling with detachable belt.',
    material: 'Ethically Sourced Organic Linen & Hand-dyed Cotton',
    inStock: true,
    stockCount: 12,
    featured: false,
    savesCount: 112,
    viewsCount: 980,
    leadTime: 'In Stock'
  },
  {
    id: 'prod-6',
    name: 'The Moremi Off-Shoulder Corset Dress',
    category: 'Custom Dresses',
    price: 145000,
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'Custom Fit'],
    colors: ['Sun Gold', 'Burnt Orange', 'Ebony Black'],
    description: 'An ode to modern African royalty. Features an architectural asymmetric neckline, built-in bone corsetry for precision snatch, and high side drape with fluid movement.',
    material: 'Silk Mikado & Micro-Pleated Crepe',
    inStock: true,
    stockCount: 5,
    featured: false,
    savesCount: 178,
    viewsCount: 1310,
    leadTime: '5 days bespoke tailoring'
  },
  {
    id: 'prod-7',
    name: 'Kano Monogram Double-Breasted Blazer',
    category: 'Corporate & Blazers',
    price: 110000,
    gender: 'Men',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['38R', '40R', '42R', '44R', '46L'],
    colors: ['Stone Grey', 'Midnight Navy', 'Camel'],
    description: 'Precision structured double-breasted blazer adorned with hand-stitched peak lapels, horn buttons, and subtle interior Ankara piping celebrating heritage with board-room gravitas.',
    material: 'Fine Worsted Wool & Cupro Lining',
    inStock: true,
    stockCount: 4,
    featured: false,
    savesCount: 89,
    viewsCount: 820,
    leadTime: 'Ready to ship'
  },
  {
    id: 'prod-8',
    name: 'Nala Silk-Lined Ankara Evening Kaftan',
    category: 'Ready-to-Wear',
    price: 68000,
    gender: 'Women',
    images: [
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S/M', 'L/XL', 'Plus'],
    colors: ['Jewel Violet', 'Cobalt Blue', 'Terra Cotta'],
    description: 'Free-flowing luxury kaftan fully lined with cooling mulberry silk. Features hand-embroidered metallic collar accents and dramatic side slits.',
    material: 'Vlisco Superwax & 100% Mulberry Silk Lining',
    inStock: true,
    stockCount: 7,
    featured: false,
    savesCount: 134,
    viewsCount: 1100,
    leadTime: 'In Stock'
  }
];

export const initialLookbook: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'The Lagos Gala Couture Collection',
    category: 'Occasion',
    gender: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    description: 'Architectural mermaid silhouettes infused with hand-beaded lace motifs, captured during twilight in Victoria Island.',
    tags: ['Couture', 'Bridal Reception', 'Gala', 'Emerald'],
    featured: true,
    savesCount: 230
  },
  {
    id: 'look-2',
    title: 'New Millennium Senator & Native',
    category: 'Senator',
    gender: 'Men',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    description: 'Clean-cut lines, geometric filigree embroidery, and tapered trouser drape that redefine contemporary Nigerian power dressing.',
    tags: ['Senator', 'Men Fashion', 'Bespoke', 'Charcoal'],
    featured: true,
    savesCount: 310
  },
  {
    id: 'look-3',
    title: 'Golden Hour Wax & Modernity',
    category: 'Ankara',
    gender: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    description: 'High-contrast African wax prints harmonized into tailored jumpsuits and statement cape dresses for the global Nigerian woman.',
    tags: ['Ankara', 'Editorial', 'Bold Prints', 'Heritage'],
    featured: true,
    savesCount: 285
  },
  {
    id: 'look-4',
    title: 'The Sovereign Agbada Dynasty',
    category: 'Custom Designs',
    gender: 'Men',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    description: 'Grandeur in three pieces: Heavy weight Swiss damask jacquard Agbada paired with bespoke silver-threaded embroidery.',
    tags: ['Agbada', 'Regal', 'Traditional Wedding', 'Gold'],
    featured: true,
    savesCount: 340
  },
  {
    id: 'look-5',
    title: 'Sculptural Minimalist Unisex Wardrobe',
    category: 'Unisex',
    gender: 'Unisex',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    description: 'Fluidity in motion: Pure raw cotton and linen tunics crafted with neutral earth pigments for day-to-night versatility.',
    tags: ['Unisex', 'Linen', 'Contemporary', 'Minimalism'],
    featured: false,
    savesCount: 175
  },
  {
    id: 'look-6',
    title: 'Sunset Velvet & Coral Accents',
    category: 'Occasion',
    gender: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    description: 'Deep jewel-toned velvet with hand-stitched Edo coral-inspired shoulder ornamentation for traditional matrimonial celebrations.',
    tags: ['Velvet', 'Edo Coral', 'Bridal', 'Luxury'],
    featured: false,
    savesCount: 215
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Dr. Folashade Adeleke',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'Celine Studio designed my bridal reception gown in less than two weeks. The bone corsetry and fitting were flawless — I felt like absolute royalty. Their WhatsApp communication was transparent from fabric swatches to final dispatch!',
    productOrService: 'Custom Bridal Reception Gown',
    date: 'February 2026',
    approved: true,
    location: 'Ikoyi, Lagos'
  },
  {
    id: 'test-2',
    customerName: 'Chief Emeka Okonkwo',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'I ordered three Senator suits for an international conference in London. The stitching precision, lapel detailing, and Italian wool quality surpassed tailors I’ve used in Savile Row. Celine Studio has my loyalty.',
    productOrService: 'Bespoke Senator Ensembles',
    date: 'January 2026',
    approved: true,
    location: 'Victoria Island & Abuja'
  },
  {
    id: 'test-3',
    customerName: 'Amina Bello-Danladi',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'From the initial measurement consultation at their Iyana-Isashi studio to delivery, the warmth and professionalism were unmatched. The Ankara two-piece had heads turning all evening!',
    productOrService: 'Custom Ankara Two-Piece',
    date: 'December 2025',
    approved: true,
    location: 'Lekki Phase 1, Lagos'
  },
  {
    id: 'test-4',
    customerName: 'Tunde & Simi Balogun',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'They handled our entire traditional wedding couple outfits (Agbada and matching Corset George wrapper). The harmony of colors and hand embroidery gave our pictures an editorial Vogue feel.',
    productOrService: 'Traditional Wedding Couple Attire',
    date: 'November 2025',
    approved: true,
    location: 'Ikeja, Lagos'
  }
];

export const initialCustomRequests: CustomRequest[] = [
  {
    id: 'req-101',
    customerName: 'Temitope Alabi',
    whatsappNumber: '08034567890',
    email: 'temi.alabi@example.com',
    gender: 'Women',
    outfitType: 'Gown / Dress',
    occasion: 'Sister\'s Luxury Wedding (Aso Ebi)',
    preferredColor: 'Champagne & Rose Gold',
    preferredFabric: 'Duchess Satin & Beaded Mesh',
    preferredStyle: 'Off-shoulder corseted mermaid with subtle train',
    eventDate: '2026-10-18',
    budgetRange: '₦150,000 - ₦250,000',
    notes: 'Needs to be ready for first fitting 10 days before the wedding. Sent reference photos with intricate neckline beadwork.',
    inspirationImages: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'Consultation Scheduled',
    createdAt: '2026-09-02T10:30:00Z'
  },
  {
    id: 'req-102',
    customerName: 'Oluwaseun Davies',
    whatsappNumber: '08129876543',
    email: 'seun.davies@example.com',
    gender: 'Men',
    outfitType: 'Senator',
    occasion: '40th Birthday Celebration',
    preferredColor: 'Monochrome Midnight Charcoal',
    preferredFabric: 'Super 150s Wool Blend',
    preferredStyle: 'Geometric thread embroidery with concealed buttons and cuff detail',
    eventDate: '2026-09-28',
    budgetRange: '₦100,000 - ₦180,000',
    notes: 'Prefers modern slim cut trousers and wants to match with his son if possible.',
    inspirationImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'New',
    createdAt: '2026-09-06T14:15:00Z'
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'book-201',
    customerName: 'Yetunde Williams',
    whatsappNumber: '09081234567',
    email: 'yetunde.williams@example.com',
    appointmentType: 'Measurement Appointment',
    preferredDate: '2026-09-12',
    preferredTime: '11:00 AM',
    notes: 'First time visiting the Iyana-Isashi studio. Looking to get measurements taken for 2 custom evening gowns.',
    status: 'Confirmed',
    createdAt: '2026-09-04T09:00:00Z'
  },
  {
    id: 'book-202',
    customerName: 'Babatunde Fashina',
    whatsappNumber: '08023456789',
    email: 'babatunde.f@example.com',
    appointmentType: 'Fitting',
    preferredDate: '2026-09-14',
    preferredTime: '3:00 PM',
    notes: 'Second fitting for the Sovereign Agbada ensemble before final pressing.',
    status: 'Confirmed',
    createdAt: '2026-09-05T16:20:00Z'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Custom Design Request',
    message: 'Oluwaseun Davies requested a bespoke Senator outfit for 40th Birthday.',
    type: 'custom_request',
    createdAt: '10 minutes ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New Measurement Appointment',
    message: 'Yetunde Williams booked a studio fitting for Saturday at 11:00 AM.',
    type: 'booking',
    createdAt: '2 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Design Trend Alert',
    message: 'The Royal Emerald Mermaid Gown was saved 14 times today.',
    type: 'alert',
    createdAt: '1 day ago',
    read: true
  }
];
