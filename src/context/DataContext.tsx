import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  LookbookItem,
  CustomRequest,
  Booking,
  Testimonial,
  SavedItem,
  SiteSettings,
  NotificationItem,
  AnalyticsEvent,
  CustomRequestStatus,
  BookingStatus
} from '../types';
import {
  initialProducts,
  initialLookbook,
  initialCustomRequests,
  initialBookings,
  initialTestimonials,
  initialSiteSettings,
  initialNotifications
} from '../data/initialData';

interface DataContextType {
  products: Product[];
  lookbook: LookbookItem[];
  customRequests: CustomRequest[];
  bookings: Booking[];
  testimonials: Testimonial[];
  savedItems: SavedItem[];
  siteSettings: SiteSettings;
  notifications: NotificationItem[];
  analyticsEvents: AnalyticsEvent[];
  unreadNotifsCount: number;

  // Actions
  toggleSaveDesign: (item: {
    id: string;
    type: 'product' | 'lookbook' | 'custom_inspiration';
    name: string;
    category: string;
    price?: number;
    imageUrl: string;
  }) => boolean;
  isDesignSaved: (id: string) => boolean;

  createCustomRequest: (request: Omit<CustomRequest, 'id' | 'createdAt' | 'status'>) => Promise<CustomRequest>;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<Booking>;
  submitTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date' | 'approved'>) => Promise<Testimonial>;
  recordAnalyticsEvent: (type: AnalyticsEvent['type'], targetId?: string, targetName?: string, metadata?: Record<string, any>) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'savesCount' | 'viewsCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateCustomRequestStatus: (id: string, status: CustomRequestStatus) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  toggleTestimonialApproval: (id: string) => void;
  deleteTestimonial: (id: string) => void;
  addLookbookItem: (item: Omit<LookbookItem, 'id' | 'savesCount'>) => void;
  deleteLookbookItem: (id: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetToDemoData: () => void;

  // WhatsApp Link Utilities
  buildWhatsAppUrl: (message: string) => string;
  getProductWhatsAppMessage: (product: Product, size?: string, color?: string) => string;
  getCustomRequestWhatsAppMessage: (req: CustomRequest) => string;
  getBookingWhatsAppMessage: (b: Booking) => string;
  getGeneralWhatsAppMessage: (topic?: string) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'celine_studio_products',
  LOOKBOOK: 'celine_studio_lookbook',
  CUSTOM_REQUESTS: 'celine_studio_custom_requests',
  BOOKINGS: 'celine_studio_bookings',
  TESTIMONIALS: 'celine_studio_testimonials',
  SAVED_ITEMS: 'celine_studio_saved_items',
  SETTINGS: 'celine_studio_settings',
  NOTIFICATIONS: 'celine_studio_notifications',
  ANALYTICS: 'celine_studio_analytics'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [lookbook, setLookbook] = useState<LookbookItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOOKBOOK);
      return saved ? JSON.parse(saved) : initialLookbook;
    } catch {
      return initialLookbook;
    }
  });

  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      return saved ? JSON.parse(saved) : initialCustomRequests;
    } catch {
      return initialCustomRequests;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : initialBookings;
    } catch {
      return initialBookings;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : initialTestimonials;
    } catch {
      return initialTestimonials;
    }
  });

  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOOKBOOK, JSON.stringify(lookbook));
  }, [lookbook]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_ITEMS, JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analyticsEvents));
  }, [analyticsEvents]);

  // Analytics Tracker
  const recordAnalyticsEvent = useCallback((
    type: AnalyticsEvent['type'],
    targetId?: string,
    targetName?: string,
    metadata?: Record<string, any>
  ) => {
    const newEvent: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type,
      targetId,
      targetName,
      timestamp: new Date().toISOString(),
      metadata
    };
    setAnalyticsEvents(prev => [newEvent, ...prev].slice(0, 500)); // cap at 500
  }, []);

  // WhatsApp link generation
  const buildWhatsAppUrl = useCallback((message: string): string => {
    const cleanNumber = siteSettings.whatsappNumber.replace(/\D/g, '');
    const intlNumber = cleanNumber.startsWith('234')
      ? cleanNumber
      : cleanNumber.startsWith('0')
      ? '234' + cleanNumber.slice(1)
      : '234' + cleanNumber;
    return `https://wa.me/${intlNumber}?text=${encodeURIComponent(message)}`;
  }, [siteSettings.whatsappNumber]);

  const getProductWhatsAppMessage = useCallback((product: Product, size?: string, color?: string): string => {
    let msg = `Hello Celine Studio, I'm interested in ordering: ${product.name} (₦${product.price.toLocaleString()})`;
    if (size) msg += `\n- Size: ${size}`;
    if (color) msg += `\n- Color: ${color}`;
    msg += `\nPlease let me know about fabric availability and dispatch details.`;
    return msg;
  }, []);

  const getCustomRequestWhatsAppMessage = useCallback((req: CustomRequest): string => {
    return (
      `Hello Celine Studio, I would like to submit a Custom Design Request [Ref: #${req.id}]:\n` +
      `• Name: ${req.customerName}\n` +
      `• Outfit Type: ${req.outfitType} (${req.gender})\n` +
      `• Occasion: ${req.occasion}\n` +
      `• Preferred Color: ${req.preferredColor || 'Open to suggestion'}\n` +
      `• Preferred Fabric: ${req.preferredFabric || 'To discuss'}\n` +
      `• Target Event Date: ${req.eventDate || 'Flexible'}\n` +
      `• Budget Range: ${req.budgetRange}\n` +
      `• Notes: ${req.notes || 'Looking forward to bringing this vision to life.'}`
    );
  }, []);

  const getBookingWhatsAppMessage = useCallback((b: Booking): string => {
    return (
      `Hello Celine Studio, I'd like to book an appointment [Ref: #${b.id}]:\n` +
      `• Name: ${b.customerName}\n` +
      `• Service: ${b.appointmentType}\n` +
      `• Date: ${b.preferredDate}\n` +
      `• Time: ${b.preferredTime}\n` +
      `• Studio Location: ${siteSettings.address}\n` +
      (b.notes ? `• Notes: ${b.notes}\n` : '') +
      `Please confirm slot availability.`
    );
  }, [siteSettings.address]);

  const getGeneralWhatsAppMessage = useCallback((topic?: string): string => {
    if (topic) return `Hello Celine Studio, I'd like to make an enquiry regarding ${topic}.`;
    return `Hello Celine Studio, I'd like to make an enquiry about your bespoke & ready-to-wear collections.`;
  }, []);

  // Saved Designs (Wishlist)
  const isDesignSaved = useCallback((id: string): boolean => {
    return savedItems.some(item => item.itemId === id);
  }, [savedItems]);

  const toggleSaveDesign = useCallback((item: {
    id: string;
    type: 'product' | 'lookbook' | 'custom_inspiration';
    name: string;
    category: string;
    price?: number;
    imageUrl: string;
  }): boolean => {
    const existingIndex = savedItems.findIndex(s => s.itemId === item.id);
    if (existingIndex >= 0) {
      // Remove
      setSavedItems(prev => prev.filter(s => s.itemId !== item.id));
      // Decrement product save count if product
      if (item.type === 'product') {
        setProducts(prev => prev.map(p => p.id === item.id ? { ...p, savesCount: Math.max(0, p.savesCount - 1) } : p));
      }
      return false;
    } else {
      // Add
      const newSaved: SavedItem = {
        id: `saved-${Date.now()}`,
        itemId: item.id,
        itemType: item.type,
        name: item.name,
        category: item.category,
        price: item.price,
        imageUrl: item.imageUrl,
        savedAt: new Date().toISOString()
      };
      setSavedItems(prev => [newSaved, ...prev]);
      if (item.type === 'product') {
        setProducts(prev => prev.map(p => p.id === item.id ? { ...p, savesCount: p.savesCount + 1 } : p));
      }
      recordAnalyticsEvent('save_design', item.id, item.name);
      return true;
    }
  }, [savedItems, recordAnalyticsEvent]);

  // Create Custom Request
  const createCustomRequest = useCallback(async (
    requestData: Omit<CustomRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<CustomRequest> => {
    const newId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest: CustomRequest = {
      ...requestData,
      id: newId,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    setCustomRequests(prev => [newRequest, ...prev]);

    // Add admin notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Custom Design Request',
      message: `${requestData.customerName} requested a custom ${requestData.outfitType} for ${requestData.occasion}.`,
      type: 'custom_request',
      createdAt: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    recordAnalyticsEvent('custom_request_submitted', newId, requestData.outfitType, {
      customer: requestData.customerName,
      occasion: requestData.occasion
    });

    return newRequest;
  }, [recordAnalyticsEvent]);

  // Create Booking
  const createBooking = useCallback(async (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>
  ): Promise<Booking> => {
    const newId = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Studio Booking',
      message: `${bookingData.customerName} booked a ${bookingData.appointmentType} on ${bookingData.preferredDate}.`,
      type: 'booking',
      createdAt: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    recordAnalyticsEvent('booking_submitted', newId, bookingData.appointmentType, {
      customer: bookingData.customerName,
      date: bookingData.preferredDate
    });

    return newBooking;
  }, [recordAnalyticsEvent]);

  // Submit Testimonial
  const submitTestimonial = useCallback(async (
    data: Omit<Testimonial, 'id' | 'date' | 'approved'>
  ): Promise<Testimonial> => {
    const newTestimonial: Testimonial = {
      ...data,
      id: `test-${Date.now()}`,
      date: 'Just now',
      approved: false // requires admin approval
    };

    setTestimonials(prev => [newTestimonial, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Testimonial Submitted',
      message: `${data.customerName} submitted a ${data.rating}-star review for approval.`,
      type: 'testimonial',
      createdAt: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newTestimonial;
  }, []);

  // Admin CRUD Actions
  const addProduct = useCallback((productData: Omit<Product, 'id' | 'savesCount' | 'viewsCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      savesCount: 0,
      viewsCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateCustomRequestStatus = useCallback((id: string, status: CustomRequestStatus) => {
    setCustomRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const updateBookingStatus = useCallback((id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  }, []);

  const toggleTestimonialApproval = useCallback((id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !t.approved } : t));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }, []);

  const addLookbookItem = useCallback((itemData: Omit<LookbookItem, 'id' | 'savesCount'>) => {
    const newItem: LookbookItem = {
      ...itemData,
      id: `look-${Date.now()}`,
      savesCount: 0
    };
    setLookbook(prev => [newItem, ...prev]);
  }, []);

  const deleteLookbookItem = useCallback((id: string) => {
    setLookbook(prev => prev.filter(l => l.id !== id));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const resetToDemoData = useCallback(() => {
    setProducts(initialProducts);
    setLookbook(initialLookbook);
    setCustomRequests(initialCustomRequests);
    setBookings(initialBookings);
    setTestimonials(initialTestimonials);
    setSiteSettings(initialSiteSettings);
    setNotifications(initialNotifications);
  }, []);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <DataContext.Provider
      value={{
        products,
        lookbook,
        customRequests,
        bookings,
        testimonials,
        savedItems,
        siteSettings,
        notifications,
        analyticsEvents,
        unreadNotifsCount,

        toggleSaveDesign,
        isDesignSaved,
        createCustomRequest,
        createBooking,
        submitTestimonial,
        recordAnalyticsEvent,

        addProduct,
        updateProduct,
        deleteProduct,
        updateCustomRequestStatus,
        updateBookingStatus,
        toggleTestimonialApproval,
        deleteTestimonial,
        addLookbookItem,
        deleteLookbookItem,
        updateSettings,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDemoData,

        buildWhatsAppUrl,
        getProductWhatsAppMessage,
        getCustomRequestWhatsAppMessage,
        getBookingWhatsAppMessage,
        getGeneralWhatsAppMessage
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
