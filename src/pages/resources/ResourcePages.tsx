import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, FileText, HelpCircle, Search, ArrowRight,
  Download, Clock, User, ChevronRight, ChevronDown,
  MessageCircle, Phone, Mail, FileSpreadsheet, CheckCircle, Heart
} from 'lucide-react';
import CTABand from '../../components/CTABand';

/* ── Scroll-reveal animation (local inline helper) ───── */
function FadeIn({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string; key?: string | number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
/* ─── 1. BLOG PAGE COMPONENT ─────────────────────────── */
const BLOG_POSTS = [
  {
    title: 'How QSR Chains Cut Billing Time by 40% with Smart KOT Routing',
    desc: 'Deep dive into peak-hour counter metrics and how electronic kitchen displays keep orders coordinated without verbal shouting.',
    category: 'Operations',
    readTime: '6 min read',
    date: 'July 5, 2026',
    author: 'Amit Kumar',
    tag: 'Featured',
    emoji: '⚡'
  },
  {
    title: 'The Ultimate Guide to Restaurant POS & GST Compliance',
    desc: 'Understanding CGST, SGST, service charges, and discount tax rules so your accountant gets error-free MIS logs every month.',
    category: 'Finance',
    readTime: '8 min read',
    date: 'June 28, 2026',
    author: 'Rahul Singh',
    emoji: '🧾'
  },
  {
    title: '5 Ways to Reduce Food Waste and Theft in Cloud Kitchens',
    desc: 'How linking recipes directly to ingredient stock levels flags theoretical vs actual variance before food cost leaks out.',
    category: 'Inventory',
    readTime: '5 min read',
    date: 'June 14, 2026',
    author: 'Priya Mehta',
    emoji: '📦'
  },
  {
    title: 'How Birthday SMS Automation Brings Back 30% of Past Guests',
    desc: 'Real case studies on low-cost CRM messaging campaigns that run automatically on guest birthdays and anniversaries.',
    category: 'Marketing',
    readTime: '4 min read',
    date: 'May 30, 2026',
    author: 'Nisha Joshi',
    emoji: '🎂'
  },
  {
    title: 'Weighing Scale Integration: Speeding up Sweet Shop Billing',
    desc: 'Why manual weight entry causes cashier mistakes and how direct serial scale connections secure sweet store margins.',
    category: 'Hardware',
    readTime: '5 min read',
    date: 'May 12, 2026',
    author: 'Amit Kumar',
    emoji: '⚖️'
  },
  {
    title: 'Rooftop vs Dine-in: Managing Multiple Floors Effortlessly',
    desc: 'Pacing table turn rates, waitlist queues, and waiter assignments using visual color-coded tablet layouts.',
    category: 'Operations',
    readTime: '7 min read',
    date: 'April 24, 2026',
    author: 'Rahul Singh',
    emoji: '🍽️'
  }
];

export function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Operations', 'Finance', 'Inventory', 'Marketing', 'Hardware'];

  const filtered = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="bg-warm">
      {/* Hero section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
          <BookOpen className="w-3.5 h-3.5" /> e-Smart Blog
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 font-sora leading-tight">
          Insights to run a <span className="text-gradient">more profitable</span> restaurant
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          Read guides, case studies, and business tips curated by software engineers and hospitality veterans.
        </p>

        {/* Search bar */}
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:outline-none bg-white text-sm transition-colors shadow-sm"
          />
        </div>
      </section>

      {/* Category selection */}
      <section className="pb-8 px-4 text-center">
        <div className="inline-flex flex-wrap gap-2 justify-center bg-gray-100 p-1.5 rounded-2xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No articles match your search parameters.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <FadeIn
                key={post.title}
                delay={i * 60}
                className="bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Emoji banner */}
                  <div className="h-40 bg-orange-50/50 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                    {post.emoji}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="bg-orange-100 text-primary font-bold px-2.5 py-0.5 rounded-full">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-charcoal text-lg mb-2 leading-snug group-hover:text-primary transition-colors font-sora">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter signup */}
      <section className="bg-charcoal py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-sora">Join our newsletter</h3>
          <p className="text-gray-400 text-sm mb-6">Get billing optimization tips and templates delivered straight to your inbox.</p>
          {subscribed ? (
            <div className="text-secondary font-bold text-sm bg-secondary/15 py-3 rounded-xl border border-secondary flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-none focus:outline-none text-sm bg-white/10 text-white placeholder-gray-500 focus:bg-white/20 transition-all"
              />
              <button type="submit" className="px-5 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors text-sm">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <CTABand
        headline="Ready to run your restaurant smarter?"
        subtext="Book a personalized demo and let our experts showcase how we solve billing and operations."
        ctaLabel="Book a Free Demo"
        ctaTo="/contact"
      />
    </main>
  );
}


/* ══════════════════════════════════════════════════════ */
/* ─── 2. GUIDES & TEMPLATES COMPONENT ────────────────── */
const GUIDES = [
  {
    title: 'Daily Restaurant MIS Template',
    desc: 'A ready-to-use Excel template to track daily sales, cash collections, card settlements, raw material waste, and labor margins.',
    format: 'XLSX Spreadsheet',
    size: '1.2 MB',
    bullets: ['Cash vs Online settlement balance sheets', 'Direct food cost variance tracker', 'Daily cover-count performance metrics'],
    emoji: '📊'
  },
  {
    title: 'Food Cost & Recipe Calculator',
    desc: 'Step-by-step spreadsheet calculator to calculate exact recipe costs down to the gram, food cost percentages, and margins.',
    format: 'Spreadsheet Template',
    size: '850 KB',
    bullets: ['Ingredient gram costing conversions', 'Auto margins per recipe percentage calculations', 'Wastage variance comparison graphs'],
    emoji: '🥗'
  },
  {
    title: 'Restaurant Grand Opening Checklist',
    desc: 'Comprehensive step-by-step guide and printable checklist covering software deployment, staff hiring, licensing, and supplier contracts.',
    format: 'PDF Checklist Book',
    size: '2.4 MB',
    bullets: ['POS hardware check sheet lists', 'State food health license reminders', 'Kitchen layout optimization grids'],
    emoji: '📅'
  },
  {
    title: 'excise compliance helper logs',
    desc: 'Excise formatted sales reporting sheets ready for accountant filing, built in compliance with state regulations.',
    format: 'CSV Sheet templates',
    size: '500 KB',
    bullets: ['Liquor volume translation weights', 'Excise sales classification lists', 'Daily summary balance trackers'],
    emoji: '🍷'
  }
];

export function Guides() {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const triggerDownload = (title: string) => {
    setDownloaded(title);
    setTimeout(() => setDownloaded(null), 3000);
  };

  return (
    <main className="bg-warm">
      <section className="min-h-[50vh] flex flex-col justify-center items-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
          <FileText className="w-3.5 h-3.5" /> Free Resources
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 font-sora leading-tight">
          Spreadsheets and tools to <span className="text-gradient">grow your business</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Download our calculators, MIS dashboards, and manuals to check operations and audit your finances.
        </p>
      </section>

      {/* Guides list grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {GUIDES.map((guide, i) => (
            <FadeIn
              key={guide.title}
              delay={i * 80}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-3xl flex items-center justify-center shrink-0">
                    {guide.emoji}
                  </div>
                  <div>
                    <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">{guide.format}</span>
                    <h3 className="font-bold text-charcoal text-lg mt-1 font-sora leading-snug">{guide.title}</h3>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{guide.desc}</p>
                <ul className="space-y-2 mb-8">
                  {guide.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => triggerDownload(guide.title)}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  downloaded === guide.title
                    ? 'bg-secondary text-white shadow-md'
                    : 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-orange-200'
                }`}
              >
                {downloaded === guide.title ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Download Started!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download Free Guide ({guide.size})
                  </>
                )}
              </button>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTABand
        headline="Want custom software integration?"
        subtext="Our engineers configure recipes, menu databases, and custom billing templates during setup."
        ctaLabel="Book a Free Demo"
        ctaTo="/contact"
      />
    </main>
  );
}


/* ══════════════════════════════════════════════════════ */
/* ─── 3. HELP CENTER & FAQ COMPONENT ─────────────────── */
const HELP_CATEGORIES = [
  { title: 'POS Billing Setup', desc: 'Pairing receipt printers, setting up GST tax structures, and adding custom logos.', count: '12 guides', icon: FileSpreadsheet },
  { title: 'Inventory Controls', desc: 'Setting recipes, receiving purchases, and managing supplier logs.', count: '8 guides', icon: FileText },
  { title: 'Loyalty & Campaigns', desc: 'Configuring rewards points, custom SMS coupon tags, and anniversary automated alerts.', count: '6 guides', icon: Heart },
  { title: 'Hardware Troubleshooting', desc: 'Connecting ESC/POS USB thermal printers, serial weighing scales, and captain tables.', count: '9 guides', icon: HelpCircle },
];

const GENERAL_FAQS = [
  { q: 'How do I add a new menu item in the POS?', a: 'Log in to your e-Smart web dashboard, navigate to Menu Management, click Add Item, enter details (price, category, tax category), and hit push to sync it to the billing terminal immediately.' },
  { q: 'What printers are compatible with the software?', a: 'We support all standard 2-inch (58mm) and 3-inch (80mm) ESC/POS thermal printers connected via USB, Bluetooth, LAN, or Wi-Fi.' },
  { q: 'How do I export sales summaries for GST filing?', a: 'Go to Reports, choose GST GSTR-1 Ledger, pick your date range, and click Download Excel. It formats CGST/SGST splits ready for upload.' },
  { q: 'Can I restrict cashiers from issuing refunds?', a: 'Yes. In User permissions, turn off Settle voids & refunds for cashiers. It will request a manager PIN whenever voiding transactions.' }
];

export function HelpCenter() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-warm">
      <section className="min-h-[50vh] flex flex-col justify-center items-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-primary text-xs font-semibold mb-6">
          <HelpCircle className="w-3.5 h-3.5" /> Help Center
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 font-sora leading-tight">
          How can we <span className="text-gradient">help you</span> today?
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          Browse setup guides, hardware troubleshooting cards, and FAQ answers to speed up configurations.
        </p>

        {/* Big Search Bar */}
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search guides, printers, tax configs..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary focus:outline-none bg-white text-sm transition-colors shadow-sm"
          />
        </div>
      </section>

      {/* Guide Categories Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h3 className="font-bold text-charcoal text-xl mb-6 font-sora text-center">Help categories</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {HELP_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <FadeIn
                key={cat.title}
                delay={i * 60}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal group-hover:text-primary transition-colors font-sora text-base leading-tight">
                    {cat.title}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1 mb-3">{cat.count}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* FAQs list accordion */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-bold text-charcoal text-2xl mb-8 font-sora text-center">Common setup questions</h3>
          <div className="space-y-3">
            {GENERAL_FAQS.map((faq, i) => (
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
                  style={{ maxHeight: activeFaq === i ? '300px' : '0' }}
                >
                  <p className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support channel card */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-charcoal rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75 pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-sora">Still need help?</h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-8">
            Speak to our engineering support crew directly. We are available Mon-Sat, 9:00 AM – 8:00 PM.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a href="tel:+918454943806" className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-primary/20 transition-all flex flex-col items-center">
              <Phone className="w-6 h-6 text-primary mb-3" />
              <span className="font-semibold text-sm">Call Support</span>
              <span className="text-xs text-gray-400 mt-1">+91 84549 43806</span>
            </a>
            <a href="#" className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-primary/20 transition-all flex flex-col items-center">
              <MessageCircle className="w-6 h-6 text-green-400 mb-3" />
              <span className="font-semibold text-sm">WhatsApp Support</span>
              <span className="text-xs text-gray-400 mt-1">Chat live in seconds</span>
            </a>
            <a href="mailto:info@efficacious.co.in" className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-primary/20 transition-all flex flex-col items-center">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <span className="font-semibold text-sm">Email Support</span>
              <span className="text-xs text-gray-400 mt-1">info@efficacious.co.in</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
