import React from 'react';
import {
  Heart, Star, MessageCircle, Gift, TrendingUp, Users,
  Store, Coffee, Layers
} from 'lucide-react';
import ProductTemplate, { ScreenFrame, PhoneFrame, type ProductPageConfig } from './ProductTemplate';

/* ── Hero Illustration: Loyalty Dashboard ────────────── */
function CRMIllustration() {
  const customers = [
    { name: 'Rohit Sharma', visits: 24, points: 1240, tier: 'Gold', color: '#F59E0B' },
    { name: 'Priya Desai', visits: 18, points: 890, tier: 'Silver', color: '#94A3B8' },
    { name: 'Amit Patel', visits: 9, points: 420, tier: 'Bronze', color: '#CD7C2F' },
    { name: 'Nisha Joshi', visits: 4, points: 180, tier: 'New', color: '#0F9D8C' },
  ];

  return (
    <ScreenFrame>
      {/* Header */}
      <rect x="22" y="22" width="436" height="32" rx="8" fill="#1e1e35" />
      <text x="36" y="41" fill="#FF6B35" fontSize="10" fontWeight="bold" fontFamily="monospace">CRM &amp; Loyalty</text>
      <rect x="380" y="29" width="66" height="18" rx="5" fill="#0F9D8C" />
      <text x="413" y="41" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle">+ Add Campaign</text>

      {/* KPIs */}
      {[
        { label: 'Total Customers', value: '1,847', color: '#FF6B35' },
        { label: 'Repeat Visitors', value: '68%', color: '#0F9D8C' },
        { label: 'Points Redeemed', value: '₹12,400', color: '#A78BFA' },
      ].map(({ label, value, color }, i) => (
        <g key={label}>
          <rect x={22 + i * 148} y={60} width={140} height={48} rx={6} fill="#0f0f2a" />
          <text x={22 + i * 148 + 12} y={76} fill="#8888aa" fontSize="7" fontFamily="monospace">{label}</text>
          <text x={22 + i * 148 + 12} y={98} fill={color} fontSize="13" fontWeight="bold" fontFamily="monospace">{value}</text>
        </g>
      ))}

      {/* Customer table */}
      <text x="36" y="124" fill="#555577" fontSize="7.5" fontFamily="monospace">CUSTOMER  ·  VISITS  ·  POINTS  ·  TIER</text>
      {customers.map(({ name, visits, points, tier, color }, i) => (
        <g key={name}>
          <rect x="22" y={132 + i * 36} width="436" height="30" rx="5" fill={i % 2 === 0 ? '#0f0f2a' : '#0a0a1a'} />
          <circle cx="40" cy={147 + i * 36} r="10" fill={`${color}25`} />
          <text x="40" y={151 + i * 36} fill={color} fontSize="8" fontFamily="monospace" textAnchor="middle">{name.charAt(0)}</text>
          <text x="58" y={150 + i * 36} fill="#ccccee" fontSize="8.5" fontFamily="monospace">{name}</text>
          <text x="200" y={150 + i * 36} fill="#aaaacc" fontSize="8" fontFamily="monospace">{visits} visits</text>
          <text x="290" y={150 + i * 36} fill="#FF6B35" fontSize="8" fontWeight="bold" fontFamily="monospace">{points} pts</text>
          <rect x="380" y={138 + i * 36} width={tier.length * 6 + 10} height="16" rx="4" fill={`${color}20`} stroke={color} strokeWidth="0.8" />
          <text x={385 + (tier.length * 6 + 10) / 2} y={150 + i * 36} fill={color} fontSize="7" fontFamily="monospace" textAnchor="middle">{tier}</text>
        </g>
      ))}

      {/* Campaign banner */}
      <rect x="22" y="278" width="436" height="14" rx="4" fill="#FF6B3510" />
      <text x="36" y="288" fill="#FF6B35" fontSize="7.5" fontFamily="monospace">📱 Birthday campaign sent to 12 customers this week · 8 redemptions</text>
    </ScreenFrame>
  );
}

/* ── Spotlight: SMS Campaign Builder ─────────────────── */
function CampaignSpotlight() {
  return (
    <PhoneFrame>
      {/* App header */}
      <rect x="16" y="44" width="208" height="36" fill="#1A1A2E" />
      <text x="120" y="58" fill="#FF6B35" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Campaign Builder</text>
      <text x="120" y="70" fill="#555577" fontSize="7" fontFamily="monospace" textAnchor="middle">SMS Marketing</text>

      {/* Campaign type */}
      <text x="24" y="96" fill="#aaaacc" fontSize="7.5" fontFamily="monospace">Campaign Type</text>
      {['Birthday', 'Inactive', 'Promo'].map((t, i) => (
        <g key={t}>
          <rect x={20 + i * 68} y={100} width={62} height={22} rx={6} fill={i === 0 ? '#FF6B35' : '#1e1e35'} />
          <text x={20 + i * 68 + 31} y={114} fill={i === 0 ? 'white' : '#8888aa'} fontSize="7.5" fontFamily="monospace" textAnchor="middle">{t}</text>
        </g>
      ))}

      {/* Audience */}
      <text x="24" y="138" fill="#aaaacc" fontSize="7.5" fontFamily="monospace">Target Audience</text>
      <rect x="20" y="142" width="200" height="22" rx="6" fill="#0f0f2a" stroke="#FF6B35" strokeWidth="1" />
      <text x="30" y="156" fill="#FF6B35" fontSize="8" fontFamily="monospace">Customers with birthday this month</text>

      {/* Message */}
      <text x="24" y="180" fill="#aaaacc" fontSize="7.5" fontFamily="monospace">Message Preview</text>
      <rect x="20" y="184" width="200" height="68" rx="8" fill="#0f0f2a" stroke="#1e1e35" strokeWidth="1" />
      <text x="30" y="198" fill="#ccccee" fontSize="7.5" fontFamily="monospace">🎂 Happy Birthday [Name]!</text>
      <text x="30" y="210" fill="#ccccee" fontSize="7.5" fontFamily="monospace">Visit us this week &amp; enjoy</text>
      <text x="30" y="222" fill="#FF6B35" fontSize="7.5" fontFamily="monospace" fontWeight="bold">20% OFF your entire bill.</text>
      <text x="30" y="234" fill="#ccccee" fontSize="7.5" fontFamily="monospace">Show this SMS at billing.</text>
      <text x="30" y="246" fill="#555577" fontSize="7" fontFamily="monospace">— The Spice Garden</text>

      {/* Stats */}
      <text x="24" y="270" fill="#aaaacc" fontSize="7.5" fontFamily="monospace">This Campaign Reaches</text>
      <text x="24" y="284" fill="#FF6B35" fontSize="16" fontWeight="bold" fontFamily="monospace">12 customers</text>
      <text x="24" y="296" fill="#555577" fontSize="7" fontFamily="monospace">Estimated cost: ₹18</text>

      {/* Send button */}
      <rect x="20" y="308" width="200" height="30" rx="10" fill="#FF6B35" />
      <text x="120" y="326" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">Send Campaign →</text>

      {/* Last result */}
      <rect x="20" y="346" width="200" height="22" rx="6" fill="#0F9D8C15" stroke="#0F9D8C" strokeWidth="0.8" />
      <text x="120" y="360" fill="#0F9D8C" fontSize="7" fontFamily="monospace" textAnchor="middle">Last campaign: 74% redemption rate</text>
    </PhoneFrame>
  );
}

const config: ProductPageConfig = {
  badge: 'CRM & Loyalty',
  title: 'Turn guests into',
  titleAccent: 'loyal regulars.',
  subtitle:
    'Automatically build a customer database, reward repeat visitors with loyalty points, and run targeted SMS campaigns — all without hiring a marketing team.',
  illustration: <CRMIllustration />,
  stats: [
    { value: '68%', label: 'Avg repeat visitor rate for users' },
    { value: '0 effort', label: 'Customer data captured automatically' },
    { value: '₹0', label: 'Third-party aggregator commission' },
  ],
  features: [
    { icon: Users, title: 'Auto Customer Profiles', desc: 'Every customer who pays via phone number gets a profile automatically — no sign-up forms needed.' },
    { icon: Star, title: 'Loyalty Points System', desc: 'Award points per rupee spent. Customers redeem points against future bills — fully automated.' },
    { icon: MessageCircle, title: 'SMS Campaigns', desc: 'Send promotional SMS to segmented customer lists (inactive, top spenders, birthday month) with one click.' },
    { icon: Gift, title: 'Birthday Auto-Rewards', desc: 'Set up birthday discount SMS that sends automatically on each customer\'s birthday — zero manual effort.' },
    { icon: TrendingUp, title: 'Repeat Visit Analytics', desc: 'Track your best customers, visit frequency, average spend, and last visit date across all outlets.' },
    { icon: Heart, title: 'Feedback Collection', desc: 'Auto-send a post-visit feedback request and collect ratings that sync to your performance dashboard.' },
  ],
  steps: [
    { num: '1', title: 'Customer visits & pays', desc: 'When they pay by phone number or UPI, a customer profile is created or updated automatically.' },
    { num: '2', title: 'Points awarded instantly', desc: 'Loyalty points are added to their account with the same bill — the customer sees it on their receipt.' },
    { num: '3', title: 'You run campaigns', desc: 'Segment your customer list and fire targeted SMS campaigns in minutes — no CSV uploads needed.' },
    { num: '4', title: 'Customers redeem & return', desc: 'Customers redeem points or use discount codes at billing — and the cycle continues.' },
  ],
  spotlightHeadline: 'Birthday campaigns that run themselves',
  spotlightDesc:
    'Set up once — and every customer gets a personalised birthday discount SMS automatically on their birthday. No manual list management. No forgotten follow-ups. Just loyal customers walking back in the door.',
  spotlightBullets: [
    'Birthday SMS sent automatically — no manual scheduling',
    'Customise the discount, message, and expiry window',
    'Track redemption rates per campaign in real-time',
    'Target inactive customers (no visit in 30/60/90 days) with win-back offers',
    'All campaigns run over SMS — no app download required from customers',
  ],
  spotlightVisual: <CampaignSpotlight />,
  segments: [
    { icon: Store, type: 'Full-Service Restaurants', desc: 'Build a loyal regular base with points rewards and personalised birthday surprises.' },
    { icon: Coffee, type: 'Cafés', desc: 'Stamp-card loyalty goes digital — customers collect points on every visit automatically.' },
    { icon: Layers, type: 'Multi-Outlet Chains', desc: 'One customer profile, valid across all your outlets. Points earned anywhere, redeemable everywhere.' },
  ],
  faqs: [
    { q: 'Do customers need to download an app to use loyalty?', a: 'No. Loyalty points work entirely over SMS. Customers just share their phone number at billing. No app download required.' },
    { q: 'Can I customise the points-to-rupee conversion rate?', a: 'Yes. You set the earning rate (e.g., 1 point per ₹10 spent) and the redemption value (e.g., 100 points = ₹10 off) — fully configurable.' },
    { q: 'Are campaigns sent via WhatsApp or SMS?', a: 'Currently SMS is the primary channel. WhatsApp Business integration is available on the Growth and Enterprise plans.' },
    { q: 'Can points be used across multiple outlets?', a: 'Yes. With multi-outlet plans, customers earn points at any of your outlets and can redeem them at any location.' },
  ],
  ctaHeadline: 'Start building loyalty from day one',
  ctaSubtext: 'Automatic points, zero commission, and customers who keep coming back.',
};

export default function CRMLoyalty() {
  return <ProductTemplate config={config} />;
}
