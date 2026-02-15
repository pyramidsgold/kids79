
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { 
  Play, ShieldCheck, Video as VideoIcon, Activity, X, Volume2, 
  VolumeX, Shield, Info, AlertTriangle, ArrowLeft, Brain, 
  BookOpen, Quote, Hash, User, Scale, Users, HelpCircle, Award
} from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import { imageDatabase } from '../imageDatabase';

const RotatingMessage = ({ messages }: { messages: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % messages.length), 4000);
    return () => clearInterval(timer);
  }, [messages]);
  if (!messages || messages.length === 0) return null;
  return (
    <div className="h-20 md:h-32 flex items-center justify-center lg:justify-start overflow-hidden">
      <p className="text-xl sm:text-3xl md:text-5xl font-black text-red-600 animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-tight">
        "{messages[index]}"
      </p>
    </div>
  );
};

const HashtagBanner = ({ tags }: { tags: string[] }) => {
  return (
    <div className="w-full bg-zinc-950/90 backdrop-blur-xl border-y border-white/5 py-3 md:py-4 overflow-hidden relative z-50">
      <div className="flex gap-8 md:gap-12 hashtag-scroll items-center">
        {[...tags, ...tags, ...tags].map((tag, i) => (
          <span key={i} className="text-sm md:text-xl font-black text-zinc-500 hover:text-red-500 transition-colors cursor-default flex items-center gap-2">
            <Hash size={16} className="text-red-600" /> {tag.replace('#', '')}
          </span>
        ))}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { t } = useContent();
  const [showVideo, setShowVideo] = useState(false);
  
  const hero = t?.hero || {};
  const founder = t?.founder || {};

  const getIcon = (type: string) => {
    const IconComp = (LucideIcons as any)[type] || Info;
    return <IconComp size={window.innerWidth < 768 ? 24 : 40} />;
  };

  return (
    <div className="space-y-20 md:space-y-40 pb-24 text-right overflow-hidden bg-black relative">
      {/* Background Video Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
          src={imageDatabase.bgVideo1}
        />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={imageDatabase.sovereignBg} 
          className="w-full h-full object-cover opacity-20 lg:opacity-30 mix-blend-screen grayscale"
          alt="Sovereign Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      {/* Hashtag Banner */}
      <HashtagBanner tags={t.global.hashtags} />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center min-h-[80vh] md:min-h-[90vh] z-10">
        <div className="absolute -top-40 -right-40 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-red-600/5 rounded-full blur-[100px] md:blur-[200px] pointer-events-none"></div>
        
        <div className="space-y-6 md:space-y-12 order-2 lg:order-1 relative z-10 text-center lg:text-right">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-red-600/10 text-red-500 text-[10px] md:text-sm font-black border border-red-600/20 shadow-2xl animate-pulse mx-auto lg:mx-0">
            <ShieldCheck size={14} /> {hero.badge}
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter">
            أب ولكن.. <br />
            <span className="text-gradient-red italic">الاب المجهول</span>
          </h1>

          <RotatingMessage messages={t?.messages?.psych || []} />

          <p className="text-lg md:text-2xl text-zinc-400 max-w-xl leading-relaxed font-medium mx-auto lg:mx-0">
            مبادرة ميثاق لمواجهة ظاهرة الاستلاب الوالدي وحماية جيل كامل من الضياع خلف أروقة مراكز الرؤية المهينة.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 pt-4 md:pt-8 justify-center lg:justify-start">
            <Link to="/legal-action" className="group px-8 md:px-14 py-4 md:py-6 bg-red-600 text-white rounded-2xl md:rounded-[2.5rem] font-black shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] text-center text-xl md:text-2xl hover:scale-105 active:scale-95 transition-all relative overflow-hidden">
              <span className="relative z-10">{hero.ctaJoin}</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            
            <Link to="/why" className="px-8 md:px-14 py-4 md:py-6 bg-zinc-900 border border-zinc-800 text-yellow-500 rounded-2xl md:rounded-[2.5rem] font-black text-xl md:text-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-2xl">
              <HelpCircle size={24} /> لماذا ميثاق؟
            </Link>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 px-4 md:px-0">
          <ThreeDCard>
            <div 
              onClick={() => setShowVideo(true)}
              className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] border-2 border-zinc-800/50 aspect-[4/5] group cursor-pointer bg-zinc-950"
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                src={imageDatabase.bgVideo2}
              />
              <img 
                src={imageDatabase.interfaceImage} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:opacity-60 transition-all" 
                alt="Main Interface" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-6 md:p-12 flex flex-col justify-end">
                 <div className="flex items-center gap-4 md:gap-8 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-4xl group-hover:scale-110 transition-all">
                      <Play fill="currentColor" size={window.innerWidth < 768 ? 20 : 32} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2">فيلم: أب ولكن</h3>
                      <p className="text-zinc-400 font-bold text-sm md:text-lg">وثائقي عن جيل يتيم بقرار تشريعي</p>
                    </div>
                 </div>
              </div>
              <div className="absolute inset-0 shimmer pointer-events-none opacity-50"></div>
            </div>
          </ThreeDCard>
        </div>
      </section>

      {/* Founder Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 z-10">
        <ThreeDCard>
          <div className="bg-zinc-900/80 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 border border-zinc-800 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5 text-red-600"><Award size={300} /></div>
             
             <div className="lg:col-span-1 flex flex-col items-center lg:items-end text-center lg:text-right space-y-6 relative z-10">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] overflow-hidden border-4 border-red-600/30 shadow-5xl mb-4 group">
                   <img src={imageDatabase.mainHeroImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Dr. Ashraf Tamam" />
                </div>
                <div>
                   <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{founder.name}</h3>
                   <p className="text-red-600 font-black text-sm md:text-lg uppercase tracking-widest mt-2">{founder.title}</p>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-white/5">
                   <p className="text-zinc-500 text-[10px] md:text-xs font-bold leading-relaxed">{founder.position}</p>
                </div>
             </div>

             <div className="lg:col-span-2 space-y-8 relative z-10 text-center lg:text-right border-r-0 lg:border-r-4 border-red-600 pr-0 lg:pr-12">
                <div className="flex justify-center lg:justify-start"><Quote size={64} className="text-red-600 opacity-20" /></div>
                <p className="text-2xl md:text-4xl font-black text-white leading-tight italic">
                  "{founder.quote}"
                </p>
                <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed">
                  {founder.bio}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                   <Link to="/about" className="px-10 py-4 bg-zinc-800 text-white rounded-2xl font-black text-lg hover:bg-zinc-700 transition-all flex items-center gap-3 justify-center">
                      <BookOpen size={20} /> اقرأ السيرة كاملة
                   </Link>
                   <Link to="/research" className="px-10 py-4 border border-zinc-800 text-zinc-400 rounded-2xl font-black text-lg hover:text-white hover:border-red-600 transition-all flex items-center gap-3 justify-center">
                      <Scale size={20} /> البرهان الإحصائي 2025
                   </Link>
                </div>
             </div>
          </div>
        </ThreeDCard>
      </section>

      {/* Campaign Highlights */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center z-10">
        <div className="space-y-6 md:space-y-10 text-center lg:text-right">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 text-emerald-500 text-[10px] md:text-xs font-black border border-emerald-600/20 mx-auto lg:mx-0">
              <Hash size={14} /> جيل_منبوذ
           </div>
           <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
             الولاية حق <br /> <span className="text-emerald-500">وليست منحة</span>
           </h2>
           <p className="text-lg md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
             جيل يتيم رغم وجود الأب.. نحن هنا لنصحح المسار ونعيد للطفل حقه في تربية والده وقوامته الفطرية.
           </p>
           <div className="bg-zinc-900/50 backdrop-blur-xl p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-zinc-800 space-y-6 md:space-y-8 shadow-4xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-red-600"><AlertTriangle size={150} /></div>
              <h3 className="text-xl md:text-3xl font-black text-red-600 flex items-center gap-4 relative z-10 justify-center lg:justify-start">
                <AlertTriangle size={window.innerWidth < 768 ? 20 : 32} /> ناقوس خطر جيل منبوذ
              </h3>
              <ul className="space-y-4 md:space-y-6 relative z-10 text-zinc-400 font-bold text-base md:text-xl text-right">
                <li className="flex gap-4 items-start">
                   <div className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mt-2 md:mt-3 shrink-0"></div>
                   <span>تحول الأب إلى صراف آلي بلا سلطة تربوية يهدم مفهوم الأسرة.</span>
                </li>
                <li className="flex gap-4 items-start">
                   <div className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full mt-2 md:mt-3 shrink-0"></div>
                   <span>فقدان النموذج القدوة يؤدي لانحراف 80% من الأحداث في المؤسسات العقابية.</span>
                </li>
              </ul>
           </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
           <ThreeDCard className="sm:col-span-2">
              <div className="p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-zinc-800 aspect-[2/1] md:aspect-[2.5/1] relative overflow-hidden group bg-zinc-950">
                <img src={imageDatabase.mainHeroImage} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-1000" />
                <div className="relative z-10 space-y-4 md:space-y-6">
                   <div className="text-red-600"><Scale size={window.innerWidth < 768 ? 28 : 40} /></div>
                   <h3 className="text-xl md:text-3xl font-black text-white">منهاج العدالة 2025</h3>
                   <p className="text-zinc-500 text-xs md:text-sm font-bold">مطالب تشريعية مبنية على البرهان الشرعي والعلمي.</p>
                </div>
              </div>
           </ThreeDCard>
           <ThreeDCard>
              <div className="p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-zinc-800 aspect-square relative overflow-hidden group bg-zinc-950">
                <img src={imageDatabase.storyImage} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-all duration-1000" />
                <div className="relative z-10 space-y-4 md:space-y-6">
                   <div className="text-emerald-500"><ShieldCheck size={window.innerWidth < 768 ? 28 : 40} /></div>
                   <h3 className="text-xl md:text-3xl font-black text-white">حماية الطفل</h3>
                </div>
              </div>
           </ThreeDCard>
           <ThreeDCard>
              <div className="p-6 md:p-10 rounded-3xl md:rounded-[3rem] border border-zinc-800 aspect-square relative overflow-hidden group bg-zinc-950">
                <img src={imageDatabase.emotionalImage} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-all duration-1000" />
                <div className="relative z-10 space-y-4 md:space-y-6">
                   <div className="text-yellow-500"><Users size={window.innerWidth < 768 ? 28 : 40} /></div>
                   <h3 className="text-xl md:text-3xl font-black text-white">الرعاية المشتركة</h3>
                </div>
              </div>
           </ThreeDCard>
        </div>
      </section>

      {/* Deep Emotional Context Section */}
      <section className="bg-zinc-950/80 py-20 md:py-32 border-y border-white/5 relative overflow-hidden px-4">
        <div className="max-w-7xl mx-auto text-center space-y-12 md:space-y-20 relative z-10">
           <h2 className="text-4xl md:text-9xl font-black text-white tracking-tighter">أب ولكن.. <span className="text-red-600">قصة استلاب</span></h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {[
                { label: "#اب_ولكن", desc: "صراف آلي في نظر القوانين، مربي في نظر الفطرة.", icon: User },
                { label: "#الاب_المجهول", desc: "منع الأب من التربية هو تغييب لهوية الطفل.", icon: Hash },
                { label: "#جيل_يتيم", desc: "يتم قسري تفرضه تشريعات مهجورة.", icon: AlertTriangle },
                { label: "#جيل_منبوذ", desc: "طفل ينشأ بلا مرجعية أبوية يسهل انحرافه.", icon: Activity }
              ].map((item, i) => (
                <div key={i} className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-zinc-900 border border-zinc-800 space-y-4 md:space-y-6 hover:border-red-600 transition-all group">
                   <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600/10 rounded-xl md:rounded-2xl flex items-center justify-center text-red-600 mx-auto group-hover:scale-110 transition-transform">
                      <item.icon size={window.innerWidth < 768 ? 24 : 32} />
                   </div>
                   <h3 className="text-xl md:text-2xl font-black text-white">{item.label}</h3>
                   <p className="text-zinc-500 font-bold text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[1000] bg-black/98 flex flex-col items-center justify-center p-4 md:p-6 backdrop-blur-2xl animate-in fade-in duration-500">
           <button onClick={() => setShowVideo(false)} className="absolute top-6 left-6 md:top-10 md:left-10 text-white p-4 md:p-6 hover:bg-zinc-800 rounded-full transition-colors z-[1100] shadow-4xl border border-white/10">
              <X size={32} />
           </button>
           <div className="w-full max-w-7xl aspect-video rounded-2xl md:rounded-[4rem] overflow-hidden border border-zinc-800 shadow-[0_0_150px_rgba(220,38,38,0.3)] bg-black relative">
              <video 
                autoPlay 
                controls
                className="w-full h-full"
                src={imageDatabase.heroVideo}
              />
           </div>
           <div className="mt-8 md:mt-12 text-center space-y-4 md:space-y-6 max-w-4xl px-4">
              <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight">أب ولكن: صرخة القسط</h2>
              <p className="text-lg md:text-2xl text-zinc-400 font-medium italic">توثيق حي لمعاناة جيل يتيم الأبوين رغم وجود الأب.. رحلة البحث عن العدالة.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
