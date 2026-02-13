
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Play, ShieldCheck, Video as VideoIcon, Activity, X, Volume2, VolumeX, Shield, Info, AlertTriangle, ArrowLeft, Brain, BookOpen, Quote, Tv, Sparkles } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import AIImageGenerator from '../components/AIImageGenerator';

const RotatingMessage = ({ messages }: { messages: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % messages.length), 5000);
    return () => clearInterval(timer);
  }, [messages]);
  if (!messages || messages.length === 0) return null;
  return (
    <div className="h-24 md:h-32 flex items-center justify-center lg:justify-end">
      <p className="quran-font text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-500 animate-in fade-in slide-in-from-bottom-4 duration-1000 text-center lg:text-right italic">
        {messages[index]}
      </p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { t } = useContent();
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const hero = t?.hero || {};
  const jv = t?.justiceVoices || { items: [] };
  const fs = t?.featuredSeries || {};

  return (
    <div className="text-right font-cairo bg-[#050505] selection:bg-yellow-500/30 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5 px-4 pt-20">
        <div className="absolute inset-0 z-0">
          <AIImageGenerator prompt="dignity strength fatherhood" />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="space-y-6 md:space-y-10 text-center lg:text-right">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-900/20 text-yellow-500 text-[10px] font-black border border-yellow-500/20 backdrop-blur-xl mx-auto lg:mx-0 uppercase tracking-widest">
              <ShieldCheck size={14} /> {hero.badge}
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-tight tracking-tighter">
                {hero.title} <br />
                <span className="text-gradient-gold italic">{hero.titleSpan}</span>
              </h1>
              <RotatingMessage messages={hero.messages || []} />
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                {hero.desc}
              </p>
            </div>

            <div className="flex flex-col sm:row gap-6 justify-center lg:justify-start pt-10">
              <Link to="/legal-action" className="px-12 py-6 bg-yellow-500 text-black rounded-full font-black text-2xl hover:scale-105 transition-all shadow-4xl shadow-yellow-500/20">
                {hero.ctaJoin}
              </Link>
              <Link to="/cinema" className="flex items-center gap-4 text-white font-black text-xl hover:text-yellow-500 transition-colors">
                <Play fill="currentColor" size={24} /> {hero.ctaWatch}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
             <ThreeDCard>
                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-yellow-500/10 bg-zinc-900">
                   <AIImageGenerator prompt="father son sunset islamic style" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-12 flex flex-col justify-end">
                      <div className="p-10 glass-effect rounded-[3rem] space-y-4 border border-yellow-500/20">
                         <h3 className="text-3xl font-black text-white quran-font">«وَاصْبِرْ نَفْسَكَ»</h3>
                         <p className="text-zinc-400 font-bold text-lg">الأبوة أمانةٌ سيحاسبنا الله عليها يوم القيامة.</p>
                      </div>
                   </div>
                </div>
             </ThreeDCard>
          </div>
        </div>
      </section>

      {/* Featured Series Promo - أب ولكن */}
      <section className="py-20 md:py-40 px-4 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-10 text-center lg:text-right">
             <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-900 rounded-full border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest">
                <Tv size={16} /> عرض درامي خاص
             </div>
             <h2 className="text-5xl md:text-8xl font-black text-white">
                {fs.title} <br />
                <span className="text-gradient-gold text-3xl md:text-5xl">{fs.subtitle}</span>
             </h2>
             <p className="quran-font text-3xl md:text-4xl text-yellow-500/80 mb-6">{fs.quranHeader}</p>
             <p className="text-xl text-zinc-400 leading-relaxed font-medium">{fs.desc}</p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="px-10 py-5 bg-yellow-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-600/20"
                >
                  <Play size={24} fill="currentColor" /> {fs.promoCta}
                </button>
                <Link to="/cinema" className="px-10 py-5 bg-zinc-900 border border-zinc-800 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:border-yellow-500 transition-all">
                  <Sparkles size={24} className="text-yellow-500" /> {fs.detailsCta}
                </Link>
             </div>
          </div>
          <div className="order-1 lg:order-2">
             <ThreeDCard>
                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 group cursor-pointer" onClick={() => setShowVideo(true)}>
                   <AIImageGenerator prompt="dramatic father struggle shadows" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
                         <Play size={40} fill="currentColor" />
                      </div>
                   </div>
                   <div className="absolute bottom-6 right-6 px-6 py-2 bg-yellow-500 text-black font-black text-xs rounded-full shadow-2xl">
                      برومو «أب ولكن» 2025
                   </div>
                </div>
             </ThreeDCard>
          </div>
        </div>
      </section>

      {/* Justice Voices - صرخات الحق (النمط الإسلامي) */}
      <section className="py-20 md:py-40 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-8">
            <h2 className="text-5xl md:text-8xl font-black text-white">{jv.title}</h2>
            <p className="quran-font text-2xl md:text-3xl text-zinc-500 max-w-4xl mx-auto italic">«إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ»</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {jv.items.map((item: any) => (
              <ThreeDCard key={item.id}>
                <div className="p-12 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-[3.5rem] space-y-10 h-full flex flex-col justify-between group hover:border-yellow-500/30 transition-all">
                  <div className="flex justify-between items-start">
                    <LucideIcons.Quote className="text-yellow-600 opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
                    <span className="px-5 py-1.5 bg-yellow-600/10 text-yellow-600 text-[10px] font-black rounded-full border border-yellow-600/20 uppercase tracking-widest">{item.category}</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed quran-font">{item.text}</p>
                  <div className="flex items-center gap-4 text-zinc-500 text-sm font-black pt-6 border-t border-zinc-800/50">
                    <LucideIcons.Award size={18} className="text-yellow-600" /> ميزان القسط - 2025
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 md:py-40 px-4 max-w-7xl mx-auto space-y-24">
        <h2 className="text-5xl md:text-7xl font-black text-white text-center">أركان <span className="text-yellow-500">منهاجنا</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: "الميثاق الغليظ", path: "/mithaq", icon: LucideIcons.Scale, color: "text-yellow-500" },
             { title: "مرصد المظالم", path: "/dashboard", icon: LucideIcons.Zap, color: "text-red-500" },
             { title: "البرهان الشرعي", path: "/research", icon: LucideIcons.Award, color: "text-emerald-500" },
             { title: "الميدان", path: "/campaigns", icon: LucideIcons.Users, color: "text-blue-500" }
           ].map((item, i) => (
             <ThreeDCard key={i}>
               <Link to={item.path} className="block p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem] space-y-8 hover:border-yellow-500/20 transition-all">
                 <item.icon className={item.color} size={48} />
                 <h3 className="text-3xl font-black text-white">{item.title}</h3>
                 <p className="text-zinc-500 text-lg font-bold">لِيَقُومَ النَّاسُ بِالْقِسْطِ.</p>
               </Link>
             </ThreeDCard>
           ))}
        </div>
      </section>

      {/* Video Modal Player */}
      {showVideo && (
        <div className="fixed inset-0 z-[700] bg-black/95 flex items-center justify-center p-6 backdrop-blur-3xl">
           <button onClick={() => setShowVideo(false)} className="absolute top-10 left-10 text-white p-4 hover:bg-zinc-800 rounded-full transition-colors z-[710]">
              <X size={40} />
           </button>
           <div className="w-full max-w-6xl">
              <ThreeDCard>
                <div className="aspect-video rounded-[3rem] overflow-hidden border border-zinc-800 shadow-[0_0_100px_rgba(220,38,38,0.2)] bg-black group relative">
                  <iframe 
                    className="w-full h-full border-0"
                    src={`https://www.youtube.com/embed/sample_aw_promo?autoplay=1&rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Promo Ab Walaken"
                  ></iframe>
                </div>
              </ThreeDCard>
              <div className="mt-8 text-center text-white">
                 <h3 className="text-3xl font-black mb-2">{fs.title}</h3>
                 <p className="text-zinc-500 font-bold">{fs.subtitle}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
