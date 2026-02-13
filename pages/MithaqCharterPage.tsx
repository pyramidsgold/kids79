
import React from 'react';
import { Shield, Target, Gavel, Scale, Heart, Users, ArrowDownRight, Sparkles, Book, Flag, Zap, AlertTriangle, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const MithaqCharterPage: React.FC = () => {
  const { t } = useContent();
  const m = t?.mithaqPage || { articles: [] };

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Clock size={40} />;
      case 2: return <Users size={40} />;
      case 3: return <Zap size={40} />;
      default: return <Sparkles size={40} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-32 text-right font-cairo animate-in fade-in duration-1000">
      <header className="text-center max-w-5xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-emerald-900/20 text-emerald-500 text-[10px] font-black border border-emerald-500/20 uppercase tracking-[0.4em] shadow-xl">
           المطالب الشرعية والتشريعية - مبادرة ميثاق
        </div>
        <div className="quran-font text-5xl md:text-6xl text-yellow-500 font-bold italic leading-relaxed border-y border-yellow-500/10 py-10">
          {m.quranHeader}
        </div>
        <h1 className="text-6xl md:text-[10rem] font-black text-white leading-none tracking-tighter">
          الميثاق <span className="text-gradient-gold">الغليظ</span>
        </h1>
        <p className="text-2xl md:text-3xl text-zinc-400 font-medium leading-relaxed max-w-4xl mx-auto italic">
          {m.desc}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {(m.articles || []).map((art: any) => (
          <ThreeDCard key={art.id}>
            <div className="p-16 bg-zinc-900/50 backdrop-blur-xl rounded-[4rem] border border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-700 group h-full shadow-3xl relative overflow-hidden">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-colors"></div>
               <div className="relative z-10 space-y-10">
                  <div className="flex justify-between items-start">
                     <span className="text-8xl font-black text-white/5 group-hover:text-yellow-500/10 transition-colors">0{art.id}</span>
                     <div className="p-6 bg-zinc-950 rounded-3xl border border-yellow-500/10 text-yellow-500 shadow-2xl group-hover:scale-110 transition-transform">
                        {getIcon(art.id)}
                     </div>
                  </div>
                  <h3 className="text-4xl font-black text-white leading-tight tracking-tighter">{art.title}</h3>
                  <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed">{art.text}</p>
                  <div className="pt-8 border-t border-zinc-800 flex items-center gap-4 text-xs font-black text-yellow-500 uppercase tracking-widest">
                    «وَأَوْفُوا بِالْعَهْدِ» <ArrowDownRight size={16} />
                  </div>
               </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         <ThreeDCard>
            <div className="p-14 bg-red-950/20 border border-red-500/20 rounded-[4rem] space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5"><AlertTriangle size={150} className="text-red-500" /></div>
               <h4 className="text-3xl font-black text-red-500 flex items-center gap-4 relative z-10">فقه الضرار (مرفوض) <AlertTriangle size={32} /></h4>
               <p className="text-zinc-500 text-xl leading-relaxed font-bold relative z-10">إن استخدام الأبناء سلاحاً في النزاع هو ضرارٌ نهى عنه الله. القوانين الحالية تكرس 'اليتم القسري' وتهدر دماء المشاعر الفطرية بدعاوى انتقامية.</p>
            </div>
         </ThreeDCard>
         <ThreeDCard>
            <div className="p-14 bg-emerald-950/20 border border-emerald-500/20 rounded-[4rem] space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldCheck size={150} className="text-emerald-500" /></div>
               <h4 className="text-3xl font-black text-emerald-500 flex items-center gap-4 relative z-10">بيان القسط (منهاجنا) <ShieldCheck size={32} /></h4>
               <p className="text-zinc-300 text-xl leading-relaxed font-bold relative z-10">إقرار ولاية الأب وحقه في تربية أطفاله هو امتثال لأمر الله بالعدل. مصلحة الطفل الفضلى هي بقاؤه في كنف والديه بالمعروف، أو تسريحهم بإحسان.</p>
            </div>
         </ThreeDCard>
      </div>
    </div>
  );
};

export default MithaqCharterPage;
