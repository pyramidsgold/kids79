
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, Sparkles, Map as MapIcon, BookOpen, BarChart3, Rocket, 
  FileText, Users, Film, ThumbsUp, MessageCircle, PieChart, 
  Menu, X, Scale, Info, Shield 
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
import AnisBot from './components/AnisBot';
import { defaultTranslations } from './translations';

const ContentContext = createContext<any>(undefined);
export const useContent = () => useContext(ContentContext);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useContent();
  const location = useLocation();

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
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-4 lg:p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-effect rounded-[2rem] lg:rounded-[3rem] px-6 lg:px-10 py-3 lg:py-4 pointer-events-auto border border-yellow-500/10 shadow-2xl relative">
        <Link to="/" className="flex items-center gap-3 lg:gap-4 group">
          <div className="w-10 h-10 lg:w-14 lg:h-14 bg-emerald-800 rounded-xl lg:rounded-2xl flex items-center justify-center text-yellow-500 shadow-xl group-hover:rotate-[360deg] transition-all duration-1000">
            <Scale size={24} className="lg:scale-125" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-black text-lg lg:text-2xl text-white leading-none tracking-tighter uppercase">{t.global.siteName}</span>
            <span className="text-[8px] lg:text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mt-1">Legislative Reform 2025</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black transition-all border ${
                location.pathname === item.path 
                ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg' 
                : 'text-zinc-400 hover:text-white border-transparent hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden p-3 bg-white/5 text-white rounded-xl border border-white/10"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-4 glass-effect rounded-[2.5rem] p-8 space-y-3 pointer-events-auto animate-in slide-in-from-top-4 overflow-y-auto max-h-[80vh] border border-yellow-500/10">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-5 p-5 rounded-2xl font-black transition-all ${
                location.pathname === item.path 
                ? 'bg-yellow-500 text-black shadow-xl' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={22} /> {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const content = defaultTranslations.ar;
  
  return (
    <ContentContext.Provider value={{ t: content }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <AnisBot />
          <main className="flex-1 pt-24 lg:pt-32">
            <Routes>
              <Route path="/" element={<HomePage />} />
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
          <footer className="bg-zinc-950 border-t border-yellow-500/10 py-16 lg:py-24 px-8 text-right relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
              <div className="space-y-6 text-center md:text-right">
                <h4 className="text-3xl lg:text-5xl font-black text-white tracking-tighter">{content.global.siteName}</h4>
                <p className="text-zinc-500 max-w-lg font-medium leading-relaxed">{content.global.footerDesc}</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-6">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center text-zinc-400 hover:text-yellow-500 cursor-pointer transition-colors"><Info size={20} /></div>
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-white/5 flex items-center justify-center text-zinc-400 hover:text-yellow-500 cursor-pointer transition-colors"><Shield size={20} /></div>
                 </div>
                 <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">{content.global.copyright}</p>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </ContentContext.Provider>
  );
};

export default App;
