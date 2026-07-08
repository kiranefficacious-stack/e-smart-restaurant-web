import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import PlaceholderPage from './pages/PlaceholderPage';
// Product pages
import BillingPOS from './pages/products/BillingPOS';
import Inventory from './pages/products/Inventory';
import OnlineOrdering from './pages/products/OnlineOrdering';
import Reports from './pages/products/Reports';
import MenuManagement from './pages/products/MenuManagement';
import CRMLoyalty from './pages/products/CRMLoyalty';

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Layout wrapper */
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

/* ─── Placeholder route configs ─────────────────────── */
const PLACEHOLDER_ROUTES = [
  // Product sub-pages
  { path: '/product/billing-pos',      title: 'Billing & POS Software',         subtitle: 'The fastest, most reliable billing system for Indian restaurants — works offline, supports GST, and prints KOTs instantly.' },
  { path: '/product/inventory',         title: 'Inventory Management',            subtitle: 'Track raw materials to the gram. Auto-deduct from recipes with every bill generated.' },
  { path: '/product/online-ordering',   title: 'Online Ordering',                 subtitle: 'Accept orders from your own branded website and app — zero commission, full control.' },
  { path: '/product/reports',           title: 'Reports & Analytics',             subtitle: 'Daily MIS, item-wise sales, waiter performance, and trend reports in real-time.' },
  { path: '/product/menu',              title: 'Menu Management',                 subtitle: 'Update prices, add combos, and manage modifiers across all outlets in seconds.' },
  { path: '/product/crm',              title: 'CRM & Loyalty',                   subtitle: 'Auto-reward repeat customers, send birthday offers, and reduce churn with built-in loyalty.' },
  // Solutions
  { path: '/solutions/fine-dine',       title: 'e-Smart for Fine Dining',        subtitle: 'Visual floor plans, cover-count tracking, and multi-course course management for premium dining experiences.' },
  { path: '/solutions/qsr',             title: 'e-Smart for QSR / Fast Food',    subtitle: 'High-speed billing, queue management, and token display systems designed for quick-service restaurants.' },
  { path: '/solutions/cafes',           title: 'e-Smart for Cafés',              subtitle: 'Compact, intuitive POS perfect for café counters — with loyalty, Wi-Fi printing, and fast checkout.' },
  { path: '/solutions/cloud-kitchens',  title: 'e-Smart for Cloud Kitchens',     subtitle: 'Manage multiple virtual brands from a single kitchen dashboard, with per-brand P&L tracking.' },
  { path: '/solutions/bars',            title: 'e-Smart for Bars & Breweries',   subtitle: 'Tab management, bottle tracking, happy-hour pricing rules, and liquor licence compliance support.' },
  { path: '/solutions/bakeries',        title: 'e-Smart for Bakeries',           subtitle: 'Weight-based billing, production planning, and batch tracking for bakeries and sweet shops.' },
  { path: '/solutions/food-courts',     title: 'e-Smart for Food Courts',        subtitle: 'Centralised payment counter with per-stall reporting and unified queue display.' },
  { path: '/solutions/multi-outlet',    title: 'e-Smart for Multi-Outlet Chains', subtitle: 'Unified dashboard, central menu management, and consolidated analytics across all your locations.' },
  // Resources
  { path: '/resources/blog',            title: 'Blog & Insights',                subtitle: 'Tips, guides, and case studies to help you run a more profitable restaurant.' },
  { path: '/resources/guides',          title: 'Guides & Templates',             subtitle: 'Free downloadable resources — daily MIS templates, inventory sheets, and buyer guides.' },
  { path: '/resources/help',            title: 'Help Center & FAQ',              subtitle: 'Step-by-step guides, video tutorials, and answers to the most common questions.' },
  // Legal
  { path: '/privacy',                   title: 'Privacy Policy',                 subtitle: 'How we collect, use, and protect your data.' },
  { path: '/terms',                     title: 'Terms of Service',               subtitle: 'The terms and conditions governing your use of e-Smart Restaurant.' },
  { path: '/refund',                    title: 'Refund Policy',                  subtitle: 'Our refund and cancellation policy for all plans.' },
];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <Pricing />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* ── Product Pages (fully built) ── */}
        <Route path="/product/billing-pos" element={<Layout><BillingPOS /></Layout>} />
        <Route path="/product/inventory" element={<Layout><Inventory /></Layout>} />
        <Route path="/product/online-ordering" element={<Layout><OnlineOrdering /></Layout>} />
        <Route path="/product/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/product/menu" element={<Layout><MenuManagement /></Layout>} />
        <Route path="/product/crm" element={<Layout><CRMLoyalty /></Layout>} />

        {/* All other placeholder routes */}

        {PLACEHOLDER_ROUTES.map(({ path, title, subtitle }) => (
          <React.Fragment key={path}>
            <Route
              path={path}
              element={
                <Layout>
                  <PlaceholderPage title={title} subtitle={subtitle} />
                </Layout>
              }
            />
          </React.Fragment>
        ))}

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <Layout>
              <PlaceholderPage
                title="Page not found"
                subtitle="The page you're looking for doesn't exist. Try navigating from the menu above."
                tag="404"
              />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
