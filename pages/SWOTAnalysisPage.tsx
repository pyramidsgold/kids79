
import React from 'react';
import { Shield, Target, AlertTriangle, TrendingUp, Sparkles, Brain, Loader2 } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const SWOTAnalysisPage: React.FC = () => {
  const { t } = useContent();
  const s = t?.swotPage;

  // Safety check to prevent "Cannot read properties of undefined (reading 'title')"
  if (!s) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 font-cairo text-right">
        <Loader2 className="animate-spin text-red-600" size={64} />
        <p className="text-2xl text-zinc-500 font-black">جاري تحميل التحليل الاستراتيجي المطور...</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'S': return <Shield size={48} />;
      case 'W': return <Brain size={48} />;
      case 'O': return <TrendingUp size={48} />;
      case 'T': return <AlertTriangle size={48} />;
      default: return <Sparkles size={48} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-16 space-y-20 md:space-y-32 text-right font-cairo animate-in fade-in duration-1000 overflow-x-hidden">
      <header className="text-center max-w-5xl mx-auto space-y-8 md:space-y-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 md:px-8 md:py-3 rounded-full bg-blue-600/10 text-blue-500 text-[10px] font-black border border-blue-600/20 uppercase tracking-[0.4em] shadow-xl">
           التخطيط الاستراتيجي للمبادرة 2025
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white leading-none tracking-tighter">
          {s.title}
        </h1>
        <p className="text-lg md:text-2xl text-zinc-500 font-medium leading-relaxed max-w-4xl mx-auto">
          {s.desc}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {(s.items || []).map((item: any, i: number) => (
          <ThreeDCard key={i}>
            <div className="p-8 md:p-16 bg-zinc-900 rounded-[2.5rem] md:rounded-[4rem] border border-zinc-800 hover:border-zinc-600 transition-all duration-700 group h-full shadow-3xl relative overflow-hidden">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
               <div className="relative z-10 space-y-8 md:space-y-10">
                  <div className="flex justify-between items-start">
                     <span className={`text-6xl md:text-9xl font-black opacity-10 ${item.color}`}>{item.type}</span>
                     <div className={`p-4 md:p-6 bg-zinc-950 rounded-2xl md:rounded-3xl border border-zinc-800 ${item.color} shadow-2xl group-hover:scale-110 transition-transform`}>
                        {getIcon(item.type)}
                     </div>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tighter">{item.title}</h3>
                  <p className="text-base md:text-xl text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
               </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      <div className="p-10 md:p-20 bg-red-600 rounded-[3rem] md:rounded-[5rem] shadow-4xl text-center space-y-8 md:space-y-12 border border-red-500 relative overflow-hidden">
         <div className="absolute inset-0 bg-black/10"></div>
         <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter relative z-10">الخلاصة الاستراتيجية</h2>
         <p className="text-lg md:text-2xl text-red-50 font-medium leading-relaxed max-w-4xl mx-auto relative z-10">
           مبادرة ميثاق تمتلك "شرعية شعبية" طاغية تجعل من تمريرها تشريعياً ضرورة حتمية لتفادي أزمة ثقة مجتمعية، مع ضرورة الحذر من التباطؤ البيروقراطي الذي قد يفرغ التعديلات من مضمونها الإنساني.
         </p>
      </div>
    </div>
  );
};

export default SWOTAnalysisPage;
