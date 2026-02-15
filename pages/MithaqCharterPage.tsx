
import React from 'react';
import { Shield, Target, Gavel, Scale, Heart, Users, ArrowDownRight, Sparkles, Book, Flag, Zap, AlertTriangle, ShieldCheck, Clock, AlertCircle, FileText } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const MithaqCharterPage: React.FC = () => {
  const { t } = useContent();
  const m = t?.mithaqPage || { articles: [] };

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Clock size={40} />;
      case 2: return <Users size={40} />;
      case 3: return <Shield size={40} />;
      case 4: return <AlertCircle size={40} />;
      case 5: return <Scale size={40} />;
      default: return <Sparkles size={40} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-32 text-right font-cairo animate-in fade-in duration-1000">
      <header className="text-center max-w-5xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-yellow-600/10 text-yellow-500 text-[10px] font-black border border-yellow-500/20 uppercase tracking-[0.4em] shadow-xl">
           دستور الإصلاح الأسري 2025
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {(m.articles || []).map((art: any) => (
          <ThreeDCard key={art.id}>
            <div className="p-16 bg-zinc-950/50 backdrop-blur-3xl rounded-[4rem] border border-white/5 hover:border-yellow-500/30 transition-all duration-700 group h-full shadow-4xl relative overflow-hidden">
               <div className="absolute top-0 left-0 p-10 opacity-[0.03] text-yellow-500 group-hover:opacity-10 transition-opacity">
                  <FileText size={200} />
               </div>
               <div className="relative z-10 space-y-10">
                  <div className="flex justify-between items-start">
                     <span className="text-9xl font-black text-zinc-900 group-hover:text-yellow-500/5 transition-colors">0{art.id}</span>
                     <div className="p-6 bg-zinc-900 rounded-3xl border border-yellow-500/10 text-yellow-500 shadow-3xl group-hover:scale-110 group-hover:rotate-6 transition-all">
                        {getIcon(art.id)}
                     </div>
                  </div>
                  <h3 className="text-4xl font-black text-white leading-tight tracking-tighter border-r-8 border-yellow-600 pr-6">{art.title}</h3>
                  <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed text-justify">
                    {art.text}
                  </p>
                  <div className="pt-8 flex items-center gap-4 text-xs font-black text-yellow-500 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                    «وَأَوْفُوا بِالْعَهْدِ» <ArrowDownRight size={16} />
                  </div>
               </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      {/* Warning & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         <ThreeDCard>
            <div className="p-14 bg-red-950/10 border border-red-900/30 rounded-[4rem] space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5"><AlertTriangle size={150} className="text-red-500" /></div>
               <h4 className="text-3xl font-black text-red-500 flex items-center gap-4 relative z-10">واقع الاغتراب (مرفوض) <AlertTriangle size={32} /></h4>
               <p className="text-zinc-500 text-xl leading-relaxed font-bold relative z-10">الوضع الحالي هو اغتيال معنوي لدور الأب، حيث يتم التعامل معه كصراف آلي فقط، مما أدى لتعرض 28% من الرجال لاعتداءات نفسية وجسدية نتيجة خلل ميزان القوى.</p>
            </div>
         </ThreeDCard>
         <ThreeDCard>
            <div className="p-14 bg-emerald-950/10 border border-emerald-900/30 rounded-[4rem] space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldCheck size={150} className="text-emerald-500" /></div>
               <h4 className="text-3xl font-black text-emerald-500 flex items-center gap-4 relative z-10">منهاج القسط (مطلبنا) <ShieldCheck size={32} /></h4>
               <p className="text-zinc-300 text-xl leading-relaxed font-bold relative z-10">هدفنا استعادة الفطرة السوية التي تجعل من الأب حصناً والماً، وتضمن للطفل أمان الولاية في سن التكوين الحرج (7-9 سنوات)، لنبني جيلاً سوياً نفسياً.</p>
            </div>
         </ThreeDCard>
      </div>
    </div>
  );
};

export default MithaqCharterPage;
