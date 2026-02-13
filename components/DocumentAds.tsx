
import React from 'react';
import { FileText, ExternalLink, ShieldCheck, Download, Eye } from 'lucide-react';
import { useContent } from '../App';
import ThreeDCard from './ThreeDCard';

const DocumentAds: React.FC = () => {
  const { t } = useContent();
  const ads = t.documentAds || [];

  return (
    <section className="max-w-7xl mx-auto px-8 space-y-16">
      <div className="flex items-center gap-6 border-r-8 border-red-600 pr-8">
        <div>
          <h2 className="text-4xl font-black text-white">وثائق وملفات حاسمة</h2>
          <p className="text-zinc-500 font-bold mt-1 uppercase text-xs tracking-widest">Official Legislative Documents</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {ads.map((ad: any) => (
          <ThreeDCard key={ad.id}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 flex flex-col sm:flex-row gap-10 items-center group hover:border-red-600/30 transition-all cursor-pointer shadow-3xl">
              <div className="w-40 h-52 bg-zinc-950 rounded-2xl overflow-hidden border-2 border-zinc-800 shrink-0 shadow-2xl relative">
                <img src={ad.image} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt={ad.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end justify-center p-4">
                   <ShieldCheck size={24} className="text-emerald-500 animate-pulse" />
                </div>
              </div>
              <div className="space-y-6 flex-1 text-center sm:text-right">
                <div className="inline-flex px-4 py-1.5 bg-red-600/10 text-red-500 text-[10px] font-black rounded-full border border-red-600/20 uppercase tracking-widest">
                  {ad.label}
                </div>
                <h3 className="text-3xl font-black text-white leading-tight group-hover:text-red-600 transition-colors">{ad.title}</h3>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed">{ad.desc}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4">
                  <button className="flex items-center gap-2 text-white font-black text-sm px-6 py-2 bg-zinc-800 rounded-xl hover:bg-red-600 transition-all">
                    <Eye size={16} /> معاينة
                  </button>
                  <button className="flex items-center gap-2 text-zinc-500 font-black text-sm hover:text-white transition-colors">
                    <Download size={16} /> تحميل التقرير
                  </button>
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </section>
  );
};

export default DocumentAds;
