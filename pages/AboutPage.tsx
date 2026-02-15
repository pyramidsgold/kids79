
import React from 'react';
import { Heart, ShieldCheck, Scale, Users, Award, BookOpen, Quote } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import { defaultTranslations } from '../translations';
import { imageDatabase } from '../imageDatabase';

const AboutPage: React.FC = () => {
  const { t } = useContent();
  const about = t?.aboutPage || defaultTranslations.ar.aboutPage;
  const founder = t?.founder || defaultTranslations.ar.founder;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-32 text-right font-cairo">
      {/* Header */}
      <header className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">{about?.title}</h1>
        <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed font-medium">{about?.desc}</p>
      </header>

      {/* Founder Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 space-y-10">
           <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 text-red-500 rounded-full text-xs font-black border border-red-600/20 uppercase tracking-widest">
              <Award size={18} /> العقل المدبر للمبادرة
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-white">{founder.name}</h2>
           <h4 className="text-xl md:text-2xl font-black text-red-600">{founder.position}</h4>
           <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-red-600"><Quote size={120} /></div>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-medium relative z-10">
                {founder.bio}
              </p>
           </div>
           <div className="p-8 bg-red-600 text-white rounded-[2.5rem] shadow-4xl relative overflow-hidden">
              <div className="absolute top-0 left-0 p-6 opacity-20"><Quote size={64} className="rotate-180" /></div>
              <p className="text-2xl md:text-3xl font-black italic relative z-10 leading-tight">
                "{founder.quote}"
              </p>
           </div>
        </div>
        <div className="order-1 lg:order-2">
           <ThreeDCard>
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden bg-zinc-950 border-4 border-zinc-900 shadow-5xl">
                 <img 
                    src={imageDatabase.mainHeroImage} 
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000" 
                    alt="Dr. Ashraf Tamam Inspiration" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-12 flex flex-col justify-end">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white">
                          <BookOpen size={32} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-red-500 uppercase">خبير قضايا الأسرة</p>
                          <p className="text-2xl font-black text-white">منهجية علمية.. لا عاطفية</p>
                       </div>
                    </div>
                 </div>
              </div>
           </ThreeDCard>
        </div>
      </section>

      {/* Vision & Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-20">
        <div className="space-y-12">
          <section className="space-y-6">
             <div className="flex items-center gap-4 text-emerald-500 justify-end">
                <h2 className="text-4xl font-black">{about?.visionTitle}</h2>
                <Heart size={40} />
             </div>
             <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                {about?.visionDesc}
             </p>
          </section>

          <section className="space-y-6">
             <div className="flex items-center gap-4 text-red-600 justify-end">
                <h2 className="text-4xl font-black">{about?.principlesTitle}</h2>
                <ShieldCheck size={40} />
             </div>
             <ul className="space-y-6">
                {(about?.principles || []).map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-6 text-zinc-300 font-black text-2xl justify-end group cursor-default">
                    <span className="group-hover:text-red-500 transition-colors">{item}</span>
                    <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                  </li>
                ))}
             </ul>
          </section>
        </div>

        <ThreeDCard>
          <div className="bg-zinc-900 rounded-[4rem] p-16 shadow-2xl border border-zinc-800 space-y-10">
             <div className="aspect-video rounded-[3rem] overflow-hidden bg-zinc-950 flex items-center justify-center relative group">
                <img src={imageDatabase.interfaceImage} className="w-full h-full object-cover opacity-20 group-hover:opacity-50 transition-all duration-1000" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                   <Users size={100} className="text-red-600 mb-6 group-hover:scale-110 transition-transform" />
                   <h3 className="text-3xl font-black text-white mb-4">قوة الحراك الشعبي</h3>
                   <p className="text-zinc-500 font-bold">بناءً على فكرة د. أشرف تمام: طفل مش قضية</p>
                </div>
             </div>
             <div className="space-y-6">
                <h3 className="text-3xl font-black text-white">{about?.messageTitle}</h3>
                <p className="text-xl text-zinc-500 font-medium italic border-r-4 border-red-600 pr-6">"{about?.messageDesc}"</p>
             </div>
          </div>
        </ThreeDCard>
      </div>
    </div>
  );
};

export default AboutPage;
