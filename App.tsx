
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, Sparkles, Map as MapIcon, BookOpen, BarChart3, Rocket, 
  FileText, Users, Film, ThumbsUp, MessageCircle, PieChart, 
  Menu, X, Scale, Info, Shield, MoreHorizontal, ChevronLeft,
  LayoutGrid, Settings, HelpCircle, ArrowUp, Zap, ChevronDown, 
  Target, Fingerprint
} from 'lucide-react';
import HomePage from './pages/HomePage';
import WhyChangePage from './pages/WhyChangePage';
import LegalActionPage from './pages/LegalActionPage';
import DashboardPage from './pages/DashboardPage';
import StoriesPage from './pages/StoriesPage';
import SupportPage from './pages/SupportPage';
import CinemaPage from './pages/CinemaPage';
import PollsPage from './pages/PollsPage';
import MithaqCharterPage from './pages/MithaqCharterPage';
import SWOTAnalysisPage from './pages/SWOTAnalysisPage';
import ReformMapPage from './pages/ReformMapPage';
import ResearchPage from './pages/ResearchPage';
import CampaignsPage from './pages/CampaignsPage';
import PetitionPage from './pages/PetitionPage';
import StoryDetailPage from './pages/StoryDetailPage';
import AboutPage from './pages/AboutPage';
import AnisBot from './components/AnisBot';
import { defaultTranslations } from './translations';

const ContentContext = createContext<any>(undefined);
export const useContent = () => useContext(ContentContext);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const { t } = useContent();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: t.nav.home, path: '/', icon: Home },
    { label: t.nav.mithaq, path: '/mithaq', icon: Sparkles },
    { label: t.nav.reformMap, path: '/reform-map', icon: MapIcon },
    { label: t.nav.research, path: '/research', icon: BookOpen },
    { label: t.nav.dashboard, path: '/dashboard', icon: BarChart3 },
    { label: t.nav.campaigns, path: '/campaigns', icon: Rocket },
    { label: t.nav.legalAction, path: '/legal-action', icon: FileText },
    { label: t.nav.stories, path: '/stories', icon: Users },
    { label: t.nav.cinema, path: '/cinema', icon: Film },
    { label: t.nav.polls, path: '/polls', icon: ThumbsUp },
    { label: t.nav.support, path: '/support', icon: MessageCircle },
    { label: t.nav.swot, path: '/swot', icon: PieChart },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollY / totalScroll) * 100);
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* 
          SOVEREIGN HEADER (Desktop & Mobile) 
          الموقع الآن موحد في القمة لضمان سهولة الاستخدام
      */}
      <header className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 px-4 py-4 md:px-8 md:py-6 ${isScrolled ? 'translate-y-0' : 'translate-y-0'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between glass-effect rounded-[2.5rem] px-6 py-3 md:px-10 md:py-4 border transition-all duration-500 ${
          isScrolled 
          ? 'border-yellow-500/40 bg-black/95 shadow-[0_20px_60px_rgba(0,0,0,0.9)] scale-[0.98]' 
          : 'border-white/10 bg-black/40 shadow-2xl'
        }`}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-800 rounded-2xl flex items-center justify-center text-yellow-500 shadow-xl group-hover:rotate-[360deg] transition-all duration-700">
              <Scale size={24} className="md:w-8 md:h-8" />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-black text-white text-xl md:text-3xl tracking-tighter uppercase">{t.global.siteName}</span>
              <span className="text-[8px] md:text-[10px] font-black text-yellow-500/80 uppercase tracking-[0.2em] mt-0.5">Sovereign Initiative 2025</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 6).map((item) => (
              <Link key={item.path} to={item.path} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${location.pathname === item.path ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg' : 'text-zinc-400 hover:text-white border-transparent hover:bg-white/5'}`}>
                {item.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <button onClick={() => setIsMenuOpen(true)} className="p-3 bg-white/5 rounded-xl text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
              <LayoutGrid size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-500 shadow-xl active:scale-90 transition-all"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Scroll Progress Bar (Subtle) */}
        <div className="max-w-7xl mx-auto px-10 mt-2">
           <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-yellow-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
           </div>
        </div>
      </header>

      {/* Full-Screen Sovereign Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[10000] bg-black/98 backdrop-blur-[80px] transition-all duration-700 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col pt-32 pb-20 px-6 overflow-y-auto no-scrollbar">
          <div className="max-w-4xl mx-auto w-full space-y-12">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-emerald-800 rounded-[2.5rem] flex items-center justify-center text-yellow-500 mx-auto shadow-4xl mb-6">
                <LayoutGrid size={48} />
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">بوابة السيادة</h2>
              <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {navItems.map((item, idx) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all active:scale-95 group ${
                    location.pathname === item.path 
                    ? 'bg-yellow-500 text-black border-yellow-500 shadow-2xl' 
                    : 'bg-white/5 text-zinc-400 border-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-2xl ${
                     location.pathname === item.path ? 'bg-black/10' : 'bg-black/40 text-yellow-500'
                   }`}>
                     <item.icon size={26} />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xl font-black">{item.label}</span>
                     <span className="text-[8px] font-bold uppercase opacity-50 tracking-widest mt-1">Sovereign Access</span>
                   </div>
                </Link>
              ))}
            </div>

            {/* Menu Footer Boundary */}
            <div className="pt-20 border-t border-white/5 flex flex-col items-center gap-8">
               <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-600 border border-white/5"><Info size={20} /></div>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-600 border border-white/5"><Shield size={20} /></div>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-600 border border-white/5"><Settings size={20} /></div>
               </div>
               <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em]">الإصدار 3.2.0 - 2025</p>
               <button onClick={() => setIsMenuOpen(false)} className="px-10 py-4 bg-red-600 text-white rounded-full font-black text-xl shadow-4xl hover:bg-red-700 transition-all">إغلاق القائمة</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const App: React.FC = () => {
  const content = defaultTranslations.ar;
  
  return (
    <ContentContext.Provider value={{ t: content }}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-black selection:bg-yellow-500/30">
          <Navbar />
          <AnisBot />
          
          {/* 
              MAIN CONTENT CONTAINER 
              تم تصحيح الأبعاد لضمان ظهور المحتوى تماماً تحت القائمة العلوية
          */}
          <main className="flex-1 pt-32 md:pt-44 pb-20 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/mithaq" element={<MithaqCharterPage />} />
              <Route path="/reform-map" element={<ReformMapPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/why" element={<WhyChangePage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/legal-action" element={<LegalActionPage />} />
              <Route path="/petition" element={<PetitionPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/stories/:id" element={<StoryDetailPage />} />
              <Route path="/cinema" element={<CinemaPage />} />
              <Route path="/polls" element={<PollsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/swot" element={<SWOTAnalysisPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="bg-zinc-950 border-t border-yellow-500/10 py-24 lg:py-40 px-6 text-right relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 relative z-10">
              <div className="space-y-8 text-center md:text-right">
                <h4 className="text-4xl lg:text-8xl font-black text-white tracking-tighter leading-none">{content.global.siteName}</h4>
                <p className="text-zinc-500 max-w-2xl font-medium text-sm lg:text-xl leading-relaxed">{content.global.footerDesc}</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-8">
                 <div className="flex gap-6">
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-400 hover:text-yellow-500 cursor-pointer transition-colors shadow-4xl"><Info size={26} /></div>
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl border border-white/5 flex items-center justify-center text-zinc-400 hover:text-yellow-500 cursor-pointer transition-colors shadow-4xl"><Shield size={26} /></div>
                 </div>
                 <p className="text-zinc-700 text-[11px] font-black uppercase tracking-[0.5em]">{content.global.copyright}</p>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </ContentContext.Provider>
  );
};

export default App;
