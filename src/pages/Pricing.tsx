import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import CTABand from '../components/CTABand';

const PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 1999,
    annualPrice: 1499,
    tagline: 'Perfect for single-outlet restaurants just getting started.',
    cta: 'Get Started',
    highlight: false,
    features: [
      '1 Billing Counter',
      'Unlimited Bills',
      'GST-Compliant Invoices',
      'Basic Reporting',
      'Kitchen Display (1 Station)',
      'Email Support',
      null,
      null,
      null,
      null,
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: 3999,
    annualPrice: 2999,
    tagline: 'For growing restaurants that need more power and integrations.',
    cta: 'Start Free Trial',
    highlight: true,
    badge: 'Most Popular',
    features: [
      '5 Billing Counters',
      'Unlimited Bills',
      'GST-Compliant Invoices',
      'Advanced Reports & MIS',
      'Kitchen Display (3 Stations)',
      'Priority Phone + Email Support',
      'Inventory Management',
      'CRM & Loyalty Module',
      'Online Ordering (Basic)',
      null,
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 0,
    annualPrice: 0,
    tagline: 'Custom pricing for multi-outlet chains and enterprise groups.',
    cta: 'Contact Sales',
    highlight: false,
    features: [
      'Unlimited Billing Counters',
      'Unlimited Bills',
      'GST-Compliant Invoices',
      'Full Analytics Suite',
      'Unlimited Kitchen Stations',
      'Dedicated Account Manager',
      'Inventory Management',
      'CRM & Loyalty Module',
      'Online Ordering (Full)',
      'Multi-Outlet Dashboard',
    ],
  },
];

const ALL_FEATURES = [
  'Billing Counters',
  'Bills per Month',
  'GST Invoices',
  'MIS Reports',
  'Kitchen Display Stations',
  'Support',
  'Inventory Management',
  'CRM & Loyalty',
  'Online Ordering',
  'Multi-Outlet Dashboard',
];

const COMPARISON = {
  Starter:    ['1', 'Unlimited', '✓', 'Basic', '1', 'Email', '—', '—', '—', '—'],
  Growth:     ['5', 'Unlimited', '✓', 'Advanced', '3', 'Phone + Email', '✓', '✓', 'Basic', '—'],
  Enterprise: ['Unlimited', 'Unlimited', '✓', 'Full Suite', 'Unlimited', 'Dedicated AM', '✓', '✓', 'Full', '✓'],
};

const PRICING_FAQS = [
  { q: 'Is there a long-term contract?', a: 'No. All plans are billed monthly or annually — cancel at any time with no penalties or hidden exit fees.' },
  { q: 'What hardware costs are included?', a: 'The software subscription does not include hardware. However, e-Smart Restaurant works with any existing Windows PC, Android tablet, or iPad. We can recommend affordable hardware bundles if needed.' },
  { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Yes — the Growth plan includes a 14-day free trial, no credit card required. Book a demo and we will set it up for you.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-warm">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-charcoal mb-4 font-sora">Simple, transparent pricing</h1>
        <p className="text-lg text-gray-500 mb-10">No hidden fees. No per-transaction charges. Flat monthly rate — cancel anytime.</p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-2 py-1.5 shadow-sm">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-primary text-white shadow' : 'text-gray-500'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? 'bg-primary text-white shadow' : 'text-gray-500'}`}
          >
            Annual
            <span className="ml-1.5 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">Save 25%</span>
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.highlight
                  ? 'bg-charcoal text-white border-primary shadow-2xl scale-105'
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full shadow">
                  {plan.badge}
                </div>
              )}
              <h2 className={`text-xl font-bold mb-1 font-sora ${plan.highlight ? 'text-white' : 'text-charcoal'}`}>{plan.name}</h2>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.tagline}</p>

              <div className="mb-7">
                {plan.monthlyPrice > 0 ? (
                  <>
                    <span className={`text-4xl font-bold font-sora ${plan.highlight ? 'text-white' : 'text-charcoal'}`}>
                      ₹{annual ? plan.annualPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
                    </span>
                    <span className={`text-sm ml-1 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
                    {annual && (
                      <div className="text-xs text-green-400 mt-1">Billed ₹{(plan.annualPrice * 12).toLocaleString()}/year</div>
                    )}
                  </>
                ) : (
                  <span className={`text-3xl font-bold font-sora ${plan.highlight ? 'text-white' : 'text-charcoal'}`}>Custom</span>
                )}
              </div>

              <a
                href="/contact"
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all mb-8 ${
                  plan.highlight
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'border-2 border-primary text-primary hover:bg-orange-50'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="space-y-3">
                {plan.features.map((f, i) =>
                  f ? (
                    <li key={i} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? 'text-gray-200' : 'text-gray-700'}`}>
                      <Check className="w-4 h-4 text-secondary shrink-0" />
                      {f}
                    </li>
                  ) : (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-400">
                      <X className="w-4 h-4 text-gray-300 shrink-0" />
                      Not included
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 max-w-5xl mx-auto">
        <button
          className="flex items-center gap-2 mx-auto text-primary font-semibold mb-6"
          onClick={() => setTableOpen(!tableOpen)}
        >
          {tableOpen ? 'Hide' : 'View'} full feature comparison
          <ChevronDown className={`w-4 h-4 transition-transform ${tableOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-500 ${tableOpen ? 'max-h-[800px]' : 'max-h-0'}`}>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal text-white">
                  <th className="text-left px-6 py-4 font-semibold">Feature</th>
                  {PLANS.map(p => <th key={p.name} className="px-6 py-4 font-semibold">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {ALL_FEATURES.map((feat, i) => (
                  <tr key={feat} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-3.5 text-gray-700 font-medium">{feat}</td>
                    {['Starter', 'Growth', 'Enterprise'].map(plan => (
                      <td key={plan} className="px-6 py-3.5 text-center text-gray-600">
                        {COMPARISON[plan as keyof typeof COMPARISON][i]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal mb-10 font-sora text-center">Pricing questions answered</h2>
          <div className="space-y-3">
            {PRICING_FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-charcoal text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                  <p className="px-6 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="Not sure which plan is right for you?"
        subtext="Talk to our team — we'll recommend the best fit for your restaurant size and budget."
        ctaLabel="Talk to Sales"
        ctaTo="/contact"
        variant="dark"
      />
    </main>
  );
}
