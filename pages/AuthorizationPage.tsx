
import React, { useState } from 'react';
import { PenTool, CheckCircle2, ShieldCheck, Loader2, Flag, Printer, Eye, X, Lock, QrCode } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", 
  "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "سوهاج", 
  "جنوب سيناء", "شمال سيناء", "دمياط", "بني سويف", "بورسعيد", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "أسوان", "أسيوط"
];

const AuthorizationPage: React.FC = () => {
  const { t, showToast } = useContent();
  const auth = t.authorizationPage;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [digitalId] = useState(Math.random().toString(36).substr(2, 9).toUpperCase());
  
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    governorate: 'القاهرة'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        showToast?.('يجب الإقرار بمسؤولية التفويض للمتابعة', 'error');
        return;
    }
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        if (showToast) showToast(auth.success);
    }, 1500);
  };

  const MemoA4 = () => (
    <div className="bg-white text-black p-[25mm] w-[210mm] min-h-[297mm] mx-auto shadow-2xl relative border border-zinc-200 font-serif" dir="rtl">
        <div className="absolute inset-[10mm] border-2 border-black pointer-events-none"></div>
        <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-12 relative z-10 px-10 pt-10">
            <div className="text-center">
                <h1 className="text-lg font-bold">جمهورية مصر العربية</h1>
                <p className="text-xs">السجل السيادي المصري</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-2xl mb-2">
                    <Flag size={40} />
                </div>
                <h2 className="text-xl font-black">مذكرة تفويض رئاسي</h2>
            </div>
            <div className="text-center">
                <p className="text-xs font-bold tracking-widest">AUTH-ID</p>
                <p className="text-xs font-mono">{digitalId}</p>
            </div>
        </div>
        
        <div className="space-y-12 text-justify px-12 relative z-10">
            <h2 className="text-3xl font-bold text-center underline underline-offset-[12px]">وثيقة إقرار الإرادة الحرة</h2>
            <div className="p-10 border-4 border-double border-zinc-200 rounded-3xl bg-zinc-50 italic font-black text-2xl leading-relaxed text-center">
                "{auth.legalText}"
            </div>
            <p className="text-lg leading-relaxed font-medium">هذا التفويض صادر عن إرادة حرة وموثق ببيانات الرقم القومي ليكون جزءاً من الكتلة التصويتية المطالبة بتعديل قوانين الأحوال الشخصية.</p>
        </div>

        <div className="absolute bottom-[40mm] left-[25mm] right-[25mm] flex justify-between items-end relative z-10 px-6">
            <div className="text-center space-y-2">
                <p className="font-bold text-sm">التوقيع الشخصي المعتمد</p>
                <div className="w-56 h-20 border border-zinc-200 rounded-2xl flex items-center justify-center bg-zinc-50 overflow-hidden">
                   <span className="font-serif text-3xl italic text-blue-900 transform -rotate-2 select-none">
                     {formData.fullName.split(' ')[0] || 'SIGNATURE'}
                   </span>
                </div>
            </div>
            <QrCode size={80} className="text-zinc-800" />
        </div>

        <div className="absolute bottom-10 left-16 right-16 flex justify-between text-[9px] font-black text-zinc-300 border-t border-zinc-100 pt-4">
            <p>منصة طفل مش قضية - التوثيق الرقمي السيادي - {digitalId}</p>
            <p>تم استخراج المستند عبر بروتوكول أمن المعلومات المصري</p>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-right font-cairo">
      <header className="text-center max-w-3xl mx-auto space-y-6 no-print">
        <h1 className="text-5xl font-black text-white leading-tight">{auth.title}</h1>
        <p className="text-lg text-zinc-500 font-medium leading-relaxed">{auth.desc}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start no-print">
        <div className="space-y-8 lg:sticky lg:top-32">
          <ThreeDCard>
            <div className="bg-zinc-900 rounded-[3rem] p-10 border border-zinc-800 shadow-2xl space-y-6">
               <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800">
                  <p className="text-xl text-zinc-300 leading-relaxed font-black italic">"{auth.legalText}"</p>
               </div>
               <div className="flex items-center gap-3 text-emerald-500 font-bold text-sm">
                  <ShieldCheck size={18} /> التوقيع محمي بروتوكولياً
               </div>
            </div>
          </ThreeDCard>
        </div>

        <ThreeDCard>
          {submitted ? (
             <div className="bg-zinc-900 rounded-[4rem] p-16 text-center border border-zinc-800 space-y-10">
                <div className="hidden"><div id="print-section"><MemoA4 /></div></div>
                <CheckCircle2 size={80} className="text-emerald-500 mx-auto" />
                <h2 className="text-4xl font-black text-white">تم التوثيق</h2>
                <button onClick={() => setShowPreview(true)} className="w-full py-6 bg-white text-black rounded-2xl font-black text-xl flex items-center justify-center gap-3"><Eye size={24} /> معاينة التفويض</button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-[4rem] p-12 shadow-3xl border border-zinc-800 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-500 mr-2">{auth.form.fullName}</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-bold focus:border-red-600 outline-none" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-500 mr-2">{auth.form.nationalId}</label>
                  <input type="text" maxLength={14} className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-bold focus:border-red-600 outline-none" value={formData.nationalId} onChange={(e) => setFormData({...formData, nationalId: e.target.value.replace(/\D/g,'')})} required />
                </div>
              </div>

              <div onClick={() => setAgreed(!agreed)} className={`p-8 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 items-center ${agreed ? 'bg-red-600/10 border-red-600/40' : 'bg-zinc-950 border-zinc-800'}`}>
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center ${agreed ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-700'}`}>
                    {agreed && <CheckCircle2 size={16} />}
                </div>
                <p className={`text-sm font-black ${agreed ? 'text-white' : 'text-zinc-600'}`}>{auth.termsLabel}</p>
              </div>

              <button type="submit" className={`w-full py-8 rounded-[2rem] font-black text-2xl transition-all flex items-center justify-center gap-4 ${agreed ? 'bg-red-600 text-white shadow-xl hover:bg-red-700' : 'bg-zinc-800 text-zinc-700 cursor-not-allowed'}`}>
                <Lock size={24} className={agreed ? 'text-white/40' : ''} />
                {auth.form.submit}
                {agreed && <PenTool size={28} />}
              </button>
            </form>
          )}
        </ThreeDCard>
      </div>

      {showPreview && (
          <div className="fixed inset-0 z-[600] bg-black/95 flex flex-col items-center overflow-y-auto p-10 backdrop-blur-3xl animate-in fade-in">
              <div className="max-w-6xl w-full flex justify-between items-center mb-10 sticky top-0 z-10 bg-zinc-900/90 p-6 rounded-3xl border border-white/10 shadow-3xl">
                  <div className="flex gap-4">
                      <button onClick={() => window.print()} className="px-8 py-3 bg-red-600 text-white rounded-xl font-black flex items-center gap-2 hover:bg-red-700"><Printer size={20} /> تحميل PDF</button>
                      <button onClick={() => setShowPreview(false)} className="px-8 py-3 bg-zinc-800 text-white rounded-xl font-black flex items-center gap-2"><X size={20} /> إغلاق</button>
                  </div>
                  <h3 className="text-xl font-black text-white">معاينة تفويض الإرادة الحرة</h3>
              </div>
              <div className="scale-[0.5] md:scale-[0.8] lg:scale-100 origin-top pb-20 shadow-2xl">
                  <MemoA4 />
              </div>
          </div>
      )}
    </div>
  );
};

export default AuthorizationPage;
