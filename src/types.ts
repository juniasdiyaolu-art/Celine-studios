export type ProductCategory =
  | 'Custom Dresses'
  | 'Native / Ankara'
  | 'Senator Styles'
  | 'Occasion Wear'
  | 'Unisex Fashion'
  | 'Two-Piece & Sets'
  | 'Corporate & Blazers'
  | 'Ready-to-Wear';

export type OutfitGender = 'Men' | 'Women' | 'Unisex';

export type CustomRequestStatus =
  | 'New'
  | 'Contacted'
  | 'Consultation Scheduled'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Rescheduled'
  | 'Completed'
  | 'Cancelled';

export type BookingType =
  | 'Fashion Consultation'
  | 'Measurement Appointment'
  | 'Fitting'
  | 'Custom Design Consultation'
  | 'Studio Visit'
  | 'Other Appointment';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in Naira (NGN)
  gender: OutfitGender;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  material: string;
  fabric?: string;
  inStock: boolean;
  stockCount: number;
  featured: boolean;
  savesCount: number;
  viewsCount: number;
  leadTime?: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  gender: OutfitGender;
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  savesCount: number;
}

export interface CustomRequest {
  id: string;
  customerName: string;
  whatsappNumber: string;
  customerPhone?: string;
  email?: string;
  gender: OutfitGender;
  outfitType: string;
  occasion: string;
  preferredColor: string;
  preferredFabric: string;
  preferredStyle: string;
  eventDate: string;
  budgetRange: string;
  notes: string;
  additionalNotes?: string;
  inspirationImages: string[];
  measurementPreference?: 'studio_visit' | 'provide_now' | 'whatsapp_guide' | 'standard_size';
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    shoulder?: number;
    sleeve?: number;
    length?: number;
    [key: string]: number | undefined;
  };
  status: CustomRequestStatus;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerName: string;
  whatsappNumber: string;
  customerPhone?: string;
  email?: string;
  appointmentType: BookingType;
  service?: string;
  preferredDate: string;
  preferredTime: string;
  locationType?: 'studio' | 'virtual';
  notes?: string;
  inspirationImage?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  profileImage: string;
  rating: number; // 1 to 5
  review: string;
  productOrService: string;
  date: string;
  approved: boolean;
  location?: string;
}

export interface SavedItem {
  id: string;
  itemId: string;
  itemType: 'product' | 'lookbook' | 'custom_inspiration';
  name: string;
  category: string;
  price?: number;
  imageUrl: string;
  savedAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  whatsappNumber: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Replied' | 'Archived';
}

export interface AnalyticsEvent {
  id: string;
  type:
    | 'page_view'
    | 'product_view'
    | 'lookbook_view'
    | 'whatsapp_click'
    | 'custom_request_submitted'
    | 'booking_submitted'
    | 'save_design'
    | 'ai_chat_message'
    | 'enquiry_submitted';
  targetId?: string;
  targetName?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  supportingPhrase: string;
  phone: string;
  whatsappNumber: string; // e.g. "09124465224"
  whatsappInternational: string; // e.g. "+234 912 446 5224"
  whatsappLink: string; // "https://wa.me/2349124465224"
  address: string;
  city: string;
  country: string;
  openingHoursWeekday: string;
  openingHoursSaturday: string;
  openingHoursSunday: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  instagramHandle: string;
  instagramUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'custom_request' | 'booking' | 'enquiry' | 'testimonial' | 'alert';
  createdAt: string;
  read: boolean;
}
