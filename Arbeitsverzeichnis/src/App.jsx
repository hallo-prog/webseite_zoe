import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout';
import { lazyRetry } from './utils/lazyRetry';

// Use HomeV4 as the single source of truth for the homepage
const Home = lazy(() => lazyRetry(() => import('./pages/HomeV4')));

// Code-Splitting for other pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact_new')); // Using the new contact page
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Technology = lazy(() => import('./pages/Technology'));
const Projects = lazy(() => import('./pages/Projects'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Financing = lazy(() => import('./pages/Financing'));
const Service = lazy(() => import('./pages/Service'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Guide = lazy(() => import('./pages/Guide'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Deals = lazy(() => import('./pages/Deals'));
const Imprint = lazy(() => import('./pages/Imprint'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Faq = lazy(() => import('./pages/Faq'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
import { PersonaProvider } from '@/context/PersonaContext';
import { track } from '@/utils/tracking';

export default function App() {
  // eslint-disable-next-line no-console
  console.debug('[App] render');
  useEffect(()=>{
    try {
      if (!localStorage.getItem('design_migration_complete')) {
        track('design_migration_complete', { version: 'v3.2', ts: Date.now() });
        localStorage.setItem('design_migration_complete','1');
      }
    } catch {}
  },[]);
  return (
    <PersonaProvider>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<div className="w-full py-24 text-center text-gray-500">Lädt…</div>}>
            <Routes>
              {/* Simplified routing: HomeV4 is now the default */}
              <Route path="/" element={<Home />} />
              <Route path="/warum-zoe" element={<WhyUs />} />
              <Route path="/technologie" element={<Technology />} />
              <Route path="/projekte" element={<Projects />} />
              <Route path="/ueber-uns" element={<About />} />
              <Route path="/preise-kosten" element={<Pricing />} />
              <Route path="/finanzierung-foerderung" element={<Financing />} />
              <Route path="/service" element={<Service />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/erfolgsgeschichten" element={<SuccessStories />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/rechner" element={<Calculator />} />
              <Route path="/angebote" element={<Deals />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/impressum" element={<Imprint />} />
              <Route path="/datenschutz" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </PersonaProvider>
  );
}

// Simple ErrorBoundary to prevent white screen on runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { /* eslint-disable no-console */ console.error('App Crash:', error, info); }
  render() {
    if (this.state.error) {
      return <div className="max-w-xl mx-auto mt-20 p-6 border border-red-300 bg-red-50 rounded-xl text-red-800">Ein Fehler ist aufgetreten: {String(this.state.error.message || this.state.error)}</div>;
    }
    return this.props.children;
  }
}
