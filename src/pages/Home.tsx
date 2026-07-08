import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Wifi, Monitor, Keyboard, QrCode,
  FileText, ShoppingBag, BarChart2, Package, UtensilsCrossed,
  Heart, Zap, Shield, Users, ChevronDown, Star, Clock, Layers,
  Receipt, Printer, Coffee, TrendingUp, Settings, Bell, Globe,
  MessageCircle, Headphones, PieChart
} from 'lucide-react';
import CTABand from '../components/CTABand';

/* ─── Animated Counter Hook ─────────────────────────── */
function useCountUp(target: number, duration = 1800, suffix = '') {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { ref, display: count.toLocaleString() + suffix };
}

/* ─── Fade-in on scroll ──────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string; key?: string | number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────── */
function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(target, 1600, suffix);
  return (
    <div ref={ref} className="text-center px-6">
      <div className="text-3xl sm:text-4xl font-bold text-primary font-sora mb-1">{display}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

/* ─── POS Screen SVG Mockup ──────────────────────────── */
function POSMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
      {/* Screen */}
      <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full drop-shadow-2xl">
        {/* Monitor base */}
        <rect x="10" y="10" width="460" height="310" rx="16" fill="#1A1A2E" />
        <rect x="10" y="10" width="460" height="310" rx="16" stroke="#FF6B35" strokeWidth="2" strokeOpacity="0.4" />
        {/* Screen content area */}
        <rect x="24" y="24" width="432" height="282" rx="10" fill="#0F0F1E" />

        {/* Top bar */}
        <rect x="24" y="24" width="432" height="38" rx="10" fill="#1e1e35" />
        <text x="40" y="47" fill="#FF6B35" fontSize="11" fontWeight="bold" fontFamily="monospace">e-Smart POS</text>
        <rect x="360" y="33" width="60" height="20" rx="6" fill="#FF6B35" />
        <text x="374" y="47" fill="white" fontSize="10" fontFamily="monospace">Bill #42</text>

        {/* Sidebar */}
        <rect x="24" y="62" width="120" height="244" fill="#141428" />
        {/* Table cards */}
        {[0,1,2,3,4,5].map((i) => (
          <g key={i}>
            <rect x="32" y={72 + i * 37} width="100" height="28" rx="6" fill={i === 1 ? '#FF6B35' : i === 3 ? '#0F9D8C' : '#222240'} />
            <text x="48" y={91 + i * 37} fill={i === 1 || i === 3 ? 'white' : '#8888aa'} fontSize="9" fontFamily="monospace">
              Table {i + 1} {i === 1 ? '●' : i === 3 ? '○' : ''}
            </text>
          </g>
        ))}

        {/* Main content */}
        <rect x="156" y="62" width="300" height="244" fill="#0a0a1a" />

        {/* Order items */}
        <text x="168" y="84" fill="#aaaacc" fontSize="9" fontFamily="monospace">ORDER ITEMS — TABLE 2</text>
        {[
          { name: 'Paneer Butter Masala', qty: 2, price: '₹560' },
          { name: 'Garlic Naan ×4', qty: 4, price: '₹180' },
          { name: 'Mango Lassi', qty: 3, price: '₹240' },
          { name: 'Veg Biryani', qty: 1, price: '₹320' },
        ].map((item, i) => (
          <g key={i}>
            <rect x="160" y={92 + i * 32} width="286" height="26" rx="5" fill={i % 2 === 0 ? '#0F0F2A' : '#0a0a1a'} />
            <text x="170" y={109 + i * 32} fill="#ccccee" fontSize="9" fontFamily="monospace">{item.name}</text>
            <text x="420" y={109 + i * 32} fill="#FF6B35" fontSize="9" fontFamily="monospace" textAnchor="end">{item.price}</text>
          </g>
        ))}

        {/* Divider */}
        <rect x="160" y="224" width="286" height="1" fill="#2a2a4a" />

        {/* Totals */}
        <text x="170" y="240" fill="#888899" fontSize="9" fontFamily="monospace">Subtotal</text>
        <text x="440" y="240" fill="#ccccee" fontSize="9" fontFamily="monospace" textAnchor="end">₹1,300</text>
        <text x="170" y="254" fill="#888899" fontSize="9" fontFamily="monospace">GST (5%)</text>
        <text x="440" y="254" fill="#ccccee" fontSize="9" fontFamily="monospace" textAnchor="end">₹65</text>
        <text x="170" y="272" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">TOTAL</text>
        <text x="440" y="272" fill="#FF6B35" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="end">₹1,365</text>

        {/* Action buttons */}
        <rect x="160" y="280" width="90" height="22" rx="5" fill="#222240" />
        <text x="205" y="294" fill="#8888aa" fontSize="9" fontFamily="monospace" textAnchor="middle">Print KOT</text>
        <rect x="258" y="280" width="90" height="22" rx="5" fill="#0F9D8C" />
        <text x="303" y="294" fill="white" fontSize="9" fontFamily="monospace" textAnchor="middle">Send Bill</text>
        <rect x="356" y="280" width="90" height="22" rx="5" fill="#FF6B35" />
        <text x="401" y="294" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Settle ₹1365</text>

        {/* KOT badge */}
        <circle cx="440" cy="38" r="10" fill="#0F9D8C" />
        <text x="440" y="42" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">KOT</text>
      </svg>
    </div>
  );
}

/* ─── Core Features ──────────────────────────────────── */
const FEATURES = [
  { icon: Receipt, title: 'Branded Bill Templates', desc: 'Fully editable bill formats with your logo, GST details, and custom thank-you messages.' },
  { icon: Layers, title: 'Multi-Counter Sync', desc: 'Run multiple billing counters simultaneously — all synced to one central dashboard.' },
  { icon: Printer, title: 'Kitchen Ticket Routing', desc: 'Route KOTs to the right station — grill, tandoor, or bar — automatically by menu category.' },
  { icon: UtensilsCrossed, title: 'Table & Floor Management', desc: 'Visual floor plan with live table status, cover counts, and waiter assignment.' },
  { icon: Settings, title: 'Tax & Discount Rules', desc: 'Set up GST slabs, CGST/SGST splits, happy-hour discounts, and combo offers effortlessly.' },
  { icon: Shield, title: 'Role-Based Permissions', desc: 'Lock down billing actions — only authorised staff can void bills, apply discounts, or edit items.' },
];

/* ─── Compatibility ──────────────────────────────────── */
const COMPAT = [
  { icon: Wifi, label: 'Works offline' },
  { icon: Monitor, label: 'Any hardware' },
  { icon: Globe, label: 'Any OS' },
  { icon: Keyboard, label: 'Touch or keyboard' },
  { icon: QrCode, label: 'QR self-order' },
  { icon: FileText, label: 'Digital e-receipts' },
];

/* ─── Beyond Billing ─────────────────────────────────── */
const CROSS_SELL = [
  { icon: ShoppingBag, title: 'Online Ordering', desc: 'Accept orders from your own branded website and app — zero commission, full control.', to: '/product/online-ordering' },
  { icon: BarChart2, title: 'Reports & Analytics', desc: 'Daily MIS, item-wise sales, waiter performance, and trend reports in real-time.', to: '/product/reports' },
  { icon: Package, title: 'Inventory Management', desc: 'Track raw materials to the gram. Auto-deduct from recipes with every bill generated.', to: '/product/inventory' },
  { icon: UtensilsCrossed, title: 'Menu Management', desc: 'Update prices, add combos, and manage modifiers across all outlets instantly.', to: '/product/menu' },
  { icon: Heart, title: 'CRM & Loyalty', desc: 'Auto-reward repeat customers, send SMS birthday offers, and reduce churn.', to: '/product/crm' },
];

/* ─── FAQ ────────────────────────────────────────────── */
const FAQS = [
  { q: 'Why does my restaurant need dedicated billing software?', a: 'Manual billing leads to errors, revenue leakage, and slow table turnovers. Dedicated POS software like e-Smart Restaurant automates GST calculations, prevents fraudulent voids, routes kitchen orders instantly, and gives you real-time P&L visibility — all of which directly increase profitability.' },
  { q: 'How fast is the billing flow?', a: 'An experienced cashier can generate and print a GST-compliant bill in under 30 seconds — even with multiple payment modes (cash + UPI split). The touchscreen-optimised UI is designed for speed during peak hours.' },
  { q: 'How long does setup take?', a: 'Most restaurants go live in under 24 hours. Our onboarding team handles menu uploading, hardware configuration, and staff training. You will not miss a single shift.' },
  { q: 'Can I track orders in real time from my phone?', a: 'Yes. The cloud admin panel is accessible from any smartphone browser. You will see live table status, pending KOTs, current day sales, and inventory deductions from anywhere in the world.' },
  { q: 'Does it work if the internet goes down?', a: 'Absolutely. Core billing, printing, and KOT routing work fully offline. All data syncs back to the cloud automatically once your connection is restored.' },
  { q: 'Can customers receive digital invoices?', a: 'Yes — e-receipts can be sent via SMS or WhatsApp directly from the billing screen. No more paper waste; customers get a searchable invoice on their phone.' },
  { q: 'Is the software available in regional languages?', a: 'The POS interface supports English and Hindi. Kitchen display and printed KOTs can include transliterated item names in Marathi, Tamil, Telugu, and Bengali. Multi-language support is being expanded regularly.' },
];

/* ─── Add-on Ecosystem ───────────────────────────────── */
const ADDONS = [
  { heading: 'Guest Engagement', items: ['WhatsApp Receipts', 'SMS Marketing', 'Loyalty Rewards', 'Birthday Campaigns'] },
  { heading: 'Operations', items: ['Staff Attendance', 'Recipe Costing', 'Purchase Orders', 'Vendor Management'] },
  { heading: 'Customer Service', items: ['Feedback Portal', 'Table Reservations', 'Complaint Tracker', 'Rating Alerts'] },
  { heading: 'Analytics', items: ['Revenue Dashboard', 'Item Profitability', 'Wastage Reports', 'Outlet Comparison'] },
];

/* ─── Resources ──────────────────────────────────────── */
const RESOURCES = [
  { tag: 'Guide', title: 'The Complete Guide to Restaurant POS for 2025', snippet: 'Everything you need to know before choosing billing software for your restaurant.' },
  { tag: 'Blog', title: 'How QSR Chains Cut Billing Time by 40% with Smart KOT Routing', snippet: 'Real-world case study on peak-hour efficiency improvements.' },
  { tag: 'Template', title: 'Free Restaurant Daily MIS Report Template', snippet: 'Track revenue, covers, and waste in a single printable sheet.' },
];

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({ name: '', phone: '', restaurant: '', city: '', outlets: '', submitted: false, error: '' });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.restaurant) {
      setFormState(s => ({ ...s, error: 'Please fill in Name, Phone, and Restaurant Name.' }));
      return;
    }
    setFormState(s => ({ ...s, submitted: true, error: '' }));
  };

  return (
    <main className="bg-warm">

      {/* ── 1. HERO ─────────────────────────────────── */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
              <Zap className="w-3.5 h-3.5" />
              Trusted by 10,000+ restaurants across India {/* SAMPLE — replace with real stat */}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-charcoal leading-[1.12] mb-6 font-sora">
              Bill faster than your{' '}
              <span className="text-gradient">busiest rush hour</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Simplify billing, kitchen tickets, and table management in one screen. Designed for Indian restaurants — works offline, supports GST, and goes live in under a day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-orange-200"
              >
                Get a Free Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-charcoal font-medium text-base rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all bg-white"
              >
                See how it works
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-gray-400">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-secondary" /> No commitment</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-secondary" /> Free onboarding</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-secondary" /> Live in &lt;1 day</span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <POSMockup />
          </div>
        </div>
      </section>

      {/* ── 2. STAT STRIP ───────────────────────────── */}
      {/* SAMPLE STATS — replace all numbers with real data before going live */}
      <section className="border-y border-gray-200 bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 divide-x divide-gray-100">
          <StatCard target={10000} suffix="+" label="Restaurants served" />
          <StatCard target={1} suffix="M+" label="Bills processed daily" />
          <StatCard target={24} suffix="h" label="Average go-live time" />
          <StatCard target={200} suffix="+" label="Hardware integrations" />
        </div>
      </section>

      {/* ── 3. CORE FEATURES GRID ───────────────────── */}
      <section id="features" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">Everything billing — and beyond</h2>
          <p className="text-gray-500 text-lg">Six core capabilities that keep your cashier, kitchen, and manager perfectly in sync.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 60} className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-charcoal mb-2 text-lg font-sora">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 4. COMPATIBILITY STRIP ──────────────────── */}
      <section className="bg-charcoal py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-x-10 gap-y-6">
          {COMPAT.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-gray-300 text-sm font-medium">
              <Icon className="w-5 h-5 text-primary" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. BEYOND BILLING ───────────────────────── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4 font-sora">One system, every part of your restaurant</h2>
          <p className="text-gray-500 text-lg">Billing is just the start. Here's what else e-Smart powers.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CROSS_SELL.map(({ icon: Icon, title, desc, to }, i) => (
            <FadeIn key={title} delay={i * 70}>
              <Link
                to={to}
                className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-charcoal mb-2 font-sora text-sm">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{desc}</p>
                <span className="text-primary text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 6. SOCIAL PROOF ─────────────────────────── */}
      {/* SAMPLE TESTIMONIAL — replace with a real verified customer quote before launch */}
      <section className="bg-orange-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-orange-100 shadow-lg shadow-orange-100/40 relative">
              <div className="absolute -top-4 left-8 text-primary text-6xl font-serif leading-none">"</div>
              <div className="flex mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-charcoal text-lg leading-relaxed mb-6 font-medium">
                We used to struggle during weekend rushes — wrong orders, lost KOTs, billing errors. Since switching to e-Smart Restaurant our table turnover time has dropped by 20 minutes and billing mistakes are almost zero.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold font-sora">
                  RS
                </div>
                <div>
                  <div className="font-bold text-charcoal font-sora">Rohit Sharma</div>
                  {/* SAMPLE — replace with real customer */}
                  <div className="text-sm text-gray-500">Owner, The Spice Route — Pune</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 7. DEMO REQUEST BAND ────────────────────── */}
      <section id="demo" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3 font-sora">See it in action — free</h2>
            <p className="text-gray-500 mb-8">Book a personalised demo. Our team will show you exactly how e-Smart fits your restaurant type.</p>
            {formState.submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-charcoal text-xl mb-2 font-sora">You're on the list!</h3>
                <p className="text-gray-500">Our team will call you within 2 business hours to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4" noValidate>
                {formState.error && (
                  <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{formState.error}</p>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Your Name *" value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white"
                  />
                  <input
                    type="tel" placeholder="Phone Number *" value={formState.phone}
                    onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white"
                  />
                </div>
                <input
                  type="text" placeholder="Restaurant Name *" value={formState.restaurant}
                  onChange={e => setFormState(s => ({ ...s, restaurant: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="City" value={formState.city}
                    onChange={e => setFormState(s => ({ ...s, city: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white"
                  />
                  <select
                    value={formState.outlets}
                    onChange={e => setFormState(s => ({ ...s, outlets: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:outline-none text-sm bg-white text-gray-500"
                  >
                    <option value="">Number of outlets</option>
                    <option>1</option>
                    <option>2-5</option>
                    <option>6-20</option>
                    <option>20+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                >
                  Request Free Demo <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </FadeIn>

          {/* Right: Illustration + bullets */}
          <FadeIn delay={120}>
            <div className="bg-charcoal rounded-2xl p-8 text-white">
              {/* Simple SVG illustration */}
              <div className="mb-8 flex justify-center">
                <svg viewBox="0 0 220 140" className="w-48 opacity-90" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="20" width="180" height="110" rx="12" fill="#1e1e35" />
                  <rect x="30" y="30" width="160" height="80" rx="8" fill="#0a0a1a" />
                  <rect x="40" y="42" width="60" height="8" rx="4" fill="#FF6B35" opacity="0.8" />
                  <rect x="40" y="56" width="100" height="6" rx="3" fill="#2a2a4a" />
                  <rect x="40" y="68" width="80" height="6" rx="3" fill="#2a2a4a" />
                  <rect x="40" y="80" width="120" height="6" rx="3" fill="#2a2a4a" />
                  <rect x="40" y="92" width="60" height="6" rx="3" fill="#0F9D8C" opacity="0.7" />
                  <circle cx="168" cy="50" r="16" fill="#FF6B35" opacity="0.2" />
                  <circle cx="168" cy="50" r="8" fill="#FF6B35" />
                  <rect x="75" y="120" width="70" height="10" rx="5" fill="#1e1e35" />
                  <rect x="100" y="130" width="20" height="10" rx="2" fill="#2a2a4a" />
                </svg>
              </div>
              <ul className="space-y-4">
                {[
                  { icon: CheckCircle, text: 'No long-term commitment — cancel anytime' },
                  { icon: Headphones, text: 'Free onboarding & 24×7 support included' },
                  { icon: Clock, text: 'Go live in under a day with our setup team' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 8. ADD-ON ECOSYSTEM ─────────────────────── */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-3 font-sora">Powerful add-on ecosystem</h2>
            <p className="text-gray-500">Extend your POS with plug-and-play modules — no technical setup required.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADDONS.map(({ heading, items }) => (
              <div key={heading} className="bg-warm rounded-xl p-6 border border-gray-100">
                <h4 className="font-bold text-charcoal mb-4 font-sora text-sm tracking-wide uppercase text-primary">{heading}</h4>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. RESOURCES TEASER ─────────────────────── */}
      <section id="resources" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-sora">From the e-Smart blog</h2>
            <p className="text-gray-500 mt-1">Tips, guides, and case studies to grow your restaurant.</p>
          </div>
          <Link to="/resources/blog" className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-6">
          {RESOURCES.map(({ tag, title, snippet }, i) => (
            <FadeIn key={title} delay={i * 80}>
              <Link to="/resources/blog" className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 h-full">
                {/* Placeholder image */}
                <div className="h-44 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                  <Coffee className="w-12 h-12 text-primary/30" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-2.5 py-1 bg-orange-100 text-primary text-xs font-semibold rounded-full mb-3">{tag}</span>
                  <h3 className="font-bold text-charcoal mb-2 font-sora group-hover:text-primary transition-colors leading-snug">{title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{snippet}</p>
                  <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 10. FAQ ACCORDION ───────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-3 font-sora">Frequently asked questions</h2>
            <p className="text-gray-500">Answers to the questions we hear most from restaurant owners.</p>
          </FadeIn>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  aria-expanded={activeFaq === i}
                >
                  <span className="font-semibold text-charcoal text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: activeFaq === i ? '400px' : '0' }}
                >
                  <p className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA BAND ──────────────────────── */}
      <CTABand
        headline="Ready to speed up your billing?"
        subtext="Join 10,000+ restaurants already running smarter. Setup takes less than a day."
        ctaLabel="Book a Free Demo"
        ctaTo="/contact"
      />
    </main>
  );
}
