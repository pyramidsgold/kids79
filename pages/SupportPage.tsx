
import React from 'react';
import { Gavel, FileText, Scale, MessageSquare, CheckCircle, ArrowLeft, HeartHandshake, ShieldAlert, Users, Phone, Brain } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const FlowStep = ({ icon: Icon, title, description, isLast = false }: any) => (
  <div className="flex flex-col items-center text-center space-y-8 relative group">
    <div className="w-28 h-28 rounded-[3rem] bg-zinc-900 border border-zinc-800 shadow-3xl flex items-center justify-center text-red-600 group-hover:border-red-600 group-hover:scale-110 transition-all duration-700">
      <Icon size={48} />
    </div>
    <div className="space-y-4">
      <h3 className="font-black text-white text-2xl">{title}</h3>
      <p className="text-lg text-zinc-500 max-w-[220px] font-medium leading-relaxed">{description}</p>
    </div>
    {!isLast && (
      <div className="hidden lg:block absolute top-14 -left-48 w-32 h-1 bg-gradient-to-l from-zinc-800 to-transparent">
        <div className="absolute top-1/2 -left-2 transform -translate-y-1/2">
          <ArrowLeft size={32} className="text-zinc-800" />
        </div>
      </div>
    )}
  </div>
);

const SupportPage: React.FC = () => {
  const { t, showToast } = useContent();
  const support = t?.supportPage || {};

  const handleRequestConsultation = () => {
    if (showToast) {
      showToast('تم استقبال طلب الاستشارة. سيقوم فريق ميثاق القانوني بالتواصل معك قريباً.', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-32 text-right font-cairo animate-in fade-in duration-1000">
      <header className="text-center max-w-4xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-red-600/10 text-red-500 text-xs font-black border border-red-600/20 uppercase tracking-widest shadow-xl">
          <HeartHandshake size={20} /> مساندة قضية الـ 7 و 9
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
          {support?.title}
        </h1>
        <p className="text-2xl text-zinc-500 font-medium leading-relaxed">{support?.desc}</p>
      </header>

      <section className="space-y-24">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white inline-block px-16 py-8 bg-zinc-900 rounded-[3rem] border border-zinc-800 shadow-3xl">
            {support?.stepsTitle}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-12 relative px-12">
          {(support?.steps || []).map((step: any, i: number) => {
            const icons = [FileText, Users, Brain, CheckCircle];
            return (
              <FlowStep 
                key={i}
                icon={icons[i] || FileText}
                title={step.title}
                description={step.description}
                isLast={i === (support?.steps?.length - 1)}
              />
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <ThreeDCard>
          <div className="bg-zinc-900 rounded-[4rem] p-16 shadow-3xl border border-zinc-800 h-full relative overflow-hidden group hover:border-red-600/40 transition-all duration-700">
            <div className="absolute top-0 left-0 p-12 opacity-[0.03] text-red-600"><Gavel size={400} /></div>
            <div className="flex items-center gap-8 mb-16 justify-end relative z-10">
              <h2 className="text-5xl font-black text-white">{support?.tipsTitle}</h2>
              <div className="w-20 h-20 rounded-[2rem] bg-red-600 text-white flex items-center justify-center shadow-3xl">
                <ShieldAlert size={40} />
              </div>
            </div>
            <ul className="space-y-12 relative z-10">
              {(support?.tips || []).map((tip: any, idx: number) => (
                <li key={idx} className="flex gap-8 justify-end group/item">
                  <div className="text-right">
                    <h4 className="font-black text-white text-3xl group-hover/item:text-red-500 transition-colors">{tip.title}</h4>
                    <p className="text-zinc-500 text-xl mt-4 leading-relaxed font-medium">{tip.desc}</p>
                  </div>
                  <div className="mt-2 w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-red-600 text-xl font-black shrink-0 shadow-xl group-hover/item:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ThreeDCard>

        <ThreeDCard>
          <div className="bg-red-600 rounded-[4rem] p-16 shadow-3xl text-white h-full relative overflow-hidden flex flex-col justify-center border border-red-500">
            <div className="absolute -left-20 -bottom-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]"></div>
            <h2 className="text-6xl font-black mb-16 leading-tight tracking-tighter">{support?.officeTitle}</h2>
            <div className="space-y-10 relative z-10">
              {(support?.officeServices || []).map((service: any, i: number) => (
                <div key={i} className="p-12 rounded-[3rem] bg-zinc-950/20 backdrop-blur-3xl border border-white/10 hover:bg-zinc-950/30 transition-all cursor-pointer shadow-2xl">
                  <h4 className="font-black text-3xl mb-4">{service.title}</h4>
                  <p className="text-red-50 text-xl font-medium opacity-90 leading-relaxed">{service.desc}</p>
                </div>
              ))}
              <button 
                onClick={handleRequestConsultation}
                className="w-full mt-10 py-8 bg-zinc-950 text-white rounded-[3rem] font-black text-3xl flex items-center justify-center gap-6 hover:scale-105 transition-all shadow-3xl hover:bg-black"
              >
                <Phone size={36} /> طلب استشارة (7 و 9)
              </button>
            </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
};

export default SupportPage;
