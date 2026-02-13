
import React from 'react';
import { Brain, Users, TrendingUp, Scale, CheckCircle2, Globe, ShieldCheck, AlertCircle, Flag } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const ComparisonBox = ({ label, current, proposed }: any) => (
  <ThreeDCard>
    <div className="p-8 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-xl space-y-6 h-full relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-full h-full bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <h4 className="text-2xl font-black text-white relative z-10">{label}</h4>
      <div className="flex items-end gap-6 relative z-10">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-red-600" />
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">القانون الحالي</span>
          </div>
          <div className="h-16 bg-zinc-950 rounded-2xl border border-red-600/20 flex items-center justify-center font-black text-red-600 text-xl">
            {current} سنة
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Flag size={14} className="text-yellow-500" />
            <span className={`text-[10px] font-bold text-yellow-500 uppercase tracking-widest`}>مطلب ميثاق</span>
          </div>
          <div className={`h-24 bg-yellow-500 text-black rounded-2xl flex items-center justify-center font-black text-4xl shadow-lg shadow-yellow-500/30 group-hover:scale-105 transition-transform`}>
            {proposed}
          </div>
        </div>
      </div>
      <div className="pt-4 flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
        <CheckCircle2 size={12} /> يوفر استقراراً نفسياً مبكراً للطفل
      </div>
    </div>
  </ThreeDCard>
);

const WhyChangePage: React.FC = () => {
  const { t } = useContent();
  const why = t?.whyPage || {};

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-32 text-right font-cairo animate-in fade-in duration-1000">
      <header className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-400/10 text-yellow-500 text-xs font-black uppercase tracking-widest border border-yellow-400/20 shadow-2xl">
          <Scale size={16} /> مطالب الإصلاح (تحديث 2025)
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
          لماذا ميثاق <span className="text-yellow-500">الآن؟</span>
        </h1>
        <p className="text-2xl text-zinc-500 font-medium leading-relaxed">مقارنة علمية بين القوانين المهجورة ومطالب الحراك الشعبي الموحد.</p>
      </header>

      {/* Comparison Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <h2 className="text-4xl md:text-5xl font-black text-white border-r-8 border-yellow-500 pr-8">خارطة التوازن التربوي</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ComparisonBox label="حضانة الولد" current="15" proposed="7" />
            <ComparisonBox label="حضانة البنت" current="15" proposed="9" />
          </div>
          <ThreeDCard>
            <div className="p-12 rounded-[4rem] bg-emerald-500/5 border border-emerald-500/20 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 p-8 opacity-5 text-emerald-500"><TrendingUp size={180} /></div>
              <div className="flex items-center gap-4 text-emerald-500 relative z-10">
                <CheckCircle2 size={36} />
                <h3 className="text-3xl font-black">الأثر الإيجابي المتوقع</h3>
              </div>
              <p className="text-zinc-400 font-medium text-xl leading-relaxed relative z-10">
                خفض معدلات النزاع القضائي بنسبة 70%، وتوفير بيئة تربوية تضمن للطفل وجود والده في أهم مراحل تكوينه الشخصي.
              </p>
            </div>
          </ThreeDCard>
        </div>
        <ThreeDCard>
          <div className="relative group rounded-[4rem] overflow-hidden shadow-2xl border-[6px] border-zinc-900 h-[700px]">
            <img 
              src="https://images.unsplash.com/photo-1476703714490-bb388e12239c?q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              alt="Impact"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent flex flex-col justify-end p-16">
               <div className="p-8 bg-zinc-900/80 backdrop-blur-xl rounded-[3rem] border border-red-600/30">
                  <h3 className="text-4xl font-black text-red-600 mb-4">الوضع الحالي: اغتراب والدي</h3>
                  <p className="text-zinc-400 font-bold text-xl leading-relaxed">تأخير انتقال الحضانة للـ 15 هو حكم بالإعدام النفسي على دور الأب التربوي في حياة أطفاله.</p>
               </div>
            </div>
          </div>
        </ThreeDCard>
      </section>

      {/* Impact Section */}
      <section className="space-y-20">
          <div className="text-center">
            <h2 className="text-5xl font-black text-white">تحليل مخرجات الإصلاح</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "العدل (أصفر)", desc: "مطلب ميثاق هو العودة للأصل الشرعي والعلمي في سن الحضانة.", color: "bg-yellow-500", icon: Scale },
              { title: "الألم (أحمر)", desc: "الوضع الحالي يخلق جيلاً يعاني من اضطرابات الهوية والتعلق.", color: "bg-red-600", icon: AlertCircle },
              { title: "الأمل (أخضر)", desc: "الرعاية المشتركة هي الحل الوحيد لاستعادة السلم الأسري.", color: "bg-emerald-500", icon: TrendingUp }
            ].map((item, i) => (
                <ThreeDCard key={i}>
                  <div className="bg-zinc-900 p-12 rounded-[4rem] shadow-2xl border border-zinc-800 h-full space-y-8 hover:border-zinc-600 transition-all duration-500 group">
                    <div className={`w-16 h-16 rounded-[1.5rem] ${item.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                      <item.icon size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight">{item.title}</h3>
                    <p className="text-zinc-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </ThreeDCard>
            ))}
          </div>
      </section>
    </div>
  );
};

export default WhyChangePage;
