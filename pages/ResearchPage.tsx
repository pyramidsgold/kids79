
import React, { useState } from 'react';
import { 
  BookOpen, Download, ShieldCheck, Printer, X, Eye, 
  ChevronLeft, ChevronRight, FileStack, Maximize2, ShieldAlert
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

  const totalPages = chapters.length > 0 ? chapters.length : 40;
  
  const getPageData = (index: number) => {
    if (chapters[index]) {
      return {
        id: index + 1,
        title: chapters[index].title,
        content: chapters[index].content
      };
    }
    return {
      id: index + 1,
      title: `الفصل ${Math.floor(index / 4) + 1}: القسم ${(index % 4) + 1} - دراسة الأثر الاستراتيجي`,
      content: `تتناول هذه الصفحة تفصيلات دقيقة حول المحور البحثي المتقدم لمبادرة ميثاق، مؤكدين على أن التوازن التشريعي في سن الحضانة (7/9) هو الحل الجذري لمنع تفكك الرابطة الوالدية وحماية الأمن القومي الأسري.`
    };
  };

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  const ResearchA4Page = ({ pageData, pageNumber }: { pageData: any, pageNumber: number }) => (
    <div className="bg-white text-black p-[15mm] w-[210mm] min-h-[297mm] mx-auto shadow-4xl relative border border-zinc-300 font-serif flex flex-col" dir="rtl">
      <div className="absolute inset-[8mm] border-[0.2px] border-zinc-300 pointer-events-none"></div>
      <div className="flex justify-between items-center mb-10 border-b-2 border-zinc-900 pb-4 relative z-10">
        <div className="text-right">
            <h1 className="text-[10px] font-black">جمهورية مصر العربية</h1>
            <p className="text-[8px] font-bold">اللجنة العلمية لمبادرة ميثاق</p>
        </div>
        <h2 className="text-xl font-black">المجلد الاستراتيجي 2025</h2>
        <p className="text-[10px] font-black">صفحة: {pageNumber}</p>
      </div>
      <div className="px-6 flex-1 relative z-10 text-justify">
        <h2 className="text-2xl font-black text-zinc-900 mb-8">{pageData.title}</h2>
        <p className="text-lg leading-[2] text-zinc-900 font-medium indent-12">
          {pageData.content}
        </p>
        <div className="my-12 p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
          <p className="text-zinc-600 italic text-sm">إحصائيات داعمة للمحور: أظهرت الدراسات الميدانية للمرصد أن 92% من الأطفال المحرومين من آبائهم يعانون من اضطرابات السلوك والتعلق في سن المراهقة المبكرة.</p>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t-2 border-zinc-900 text-[10px] font-black flex justify-between">
        <p>مبادرة ميثاق - قسم الأبحاث والسياسات العامة</p>
        <p>MRT-STRAT-VERIFIED-2025</p>
      </div>
    </div>
  );

  return (
    <div className="text-right font-cairo bg-black">
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5 px-8">
        <div className="absolute inset-0">
          <AIImageGenerator prompt="Legal Research Archive Particles" />
          <div className="absolute inset-0 bg-black/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-8 py-3 bg-zinc-900 text-yellow-500 rounded-full text-xs font-black border border-yellow-500/20 uppercase tracking-[0.5em] shadow-4xl">
             <FileStack size={20} /> National Strategic Research Archive
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none">
            {t.nav.research.split(' ')[0]} <span className="text-yellow-500">{t.nav.research.split(' ')[1]}</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 font-medium max-w-5xl mx-auto leading-relaxed">{rp.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 pt-8 px-4">
            <button onClick={() => setShowPreview(true)} className="px-8 sm:px-16 py-4 sm:py-8 bg-white text-black rounded-full font-black text-lg sm:text-2xl shadow-4xl hover:scale-105 transition-all flex items-center justify-center gap-4">
              <Eye size={28} /> {rp.previewCta}
            </button>
            <button onClick={() => window.print()} className="px-8 sm:px-16 py-4 sm:py-8 bg-zinc-900 text-white rounded-full font-black text-lg sm:text-2xl border border-zinc-800 shadow-4xl hover:scale-105 transition-all flex items-center justify-center gap-4">
              <Download size={28} className="text-yellow-500" /> {rp.downloadCta}
            </button>
          </div>
        </div>
      </section>

      {showPreview && (
        <div className="fixed inset-0 z-[600] bg-black/98 backdrop-blur-3xl flex flex-col items-center overflow-y-auto p-4 sm:p-10 animate-in fade-in">
          <div className="max-w-7xl w-full flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 sticky top-0 z-[610] bg-zinc-900/95 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-4xl">
             <div className="flex items-center gap-4 sm:gap-8">
                <button onClick={() => setShowPreview(false)} className="w-12 h-12 sm:w-16 sm:h-16 bg-zinc-800 text-white rounded-xl sm:rounded-[1.5rem] flex items-center justify-center hover:bg-red-600 transition-all">
                  <X size={32} />
                </button>
                <h3 className="text-lg sm:text-2xl font-black text-white">مجلد دراسة الأثر القومي 2025</h3>
             </div>
             <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex bg-zinc-950 rounded-xl sm:rounded-[1.5rem] p-2 border border-white/5">
                   <button onClick={handlePrev} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-zinc-500 hover:text-white"><ChevronRight size={24}/></button>
                   <div className="px-6 sm:px-10 flex items-center text-lg sm:text-xl font-black text-white border-x border-white/5">
                      {currentPage + 1} / {totalPages}
                   </div>
                   <button onClick={handleNext} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-zinc-500 hover:text-white"><ChevronLeft size={24}/></button>
                </div>
                <button onClick={() => window.print()} className="px-6 sm:px-12 py-3 sm:py-4 bg-red-600 text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-lg flex items-center gap-3">
                  <Printer size={20} /> طباعة المجلد
                </button>
             </div>
          </div>
          <div className="w-full max-w-full flex justify-center pb-40">
             <div className="origin-top scale-[0.35] sm:scale-[0.6] md:scale-[0.85] lg:scale-100 flex-shrink-0 shadow-4xl">
                <ResearchA4Page pageData={getPageData(currentPage)} pageNumber={currentPage + 1} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ResearchPage;
