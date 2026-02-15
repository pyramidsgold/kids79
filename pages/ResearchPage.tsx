
import React, { useState } from 'react';
import { 
  BookOpen, Download, ShieldCheck, Printer, X, Eye, 
  ChevronLeft, ChevronRight, FileStack, ShieldAlert
} from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import AIImageGenerator from '../components/AIImageGenerator';

const ResearchPage: React.FC = () => {
  const { t } = useContent();
  const rp = t?.researchPage || {};
  const chapters = rp.chapters || [];
  
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = chapters.length;
  
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  const ResearchA4Page = ({ pageData, pageNumber }: { pageData: any, pageNumber: number }) => (
    <div className="bg-white text-black p-[20mm] w-[210mm] min-h-[297mm] mx-auto shadow-4xl relative border-4 border-double border-zinc-900 font-serif flex flex-col" dir="rtl">
      <div className="absolute inset-[10mm] border-2 border-zinc-200 pointer-events-none"></div>
      <div className="flex justify-between items-center mb-12 border-b-4 border-zinc-900 pb-6 relative z-10">
        <div className="text-right">
            <h1 className="text-xs font-black">جمهورية مصر العربية</h1>
            <p className="text-[10px] font-bold">اللجنة العلمية لمبادرة ميثاق</p>
        </div>
        <h2 className="text-2xl font-black">المجلد الاستراتيجي 2025</h2>
        <p className="text-xs font-black">وثيقة رقم: {pageNumber}</p>
      </div>
      <div className="px-10 flex-1 relative z-10 text-justify">
        <h2 className="text-3xl font-black text-zinc-900 mb-10 underline underline-offset-8">{pageData.title}</h2>
        <p className="text-xl leading-[2.2] text-zinc-800 font-medium indent-12">
          {pageData.content}
        </p>
        <div className="mt-16 p-10 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-300">
          <h4 className="font-black text-red-600 mb-4 flex items-center gap-2"><ShieldAlert size={20} /> ملاحظة استراتيجية:</h4>
          <p className="text-zinc-600 italic text-base leading-relaxed">بناءً على هذا التحليل، نؤكد أن التوازن التشريعي ليس مطلباً فئوياً للآباء، بل هو ضرورة حتمية لحماية السلم المجتمعي وتقليل الضغط على المؤسسات العقابية مستقبلاً من خلال تنشئة جيل متزن تحت ولاية والديه.</p>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t-4 border-zinc-900 text-xs font-black flex justify-between items-center opacity-50">
        <p>مبادرة ميثاق - الأمانة العامة للأبحاث والسياسات</p>
        <p>MRT-STUDY-CONFIRMED-2025</p>
      </div>
    </div>
  );

  return (
    <div className="text-right font-cairo bg-black min-h-screen">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5 px-8">
        <div className="absolute inset-0">
          <AIImageGenerator prompt="Historical Legal Manuscripts and Data" />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-zinc-900 text-yellow-500 rounded-full text-xs font-black border border-yellow-500/20 uppercase tracking-[0.5em] shadow-4xl animate-pulse">
             <FileStack size={20} /> Strategic Intelligence Archive
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">
            {t.nav.research.split(' ')[0]} <span className="text-yellow-500">{t.nav.research.split(' ')[1]}</span>
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-400 font-medium max-w-4xl mx-auto leading-relaxed">{rp.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
            <button onClick={() => setShowPreview(true)} className="px-12 py-6 bg-white text-black rounded-full font-black text-2xl shadow-4xl hover:scale-105 transition-all flex items-center justify-center gap-4">
              <Eye size={28} /> {rp.previewCta}
            </button>
            <button onClick={() => window.print()} className="px-12 py-6 bg-zinc-900 text-white rounded-full font-black text-2xl border border-zinc-800 shadow-4xl hover:scale-105 transition-all flex items-center justify-center gap-4">
              <Download size={28} className="text-yellow-500" /> {rp.downloadCta}
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-12">
         {chapters.map((chap: any, i: number) => (
           <ThreeDCard key={i}>
              <div className="p-12 bg-zinc-900/50 rounded-[4rem] border border-zinc-800 h-full flex flex-col justify-between group hover:border-yellow-500/30 transition-all">
                 <div className="space-y-6">
                    <span className="text-6xl font-black text-zinc-800 group-hover:text-yellow-500/10 transition-colors">0{i+1}</span>
                    <h3 className="text-3xl font-black text-white border-r-4 border-yellow-500 pr-6">{chap.title}</h3>
                    <p className="text-xl text-zinc-500 leading-relaxed font-medium line-clamp-3">{chap.content}</p>
                 </div>
                 <button onClick={() => { setCurrentPage(i); setShowPreview(true); }} className="mt-10 text-yellow-500 font-black flex items-center gap-2 hover:gap-4 transition-all">مطالعة الفصل <ChevronLeft size={20}/></button>
              </div>
           </ThreeDCard>
         ))}
      </section>

      {showPreview && (
        <div className="fixed inset-0 z-[600] bg-black/98 backdrop-blur-3xl flex flex-col items-center overflow-y-auto p-6 sm:p-10 animate-in fade-in duration-700">
          <div className="max-w-7xl w-full flex flex-col sm:flex-row justify-between items-center gap-8 mb-16 sticky top-0 z-[610] bg-zinc-900/95 p-8 rounded-[3rem] border border-white/10 shadow-4xl">
             <div className="flex items-center gap-8">
                <button onClick={() => setShowPreview(false)} className="w-16 h-16 bg-zinc-800 text-white rounded-[1.5rem] flex items-center justify-center hover:bg-red-600 transition-all shadow-xl">
                  <X size={32} />
                </button>
                <h3 className="text-2xl font-black text-white tracking-tighter">أرشيف ميثاق السيادي 2025</h3>
             </div>
             <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex bg-zinc-950 rounded-[1.5rem] p-3 border border-white/5">
                   <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><ChevronRight size={32}/></button>
                   <div className="px-10 flex items-center text-xl font-black text-white border-x border-white/5 min-w-[120px] justify-center">
                      {currentPage + 1} / {totalPages}
                   </div>
                   <button onClick={handleNext} className="w-12 h-12 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><ChevronLeft size={32}/></button>
                </div>
                <button onClick={() => window.print()} className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-lg flex items-center gap-3 shadow-2xl hover:bg-red-700 transition-all">
                  <Printer size={24} /> طباعة المجلد كاملاً
                </button>
             </div>
          </div>
          <div className="w-full flex justify-center pb-40">
             <div className="origin-top scale-[0.35] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 flex-shrink-0 shadow-5xl rounded-[2rem] overflow-hidden">
                <ResearchA4Page pageData={chapters[currentPage]} pageNumber={currentPage + 1} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ResearchPage;
