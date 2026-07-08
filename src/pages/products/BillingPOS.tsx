import React from 'react';
import {
  Receipt, Layers, Printer, UtensilsCrossed, Settings,
  Shield, Wifi, Monitor, Globe, Keyboard, QrCode, FileText,
  Store, Coffee, Truck,
} from 'lucide-react';
import ProductTemplate, { ScreenFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Full POS Screen ─────────────── */
function BillingIllustration() {
  return (
    <ScreenFrame>
      {/* Top bar */}
      <rect x="22" y="22" width="436" height="36" rx="8" fill="#1e1e35" />
      <text x="36" y="44" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">e-Smart POS — Billing</text>
      <rect x="366" y="31" width="62" height="18" rx="5" fill="#FF6B35" />
      <text x="381" y="43" fill="white" fontSize="9" fontFamily="monospace">New Bill</text>
      {/* Category tabs */}
      {['Starters', 'Main Course', 'Drinks', 'Desserts'].map((cat, i) => (
        <g key={cat}>
          <rect x={22 + i * 52} y={64} width={48} height={20} rx={4} fill={i === 1 ? '#FF6B35' : '#1e1e35'} />
          <text x={22 + i * 52 + 24} y={77} fill={i === 1 ? 'white' : '#8888aa'} fontSize="7" fontFamily="monospace" textAnchor="middle">{cat}</text>
        </g>
      ))}
      {/* Menu items grid */}
      {[
        ['Paneer Tikka', '₹240'], ['Dal Makhani', '₹180'], ['Naan ×4', '₹80'],
        ['Chicken Biryani', '₹320'], ['Mango Lassi', '₹90'], ['Veg Biryani', '₹280'],
      ].map(([name, price], i) => (
        <g key={name}>
          <rect x={22 + (i % 3) * 96} y={92 + Math.floor(i / 3) * 52} width={90} height={46} rx={6} fill={i === 0 ? '#FF6B3520' : '#0f0f2a'} stroke={i === 0 ? '#FF6B35' : '#1e1e35'} strokeWidth="1" />
          <text x={22 + (i % 3) * 96 + 8} y={110 + Math.floor(i / 3) * 52} fill="#ccccee" fontSize="8" fontFamily="monospace">{name}</text>
          <text x={22 + (i % 3) * 96 + 8} y={126 + Math.floor(i / 3) * 52} fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace">{price}</text>
        </g>
      ))}
      {/* Bill panel */}
      <rect x="316" y="60" width="136" height="234" rx="8" fill="#141428" />
      <text x="384" y="76" fill="#aaaacc" fontSize="8" fontFamily="monospace" textAnchor="middle">CURRENT BILL · TABLE 4</text>
      {[
        ['Paneer Tikka', '1', '₹240'],
        ['Dal Makhani', '2', '₹360'],
        ['Naan ×4', '1', '₹80'],
      ].map(([name, qty, amt], i) => (
        <g key={name}>
          <text x={325} y={94 + i * 28} fill="#ccccee" fontSize="7.5" fontFamily="monospace">{name}</text>
          <text x={440} y={94 + i * 28} fill="#FF6B35" fontSize="7.5" fontFamily="monospace" textAnchor="end">{amt}</text>
          <text x={325} y={104 + i * 28} fill="#555577" fontSize="6.5" fontFamily="monospace">qty: {qty}</text>
        </g>
      ))}
      <rect x="316" y="176" width="136" height="1" fill="#2a2a4a" />
      <text x="325" y="190" fill="#888899" fontSize="7" fontFamily="monospace">Subtotal</text>
      <text x="445" y="190" fill="#ccccee" fontSize="7" fontFamily="monospace" textAnchor="end">₹680</text>
      <text x="325" y="202" fill="#888899" fontSize="7" fontFamily="monospace">GST (5%)</text>
      <text x="445" y="202" fill="#ccccee" fontSize="7" fontFamily="monospace" textAnchor="end">₹34</text>
      <text x="325" y="218" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">TOTAL</text>
      <text x="445" y="218" fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="end">₹714</text>
      <rect x="322" y="226" width="124" height="22" rx="5" fill="#FF6B35" />
      <text x="384" y="240" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Print &amp; Settle</text>
      <rect x="322" y="253" width="58" height="18" rx="4" fill="#0F9D8C" />
      <text x="351" y="265" fill="white" fontSize="7" fontFamily="monospace" textAnchor="middle">Send SMS</text>
      <rect x="386" y="253" width="58" height="18" rx="4" fill="#222240" />
      <text x="415" y="265" fill="#8888aa" fontSize="7" fontFamily="monospace" textAnchor="middle">KOT Print</text>
      {/* Status bar */}
      <rect x="22" y="278" width="436" height="14" rx="0" fill="#0a0a1a" />
      <text x="36" y="288" fill="#0F9D8C" fontSize="7" fontFamily="monospace">● Online</text>
      <text x="100" y="288" fill="#555577" fontSize="7" fontFamily="monospace">Cashier: Ravi</text>
      <text x="200" y="288" fill="#555577" fontSize="7" fontFamily="monospace">Shift: 2:00 PM – 10:00 PM</text>
      <text x="380" y="288" fill="#FF6B35" fontSize="7" fontFamily="monospace" textAnchor="end">Bills today: 47</text>
    </ScreenFrame>
  );
}

/* ── Spotlight Visual: Offline Mode indicator ────────── */
function OfflineSpotlight() {
  return (
    <ScreenFrame>
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <circle cx="40" cy="38" r="6" fill="#F59E0B" />
      <text x="52" y="42" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">OFFLINE MODE ACTIVE</text>
      <text x="370" y="42" fill="#555577" fontSize="8" fontFamily="monospace">Sync pending: 3</text>
      {/* Offline data syncing visual */}
      {[
        { label: 'Bills generated', value: '14', color: '#FF6B35', w: 320 },
        { label: 'KOTs sent to kitchen', value: '27', color: '#0F9D8C', w: 360 },
        { label: 'Payments collected', value: '₹12,480', color: '#A78BFA', w: 280 },
      ].map(({ label, value, color, w }, i) => (
        <g key={label}>
          <text x="36" y={85 + i * 55} fill="#aaaacc" fontSize="9" fontFamily="monospace">{label}</text>
          <text x="440" y={85 + i * 55} fill={color} fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="end">{value}</text>
          <rect x="36" y={92 + i * 55} width="400" height="8" rx="4" fill="#1e1e35" />
          <rect x="36" y={92 + i * 55} width={w} height="8" rx="4" fill={color} opacity="0.7" />
        </g>
      ))}
      {/* Reconnect banner */}
      <rect x="36" y="218" width="400" height="40" rx="10" fill="#F59E0B15" stroke="#F59E0B" strokeWidth="1" />
      <text x="60" y="242" fill="#F59E0B" fontSize="9" fontFamily="monospace">⚡ Internet restored — syncing 3 transactions to cloud...</text>
      {/* Sync animation bar */}
      <rect x="36" y="268" width="400" height="6" rx="3" fill="#1e1e35" />
      <rect x="36" y="268" width="260" height="6" rx="3" fill="#FF6B35" opacity="0.8" />
      <text x="36" y="284" fill="#555577" fontSize="7" fontFamily="monospace">Uploading... 65%</text>
    </ScreenFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'Billing & POS',
  title: 'Bill faster than your',
  titleAccent: 'busiest rush hour',
  subtitle:
    'A complete cloud-based billing and POS solution for restaurants. Works offline, handles GST automatically, routes kitchen tickets instantly, and goes live in under a day.',
  illustration: <BillingIllustration />,
  stats: [
    { value: '10,000+', label: 'Restaurants served' },
    { value: '1M+', label: 'Bills processed daily' },
    { value: '<30 sec', label: 'Average bill generation' },
  ],
  features: [
    { icon: Receipt, title: 'Branded Bill Templates', desc: 'Fully editable GST-compliant invoice templates with your logo, address, and a custom thank-you message.' },
    { icon: Layers, title: 'Multi-Counter Sync', desc: 'Run multiple billing terminals simultaneously — all synced in real-time to a single dashboard.' },
    { icon: Printer, title: 'Kitchen Ticket Routing', desc: 'Auto-route KOTs to the right station (grill, tandoor, bar) based on item categories.' },
    { icon: UtensilsCrossed, title: 'Table & Floor Management', desc: 'Interactive floor plan with live table status, cover counts, and waiter assignments at a glance.' },
    { icon: Settings, title: 'Tax & Discount Rules', desc: 'Configure GST slabs, CGST/SGST splits, happy-hour pricing, and combo discount rules effortlessly.' },
    { icon: Shield, title: 'Role-Based Access', desc: 'Restrict bill voids, discounts, and settlements to authorised staff only — eliminating billing fraud.' },
  ],
  steps: [
    { num: '1', title: 'Select table or counter', desc: 'Cashier or waiter picks the table or opens a new counter bill on any device.' },
    { num: '2', title: 'Add items to bill', desc: 'Browse menu by category, add items with modifiers, and set quantities in seconds.' },
    { num: '3', title: 'KOT fires to kitchen', desc: 'Kitchen Order Ticket routes instantly to the correct kitchen station or display.' },
    { num: '4', title: 'Settle & print', desc: 'Accept cash, card, UPI or split payments, print the GST invoice, and send an SMS receipt.' },
  ],
  spotlightHeadline: 'Works perfectly — even without internet',
  spotlightDesc:
    'Power cuts and connectivity issues are common in restaurants. e-Smart Billing runs fully offline so your business never stops. Every bill, KOT, and payment is stored locally and synced to the cloud the moment connectivity returns.',
  spotlightBullets: [
    'Full offline billing with receipt printing on local printers',
    'Kitchen tickets continue to fire to KDS even with no internet',
    'Automatic cloud sync the instant connection is restored',
    'No data loss — every transaction is encrypted and stored locally',
    'Hardware-agnostic: Windows PC, Android tablet, iPad — any device',
  ],
  spotlightVisual: <OfflineSpotlight />,
  segments: [
    { icon: Store, type: 'Fine Dining', desc: 'Table management, course-by-course KOT, branded invoices, and split-bill support.' },
    { icon: Coffee, type: 'Cafés & QSR', desc: 'Lightning-fast counter billing with touch-optimised UI for high-volume service.' },
    { icon: Truck, type: 'Cloud Kitchens', desc: 'Multi-brand billing from a single screen with per-brand financial separation.' },
  ],
  faqs: [
    { q: 'How long does it take to go live?', a: 'Most restaurants complete setup and training in under 24 hours. Our onboarding team handles menu upload, hardware pairing, and staff walkthrough.' },
    { q: 'Does it support GST split (CGST / SGST)?', a: 'Yes. You can configure any GST structure — 5%, 12%, 18%, or mixed slabs — and e-Smart will automatically split CGST/SGST on every invoice.' },
    { q: 'Can I use my existing printer and hardware?', a: 'Absolutely. e-Smart works with any ESC/POS thermal printer, any Windows PC, Android tablet, or iPad. No proprietary hardware required.' },
    { q: 'What happens to data if the internet goes down?', a: 'Billing, printing, and KOT operations continue offline without interruption. All data syncs securely to the cloud once connectivity is restored.' },
    { q: 'Can one cashier handle multiple tables simultaneously?', a: 'Yes. A single billing terminal can manage unlimited open tables or counters in parallel — switching between them with one tap.' },
  ],
  ctaHeadline: 'Ready to speed up every bill?',
  ctaSubtext: 'Join 10,000+ restaurants already billing smarter with e-Smart Restaurant.',
};

export default function BillingPOS() {
  return <ProductTemplate config={config} />;
}
