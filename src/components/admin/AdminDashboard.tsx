import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Calendar,
  ShoppingBag,
  Image,
  Star,
  Users,
  Settings,
  Lock,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  MessageCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Eye,
  X,
  TrendingUp,
  AlertCircle,
  Heart,
  BarChart2,
  Phone,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  LogOut,
  ArrowUpRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CustomRequest, Booking, Product, LookbookItem, Testimonial } from '../../types';
import { AdminLogin } from './AdminLogin';
import {
  checkIsAdminAuthenticated,
  terminateAdminSession,
  updateAdminPassword,
  getStoredAdminCredentials
} from '../../utils/adminAuth';

interface AdminDashboardProps {
  onNavigateHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const {
    customRequests,
    updateCustomRequestStatus,
    deleteCustomRequest,
    bookings,
    updateBookingStatus,
    deleteBooking,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    lookbook,
    addLookbookItem,
    deleteLookbookItem,
    testimonials,
    toggleTestimonialApproval,
    deleteTestimonial,
    siteSettings,
    updateSettings,
    analyticsEvents,
    savedItems,
    buildWhatsAppUrl
  } = useData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkIsAdminAuthenticated());

  // Active Admin Tab — All 10 required modules
  const [activeTab, setActiveTab] = useState<
    'overview' | 'requests' | 'bookings' | 'products' | 'lookbook' | 'testimonials' | 'crm' | 'saved' | 'analytics' | 'settings'
  >('overview');

  // Filter States
  const [requestFilter, setRequestFilter] = useState<string>('all');
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<Product['category']>('Senator Styles');
  const [prodPrice, setProdPrice] = useState('50000');
  const [prodGender, setProdGender] = useState<'Men' | 'Women' | 'Unisex'>('Men');
  const [prodImages, setProdImages] = useState('');
  const [prodSizes, setProdSizes] = useState('S, M, L, XL, XXL, Custom');
  const [prodColors, setProdColors] = useState('Black, Navy, Emerald, Burgundy');
  const [prodFabric, setProdFabric] = useState('Super 150s Wool & Cashmere blend');
  const [prodLeadTime, setProdLeadTime] = useState('5-7 working days');
  const [prodDescription, setProdDescription] = useState('');
  const [prodFeatured, setProdFeatured] = useState(false);

  // Lookbook Modal State
  const [isLookbookModalOpen, setIsLookbookModalOpen] = useState(false);
  const [lookTitle, setLookTitle] = useState('');
  const [lookCategory, setLookCategory] = useState('Senator Styles');
  const [lookImage, setLookImage] = useState('');
  const [lookDesc, setLookDesc] = useState('');
  const [lookTags, setLookTags] = useState('bespoke, luxury, wedding');

  // Password Change State in Settings
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sign out handler
  const handleSignOut = () => {
    terminateAdminSession();
    setIsAuthenticated(false);
  };

  // WhatsApp helper to message customer from admin
  const handleChatCustomer = (phone: string, name: string, contextId: string) => {
    const message = `Hello ${name}, this is Celine Studio atelier regarding your request [Ref: ${contextId}]. How may we assist with your fitting and order details?`;
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const finalPhone = cleanPhone.startsWith('0') ? `234${cleanPhone.slice(1)}` : cleanPhone;
    window.open(`https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // Save Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
      name: prodName.trim(),
      category: prodCategory,
      price: Number(prodPrice) || 50000,
      gender: prodGender,
      images: prodImages.split(',').map(s => s.trim()).filter(Boolean),
      sizes: prodSizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: prodColors.split(',').map(s => s.trim()).filter(Boolean),
      material: prodFabric.trim() || 'Luxury African Fabric',
      fabric: prodFabric.trim() || 'Luxury African Fabric',
      leadTime: prodLeadTime.trim(),
      description: prodDescription.trim(),
      inStock: true,
      stockCount: 10,
      featured: prodFeatured
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productPayload
      });
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Save Lookbook
  const handleSaveLookbook = async (e: React.FormEvent) => {
    e.preventDefault();
    await addLookbookItem({
      title: lookTitle.trim(),
      category: lookCategory,
      imageUrl: lookImage.trim(),
      description: lookDesc.trim(),
      tags: lookTags.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsLookbookModalOpen(false);
    setLookTitle('');
    setLookDesc('');
  };

  // Handle password update in Settings
  const handleUpdatePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus(null);

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeStatus({
        type: 'error',
        text: 'New password and confirmation do not match.'
      });
      return;
    }

    const res = updateAdminPassword(currentPasswordInput, newPasswordInput);
    if (res.success) {
      setPasswordChangeStatus({ type: 'success', text: res.message });
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
    } else {
      setPasswordChangeStatus({ type: 'error', text: res.message });
    }
  };

  // UN-AUTHENTICATED: Render clean, secure login screen
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={() => setIsAuthenticated(true)}
        onBackToSite={onNavigateHome}
      />
    );
  }

  // AGGREGATED CLIENT CRM LIST
  const crmClients: { [phone: string]: { name: string; phone: string; email?: string; requests: number; bookings: number; lastDate: string } } = {};
  customRequests.forEach(r => {
    const phone = r.whatsappNumber || r.customerPhone || 'Unknown';
    if (!crmClients[phone]) {
      crmClients[phone] = {
        name: r.customerName,
        phone,
        email: r.email,
        requests: 0,
        bookings: 0,
        lastDate: r.createdAt
      };
    }
    crmClients[phone].requests += 1;
  });
  bookings.forEach(b => {
    const phone = b.whatsappNumber || b.customerPhone || 'Unknown';
    if (!crmClients[phone]) {
      crmClients[phone] = {
        name: b.customerName,
        phone,
        email: b.email,
        requests: 0,
        bookings: 0,
        lastDate: b.createdAt
      };
    }
    crmClients[phone].bookings += 1;
  });

  const adminAccount = getStoredAdminCredentials();

  // Navigation tab definitions
  const adminTabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
    { id: 'requests', label: `Orders/Enquiries (${customRequests.length})`, icon: Sparkles },
    { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
    { id: 'crm', label: `Customers (${Object.keys(crmClients).length})`, icon: Users },
    { id: 'saved', label: `Saved Designs (${savedItems.length})`, icon: Heart },
    { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: Star },
    { id: 'lookbook', label: `Lookbook (${lookbook.length})`, icon: Image },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ] as const;

  return (
    <div className="py-6 sm:py-8 bg-[#09090c] min-h-screen text-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#202028] gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-serif text-2xl sm:text-3xl text-[#f5f3ef] font-medium tracking-tight truncate">
                Celine Studio Management Platform
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold tracking-wider uppercase shrink-0">
                Atelier Live
              </span>
            </div>
            <p className="text-xs text-[#8e8c85] mt-1 break-words">
              Logged in as <strong className="text-[#dedcd5]">{adminAccount.email}</strong> ({adminAccount.role}) • Studio: {siteSettings.address}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={buildWhatsAppUrl("Hello Celine Studio Admin Test")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">WhatsApp Active</span>
            </a>

            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="px-3.5 py-2 rounded-full border border-[#262632] text-xs text-[#b8b6ae] hover:text-white hover:bg-[#181822] transition-colors"
              >
                View Live Site
              </button>
            )}

            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-full bg-[#181822] border border-[#2c2c3c] text-xs text-red-300 hover:bg-red-950/40 hover:border-red-700/50 flex items-center gap-1.5 transition-colors"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar — Fully responsive with horizontal scroll */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none border-b border-[#1c1c24]">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {adminTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-[#c5a880] text-[#0c0c0e] shadow-md'
                      : 'bg-[#121217] text-[#8e8c85] hover:text-[#dedcd5] hover:bg-[#171720] border border-[#22222a]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: OVERVIEW / DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <div className="flex items-center justify-between text-[#c5a880] mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold">Custom Requests</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <p className="font-serif text-3xl text-[#f5f3ef] font-semibold">{customRequests.length}</p>
                <p className="text-[11px] text-[#8e8c85] mt-1">
                  {customRequests.filter(r => r.status === 'New').length} new uncontacted
                </p>
              </div>

              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <div className="flex items-center justify-between text-[#c5a880] mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold">Appointments</span>
                  <Calendar className="w-4 h-4" />
                </div>
                <p className="font-serif text-3xl text-[#f5f3ef] font-semibold">{bookings.length}</p>
                <p className="text-[11px] text-[#8e8c85] mt-1">
                  {bookings.filter(b => b.status === 'Pending').length} pending confirmation
                </p>
              </div>

              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <div className="flex items-center justify-between text-[#c5a880] mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold">Catalog Items</span>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <p className="font-serif text-3xl text-[#f5f3ef] font-semibold">{products.length}</p>
                <p className="text-[11px] text-[#8e8c85] mt-1">Ready-to-wear designs</p>
              </div>

              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <div className="flex items-center justify-between text-[#c5a880] mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold">Client CRM</span>
                  <Users className="w-4 h-4" />
                </div>
                <p className="font-serif text-3xl text-[#f5f3ef] font-semibold">{Object.keys(crmClients).length}</p>
                <p className="text-[11px] text-[#8e8c85] mt-1">Total patron profiles</p>
              </div>
            </div>

            {/* Quick Actions & Recent Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Custom Inquiries */}
              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-[#f5f3ef] font-medium">Recent Custom Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs text-[#c5a880] hover:underline"
                  >
                    View All ({customRequests.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {customRequests.slice(0, 4).map(req => (
                    <div
                      key={req.id}
                      className="p-3.5 rounded-xl bg-[#0e0e12] border border-[#1e1e26] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#c5a880]">{req.id}</span>
                          <span className="text-xs font-semibold text-[#f5f3ef] truncate">{req.customerName}</span>
                        </div>
                        <p className="text-[11px] text-[#8e8c85] mt-0.5 truncate">
                          {req.outfitType} • {req.gender} • {req.occasion}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                          req.status === 'New' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {req.status}
                        </span>
                        <button
                          onClick={() => handleChatCustomer(req.whatsappNumber || req.customerPhone || '', req.customerName, req.id)}
                          className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {customRequests.length === 0 && (
                    <p className="text-xs text-[#716f69] py-4 text-center">No custom inquiries submitted yet.</p>
                  )}
                </div>
              </div>

              {/* Upcoming Atelier Appointments */}
              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-[#f5f3ef] font-medium">Fittings & Consultations</h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#c5a880] hover:underline"
                  >
                    View All ({bookings.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map(b => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-[#0e0e12] border border-[#1e1e26] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#c5a880]">{b.id}</span>
                          <span className="text-xs font-semibold text-[#f5f3ef] truncate">{b.customerName}</span>
                        </div>
                        <p className="text-[11px] text-[#8e8c85] mt-0.5 truncate">
                          {b.preferredDate} at {b.preferredTime} ({b.locationType === 'studio' ? 'Atelier' : 'Virtual'})
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                          b.status === 'Confirmed' ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {b.status}
                        </span>
                        <button
                          onClick={() => handleChatCustomer(b.whatsappNumber || b.customerPhone || '', b.customerName, b.id)}
                          className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && (
                    <p className="text-xs text-[#716f69] py-4 text-center">No studio bookings scheduled yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS (CATALOG MANAGEMENT) */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#f5f3ef]">Ready-to-Wear Catalog</h2>
                <p className="text-xs text-[#8e8c85]">Manage prices, stock availability, photos, and featured highlights.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={productCategoryFilter}
                  onChange={e => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#14141a] border border-[#252530] text-xs text-[#f5f3ef]"
                >
                  <option value="all">All Categories</option>
                  <option value="Senator Styles">Senator Styles</option>
                  <option value="Custom Dresses">Custom Dresses</option>
                  <option value="Native / Ankara">Native / Ankara</option>
                  <option value="Occasion Wear">Occasion Wear</option>
                  <option value="Unisex Fashion">Unisex Fashion</option>
                </select>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProdName('');
                    setProdDescription('');
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#d6be9a] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products
                .filter(p => productCategoryFilter === 'all' || p.category === productCategoryFilter)
                .map(p => (
                  <div key={p.id} className="bg-[#121217] border border-[#242430] rounded-2xl overflow-hidden p-4 flex flex-col justify-between hover:border-[#c5a880]/40 transition-colors">
                    <div>
                      <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900 mb-3 relative">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        {p.featured && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#c5a880] text-[#0c0c0e] text-[9px] font-bold uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] uppercase text-[#c5a880] font-semibold">{p.category}</span>
                      <h4 className="font-serif text-base text-[#f5f3ef] font-medium truncate mt-0.5">{p.name}</h4>
                      <p className="text-sm font-bold text-[#c5a880] mt-1">₦{p.price.toLocaleString()}</p>
                      <p className="text-[11px] text-[#8e8c85] mt-1 line-clamp-2">{p.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1e1e28] flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setProdName(p.name);
                          setProdCategory(p.category);
                          setProdPrice(p.price.toString());
                          setProdGender(p.gender);
                          setProdImages(p.images.join(', '));
                          setProdSizes(p.sizes.join(', '));
                          setProdColors(p.colors.join(', '));
                          setProdFabric(p.fabric || '');
                          setProdLeadTime(p.leadTime || '');
                          setProdDescription(p.description);
                          setProdFeatured(p.featured);
                          setIsProductModalOpen(true);
                        }}
                        className="text-xs text-[#c5a880] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-xs text-[#8e8c85] hover:text-red-400 p-1"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM REQUESTS (ORDERS & ENQUIRIES) */}
        {activeTab === 'requests' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#f5f3ef]">Custom Bespoke Requests</h2>
                <p className="text-xs text-[#8e8c85]">
                  Track client measurement specifications, fabric preferences, and tailoring milestones.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8e8c85]">Filter:</span>
                <select
                  value={requestFilter}
                  onChange={e => setRequestFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#14141a] border border-[#252530] text-xs text-[#f5f3ef]"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Consultation Scheduled">Consultation Scheduled</option>
                  <option value="Pattern Made">Pattern Made</option>
                  <option value="Cutting & Tailoring">Cutting & Tailoring</option>
                  <option value="Ready for Fitting">Ready for Fitting</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {customRequests
                .filter(r => requestFilter === 'all' || r.status === requestFilter)
                .map(req => (
                  <div
                    key={req.id}
                    className="bg-[#121217] border border-[#242430] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#c5a880]/40 transition-colors"
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#c5a880]">{req.id}</span>
                        <h4 className="font-serif text-lg text-[#f5f3ef] font-medium break-words">{req.customerName}</h4>
                        <span className="text-xs text-[#8e8c85]">({req.whatsappNumber || req.customerPhone})</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#b8b6ae]">
                        <div><strong className="text-[#8e8c85]">Outfit:</strong> {req.outfitType} ({req.gender})</div>
                        <div><strong className="text-[#8e8c85]">Occasion:</strong> {req.occasion}</div>
                        <div><strong className="text-[#8e8c85]">Fabric:</strong> {req.preferredFabric}</div>
                        <div><strong className="text-[#8e8c85]">Budget:</strong> {req.budgetRange}</div>
                      </div>

                      {(req.notes || req.additionalNotes) && (
                        <p className="text-xs text-[#9e9c94] italic bg-[#0e0e12] p-2.5 rounded-lg break-words">
                          "{req.notes || req.additionalNotes}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <select
                        value={req.status}
                        onChange={e => updateCustomRequestStatus(req.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg bg-[#0e0e12] border border-[#252530] text-xs font-semibold text-[#f5f3ef]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Consultation Scheduled">Consultation Scheduled</option>
                        <option value="Pattern Made">Pattern Made</option>
                        <option value="Cutting & Tailoring">Cutting & Tailoring</option>
                        <option value="Ready for Fitting">Ready for Fitting</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <button
                        onClick={() => handleChatCustomer(req.whatsappNumber || req.customerPhone || '', req.customerName, req.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#20bd5a] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Chat Client</span>
                      </button>

                      <button
                        onClick={() => deleteCustomRequest(req.id)}
                        className="p-1.5 rounded-lg text-[#716f69] hover:text-red-400 hover:bg-[#1f1f28]"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

              {customRequests.length === 0 && (
                <div className="text-center py-12 bg-[#121217] rounded-2xl border border-[#242430]">
                  <p className="text-sm text-[#8e8c85]">No bespoke requests found for this filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#f5f3ef]">Fitting & Consultation Bookings</h2>
                <p className="text-xs text-[#8e8c85]">Private atelier appointments at Iyana-Isashi and virtual fittings.</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8e8c85]">Filter:</span>
                <select
                  value={bookingFilter}
                  onChange={e => setBookingFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#14141a] border border-[#252530] text-xs text-[#f5f3ef]"
                >
                  <option value="all">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {bookings
                .filter(b => bookingFilter === 'all' || b.status === bookingFilter)
                .map(b => (
                  <div
                    key={b.id}
                    className="bg-[#121217] border border-[#242430] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#c5a880]">{b.id}</span>
                        <h4 className="font-serif text-lg text-[#f5f3ef] break-words">{b.customerName}</h4>
                        <span className="text-xs text-[#8e8c85]">({b.whatsappNumber || b.customerPhone})</span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-[#b8b6ae]">
                        <div><strong className="text-[#8e8c85]">Service:</strong> {b.appointmentType || b.service}</div>
                        <div><strong className="text-[#8e8c85]">Date & Time:</strong> {b.preferredDate} at {b.preferredTime}</div>
                        <div><strong className="text-[#8e8c85]">Location:</strong> {b.locationType === 'studio' ? 'Iyana-Isashi Atelier' : 'Virtual Video'}</div>
                      </div>

                      {b.notes && (
                        <p className="text-xs text-[#9f9d96] italic mt-1 break-words">"{b.notes}"</p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <select
                        value={b.status}
                        onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg bg-[#0e0e12] border border-[#252530] text-xs font-semibold text-[#f5f3ef]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleChatCustomer(b.whatsappNumber || b.customerPhone || '', b.customerName, b.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#20bd5a] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="p-1.5 text-[#716f69] hover:text-red-400"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

              {bookings.length === 0 && (
                <div className="text-center py-12 bg-[#121217] rounded-2xl border border-[#242430]">
                  <p className="text-sm text-[#8e8c85]">No bookings found for this filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT CRM */}
        {activeTab === 'crm' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl text-[#f5f3ef]">Client Relationships (CRM)</h2>
              <p className="text-xs text-[#8e8c85]">Unified contact records of all leads, brides, grooms, and bespoke patrons.</p>
            </div>

            {/* Fully responsive table container */}
            <div className="bg-[#121217] border border-[#242430] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[580px] text-left text-xs text-[#b8b6ae]">
                  <thead className="bg-[#161620] text-[#8e8c85] uppercase tracking-wider font-semibold border-b border-[#242430]">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Phone / WhatsApp</th>
                      <th className="p-4">Orders</th>
                      <th className="p-4">Bookings</th>
                      <th className="p-4 text-right">Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e28]">
                    {Object.values(crmClients).map((c, i) => (
                      <tr key={i} className="hover:bg-[#15151e] transition-colors">
                        <td className="p-4 font-semibold text-[#f5f3ef]">{c.name}</td>
                        <td className="p-4 font-mono">{c.phone}</td>
                        <td className="p-4">{c.requests} custom orders</td>
                        <td className="p-4">{c.bookings} appointments</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleChatCustomer(c.phone, c.name, 'CRM-DIRECT')}
                            className="px-3 py-1.5 rounded-full bg-[#25D366] text-white font-semibold inline-flex items-center gap-1 hover:bg-[#20bd5a] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SAVED DESIGNS (WISHLIST TRACKING) */}
        {activeTab === 'saved' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl text-[#f5f3ef]">Saved Designs & Client Wishlists</h2>
              <p className="text-xs text-[#8e8c85]">
                Monitor what designs patrons are saving in their wishlist to plan fabric sourcing and future collections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => {
                const isSaved = savedItems.includes(p.id);
                return (
                  <div key={p.id} className="bg-[#121217] border border-[#242430] rounded-2xl p-4 flex items-center gap-4">
                    <img src={p.images[0]} alt={p.name} className="w-16 h-20 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase text-[#c5a880] font-semibold">{p.category}</span>
                      <h4 className="font-serif text-sm text-[#f5f3ef] truncate">{p.name}</h4>
                      <p className="text-xs font-bold text-[#c5a880] mt-0.5">₦{p.price.toLocaleString()}</p>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8e8c85]">
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'text-red-400 fill-red-400' : 'text-[#716f69]'}`} />
                        <span>{isSaved ? 'Saved by active session' : 'Available in shop'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl text-[#f5f3ef]">Client Reviews & Testimonials</h2>
              <p className="text-xs text-[#8e8c85]">Moderate patron testimonials displayed across the website.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testimonials.map(t => (
                <div key={t.id} className="bg-[#121217] border border-[#242430] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base text-[#f5f3ef]">{t.customerName}</h4>
                    <span className="text-xs text-[#c5a880]">★ {t.rating}/5</span>
                  </div>
                  <p className="text-xs text-[#c0beb7] italic break-words">"{t.review}"</p>
                  <p className="text-[10px] text-[#8e8c85]">{t.productOrService} • {t.location}</p>

                  <div className="pt-2 border-t border-[#1e1e28] flex items-center justify-between">
                    <button
                      onClick={() => toggleTestimonialApproval(t.id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                        t.approved ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {t.approved ? 'Approved & Live' : 'Approve for Site'}
                    </button>

                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      className="text-xs text-[#716f69] hover:text-red-400 p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: LOOKBOOK */}
        {activeTab === 'lookbook' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl text-[#f5f3ef]">Editorial Lookbook Archives</h2>
                <p className="text-xs text-[#8e8c85]">Curate lookbook runway visuals and high-fashion reference sets.</p>
              </div>

              <button
                onClick={() => setIsLookbookModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#d6be9a] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Editorial Look</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {lookbook.map(item => (
                <div key={item.id} className="bg-[#121217] border border-[#242430] rounded-2xl overflow-hidden p-4 space-y-3">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-900">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] uppercase text-[#c5a880] font-semibold">{item.category}</span>
                  <h4 className="font-serif text-lg text-[#f5f3ef] truncate">{item.title}</h4>
                  <p className="text-xs text-[#8e8c85] line-clamp-2">{item.description}</p>
                  <div className="flex justify-end pt-2 border-t border-[#1e1e28]">
                    <button
                      onClick={() => deleteLookbookItem(item.id)}
                      className="text-xs text-[#8e8c85] hover:text-red-400 flex items-center gap-1 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl text-[#f5f3ef]">Atelier Engagement Analytics</h2>
              <p className="text-xs text-[#8e8c85]">Track visitor journeys, WhatsApp conversions, and popular tailoring categories.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <span className="text-xs uppercase tracking-wider text-[#8e8c85] font-semibold">Total Logged Interactions</span>
                <p className="font-serif text-3xl text-[#f5f3ef] font-semibold mt-2">{analyticsEvents.length}</p>
                <p className="text-[11px] text-[#25D366] mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Live telemetry tracking
                </p>
              </div>

              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <span className="text-xs uppercase tracking-wider text-[#8e8c85] font-semibold">WhatsApp Inquiries Triggered</span>
                <p className="font-serif text-3xl text-[#25D366] font-semibold mt-2">
                  {analyticsEvents.filter(e => e.eventType === 'whatsapp_click').length}
                </p>
                <p className="text-[11px] text-[#8e8c85] mt-1">Direct client consultations</p>
              </div>

              <div className="bg-[#121217] border border-[#242430] rounded-2xl p-5">
                <span className="text-xs uppercase tracking-wider text-[#8e8c85] font-semibold">Conversion Rate</span>
                <p className="font-serif text-3xl text-[#c5a880] font-semibold mt-2">
                  {analyticsEvents.length > 0
                    ? `${Math.min(100, Math.round(((customRequests.length + bookings.length) / Math.max(1, analyticsEvents.length)) * 100))}%`
                    : '100%'}
                </p>
                <p className="text-[11px] text-[#8e8c85] mt-1">Inquiry to consultation ratio</p>
              </div>
            </div>

            {/* Event Log Table */}
            <div className="bg-[#121217] border border-[#242430] rounded-2xl overflow-hidden p-5 space-y-4">
              <h3 className="font-serif text-lg text-[#f5f3ef]">Recent Activity Log</h3>
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[500px] text-left text-xs text-[#b8b6ae]">
                  <thead className="text-[#8e8c85] border-b border-[#242430]">
                    <tr>
                      <th className="pb-3">Event</th>
                      <th className="pb-3">Context</th>
                      <th className="pb-3">Details</th>
                      <th className="pb-3 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e1e28]">
                    {analyticsEvents.slice(-10).reverse().map(e => (
                      <tr key={e.id} className="hover:bg-[#15151e]">
                        <td className="py-2.5 font-medium text-[#f5f3ef]">{e.eventType}</td>
                        <td className="py-2.5">{e.pageOrItem}</td>
                        <td className="py-2.5 text-[#8e8c85]">{e.metadata}</td>
                        <td className="py-2.5 text-right font-mono text-[11px]">
                          {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: SETTINGS (ATELIER CONFIG & PASSWORD MANAGEMENT) */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in duration-200 max-w-3xl">
            <div>
              <h2 className="font-serif text-2xl text-[#f5f3ef]">Studio Atelier Settings</h2>
              <p className="text-xs text-[#8e8c85]">Configure studio contact hotlines, atelier address, and administrative credentials.</p>
            </div>

            {/* Atelier Info */}
            <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="font-serif text-lg text-[#f5f3ef]">Public Atelier Details</h3>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">WhatsApp Primary Hotline</label>
                <input
                  type="text"
                  value={siteSettings.whatsappNumber}
                  onChange={e => updateSettings({ whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Studio Physical Address</label>
                <input
                  type="text"
                  value={siteSettings.address}
                  onChange={e => updateSettings({ address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Google Maps Directions URL</label>
                <input
                  type="text"
                  value={siteSettings.googleMapsDirectionsUrl}
                  onChange={e => updateSettings({ googleMapsDirectionsUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8e8c85] font-medium mb-1">Opening Hours (Weekdays)</label>
                  <input
                    type="text"
                    value={siteSettings.openingHoursWeekday}
                    onChange={e => updateSettings({ openingHoursWeekday: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8e8c85] font-medium mb-1">Opening Hours (Saturday)</label>
                  <input
                    type="text"
                    value={siteSettings.openingHoursSaturday}
                    onChange={e => updateSettings({ openingHoursSaturday: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Admin Security & Password Management (Requirement 8) */}
            <div className="bg-[#121217] border border-[#242430] rounded-2xl p-6 space-y-5 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#f5f3ef]">Admin Security & Password Management</h3>
                  <p className="text-[#8e8c85]">Change staff password without modifying codebase.</p>
                </div>
              </div>

              {passwordChangeStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passwordChangeStatus.type === 'success'
                      ? 'bg-green-950/40 border border-green-800/60 text-green-300'
                      : 'bg-red-950/40 border border-red-800/60 text-red-300'
                  }`}
                >
                  {passwordChangeStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span>{passwordChangeStatus.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdatePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#8e8c85] font-medium mb-1">Current Password *</label>
                  <input
                    type="password"
                    required
                    value={currentPasswordInput}
                    onChange={e => setCurrentPasswordInput(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8e8c85] font-medium mb-1">New Password *</label>
                    <input
                      type="password"
                      required
                      value={newPasswordInput}
                      onChange={e => setNewPasswordInput(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8e8c85] font-medium mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      value={confirmPasswordInput}
                      onChange={e => setConfirmPasswordInput(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e12] border border-[#252530] text-sm text-white focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-[11px] text-[#716f69]">
                    Credentials are persisted locally and in active session state.
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#c5a880] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider hover:bg-[#d6be9a] transition-all"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121217] border border-[#2d2d38] rounded-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#f5f3ef] mb-4">
              {editingProduct ? 'Edit Ready-to-Wear Creation' : 'Add Ready-to-Wear Creation'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={e => setProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8e8c85] font-medium mb-1">Category</label>
                  <select
                    value={prodCategory}
                    onChange={e => setProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                  >
                    <option value="Senator Styles">Senator Styles</option>
                    <option value="Custom Dresses">Custom Dresses</option>
                    <option value="Native / Ankara">Native / Ankara</option>
                    <option value="Occasion Wear">Occasion Wear</option>
                    <option value="Unisex Fashion">Unisex Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8e8c85] font-medium mb-1">Price (₦ Naira)</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={e => setProdPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  required
                  value={prodImages}
                  onChange={e => setProdImages(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={prodDescription}
                  onChange={e => setProdDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#c5a880] text-[#0c0c0e] font-semibold uppercase tracking-wider hover:bg-[#d6be9a]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lookbook Modal */}
      {isLookbookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121217] border border-[#2d2d38] rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsLookbookModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#f5f3ef] mb-4">Add Editorial Look</h3>

            <form onSubmit={handleSaveLookbook} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Look Title</label>
                <input
                  type="text"
                  required
                  value={lookTitle}
                  onChange={e => setLookTitle(e.target.value)}
                  placeholder="e.g. Royal Agbada in Emerald Damask"
                  className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">High-Res Image URL</label>
                <input
                  type="text"
                  required
                  value={lookImage}
                  onChange={e => setLookImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                />
              </div>

              <div>
                <label className="block text-[#8e8c85] font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={lookDesc}
                  onChange={e => setLookDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0e0e12] border border-[#24242e] text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLookbookModalOpen(false)}
                  className="px-4 py-2 rounded-full text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#c5a880] text-[#0c0c0e] font-semibold uppercase tracking-wider hover:bg-[#d6be9a]"
                >
                  Publish to Lookbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
