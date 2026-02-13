
import React from 'react';
import { Map as MapIcon, Gavel, Calendar, CheckCircle2, XCircle, ArrowDown, Flag, AlertCircle, TrendingUp, Loader2 } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import AIImageGenerator from '../components/AIImageGenerator';

const ReformMapPage: React.FC = () => {
  const { t } = useContent();
  const rm = t?.reformMap;

  // Safety check to prevent crash if reformMap is undefined
  if (!rm || !rm.pillars) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-10 text-center font-cairo">
        <div className="space-y-6">
          <Loader2 size={48} className="text-red-600 mx-auto animate-spin" />
          <h2 className="text-2xl font-black">جاري تحميل خارطة الإصلاح...</h2>
          <p className="text-zinc-500">يرجى الانتظار قليلاً أو تحديث الصفحة.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-right font-cairo bg-black overflow-x-hidden">
      {/* Cinematic Header */}
      <header className="relative h-[60vh] flex items-center justify-center px-4">
        <div className="absolute inset-0">
          <AIImageGenerator prompt="Blueprint" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative z-10 text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter">خارطة <span className="text-yellow-500">الإصلاح</span></h1>
          <p className="text-lg sm:text-2xl text-emerald-500 font-black uppercase tracking-[0.5em]">Vision 2025</p>
        </div>
      </header>

      {/* Comparison Focus Section */}
      <section className="py-20 md:py-40 bg-zinc-950 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-16 md:space-y-20">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter">لماذا نسعى <span className="text-yellow-500">للتغيير؟</span></h2>
            <p className="text-lg md:text-xl text-zinc-500 font-bold">مقارنة بين الواقع المأساوي والمستقبل العادل.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-6">
               <div className="p-8 md:p-10 bg-red-600/5 rounded-[2.5rem] md:rounded-[3rem] border border-red-600/20 flex flex-col gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><AlertCircle size={100} /></div>
                  <XCircle className="text-red-600 mx-auto" size={48} />
                  <h3 className="text-2xl font-black text-red-600">منظومة الحرمان (الحالية)</h3>
                  <div className="space-y-4 text-zinc-500 font-bold text-sm md:text-base">
                    <div className="flex justify-between py-3 border-b border-white/5"><span>سن الحضانة</span><span>15 سنة</span></div>
                    <div className="flex justify-between py-3 border-b border-white/5"><span>نظام الرؤية</span><span>3 ساعات (سجن)</span></div>
                    <div className="flex justify-between py-3"><span>الولاية التعليمية</span><span>منفردة (تعنت)</span></div>
                  </div>
               </div>
            </div>
            <div className="space-y-6">
               <div className="p-8 md:p-10 bg-emerald-500/5 rounded-[2.5rem] md:rounded-[3rem] border-2 border-emerald-500/30 shadow-4xl flex flex-col gap-6 md:scale-105 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><TrendingUp size={100} /></div>
                  <CheckCircle2 className="text-emerald-500 mx-auto" size={48} />
                  <h3 className="text-2xl font-black text-white">منظومة ميثاق (الإيجابيات)</h3>
                  <div className="space-y-4 text-emerald-50 font-bold text-sm md:text-base">
                    <div className="flex justify-between py-3 border-b border-white/5"><span>سن الحضانة</span><span className="text-yellow-500 font-black">7 و 9 سنوات</span></div>
                    <div className="flex justify-between py-3 border-b border-white/5"><span>الرعاية</span><span className="text-emerald-500">مشتركة مبيتة</span></div>
                    <div className="flex justify-between py-3"><span>الولاية</span><span className="text-emerald-500">مشتركة كاملة</span></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32 space-y-40 md:space-y-60 relative">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 via-zinc-800 to-zinc-950 opacity-20 hidden lg:block"></div>

        {rm.pillars.map((pillar: any, index: number) => (
          <section key={pillar.id} className={`flex flex-col lg:flex-row items-center gap-12 md:gap-20 relative ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="w-full lg:w-1/2">
              <ThreeDCard>
                <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-[6px] md:border-[10px] border-zinc-900 shadow-4xl">
                  {/* Defensive fallback for prompt */}
                  <AIImageGenerator prompt={pillar.aiPrompt || "blueprint"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-40"></div>
                </div>
              </ThreeDCard>
            </div>

            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-yellow-500 text-black rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-3xl mb-4 md:mb-8">
                0{index + 1}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{pillar.title}</h2>
              <p className="text-lg md:text-2xl text-zinc-400 leading-relaxed font-medium">{pillar.desc}</p>
              <div className="p-6 md:p-10 bg-emerald-500/5 rounded-[2rem] md:rounded-[3rem] border border-emerald-500/20 border-r-8 border-emerald-500 shadow-2xl">
                <h4 className="text-emerald-500 font-black text-[10px] md:text-sm uppercase tracking-widest mb-4">الأثر الإيجابي:</h4>
                <p className="text-lg md:text-xl text-zinc-300 font-bold">{pillar.details}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ReformMapPage;
