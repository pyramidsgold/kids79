
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Scale, Calculator, Loader2, Printer, Eye, X, Lock, QrCode, ShieldCheck } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", "الغربية", 
  "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", "السويس", "الشرقية", "سوهاج", 
  "جنوب سيناء", "شمال سيناء", "دمياط", "بني سويف", "بورسعيد", "كفر الشيخ", "مطروح", "الأقصر", "قنا", "أسوان", "أسيوط"
];

const PetitionPage: React.FC = () => {
  const { t, showToast } = useContent();
  const pet = t.petition;
  const [submitted, setSubmitted] = useState(false);
  const [peiScore, setPeiScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [digitalId] = useState(Math.random().toString(36).substr(2, 9).toUpperCase());
  const [sigDate] = useState(new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }));

  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    governorate: 'القاهرة',
    childrenCount: '1',
    exclusionYears: '0',
    contactType: 'حرمان كلي'
  });

  useEffect(() => {
    const exclusion = parseInt(formData.exclusionYears) || 0;
    const children = parseInt(formData.childrenCount) || 1;
    const score = Math.min(100, (exclusion * 15) + (children * 10));
    setPeiScore(score);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        showToast?.('يجب تفعيل ميثاق الالتزام الوطني للمتابعة', 'error');
        return;
    }
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        showToast?.('تم توثيق توقيعك بنجاح');
    }, 1500);
  };

  const PetitionA4 = () => (
    <div className="bg-white text-black p-[20mm] w-[210mm] min-h-[297mm] mx-auto shadow-2xl relative border border-zinc-200 font-serif" dir="rtl">
        <div className="absolute inset-[10mm] border-2 border-black pointer-events-none"></div>
        <div className="flex justify-between items-start mb-16 relative z-10 px-10 pt-10">
            <div className="text-center">
                <h1 className="text-lg font-bold">جمهورية مصر العربية</h1>
                <p className="text-sm">حملة طفل مش قضية</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 border-2 border-black rounded-3xl flex items-center justify-center mb-2">
                    <Scale size={45} />
                </div>
                <h2 className="text-xl font-black">عريضة إقرار مطلبي</h2>
            </div>
            <div className="text-center">
                <p className="text-xs font-bold">رقم القيد الرقمي:</p>
                <p className="text-xs font-mono">{digitalId}</p>
                <p className="text-[10px] mt-1">{sigDate}</p>
            </div>
        </div>

        <div className="px-12 space-y-10 relative z-10">
            <h2 className="text-2xl font-bold text-center underline underline-offset-[10px]">عريضة المطالبة بحقوق الرعاية المشتركة (7 و 9)</h2>
            <div className="space-y-6 text-lg leading-relaxed text-justify">
                <p>أقر أنا المواطن المصري <span className="font-bold border-b border-black px-2">{formData.fullName || '....................'}</span>، حامل الرقم القومي <span className="font-bold border-b border-black px-2">{formData.nationalId || '................'}</span>.</p>
                <p>بكامل تضامني مع المطلب الشعبي لخفض سن الحضانة ليكون <span className="font-bold">7 سنوات للولد و 9 سنوات للبنت</span>، إعمالاً لمبدأ المصلحة الفضلى للطفل.</p>
            </div>

            <div className="flex justify-between items-end mt-20 border-t border-zinc-200 pt-10">
                <div className="text-center space-y-2">
                    <p className="font-bold text-sm">التوقيع الرقمي الموثق</p>
                    <div className="w-48 h-16 relative flex items-center justify-center bg-zinc-50 rounded-xl border border-dashed border-zinc-300">
                        <span className="text-2xl font-serif italic text-blue-900 opacity-60">
                           {formData.fullName.split(' ')[0] || 'SIGNATURE'}
                        </span>
                    </div>
                </div>
                <QrCode size={70} className="text-zinc-400" />
                <div className="text-center space-y-2">
                    <p className="font-bold text-sm">اعتماد الحملة</p>
                    <div className="w-24 h-24 rounded-full border-4 border-double border-red-800/20 flex items-center justify-center rotate-[-15deg]">
                        <p className="text-[8px] font-black text-red-800/40">موثق 2024</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start text-right font-cairo">
      <div className="space-y-8 lg:sticky lg:top-32 no-print">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-red-600/10 text-red-500 rounded-full text-xs font-black uppercase border border-red-600/20">
          <ShieldCheck size={14} /> نظام التوثيق السيادي
        </div>
        <h1 className="text-6xl font-black text-white leading-tight">وقع لمستقبل <br /> <span className="text-red-600">أطفال مصر</span></h1>
        <p className="text-xl text-zinc-500 font-medium">{pet.desc}</p>
        <div className="p-10 rounded-[3rem] bg-zinc-900 border border-zinc-800 space-y-6">
           <h3 className="text-2xl font-black text-white">{pet.indicatorTitle}</h3>
           <div className="h-4 bg-zinc-950 rounded-full border border-zinc-800 overflow-hidden">
             <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${peiScore}%` }} />
           </div>
           <p className="text-sm text-zinc-600 font-bold">نسبة الضرر النفسي المقدرة حالياً: {peiScore}%</p>
        </div>
      </div>

      <ThreeDCard className="no-print">
        {submitted ? (
          <div className="bg-zinc-900 rounded-[4rem] p-16 text-center border border-zinc-800 space-y-10 animate-in zoom-in">
             <div className="hidden"><div id="print-section"><PetitionA4 /></div></div>
             <CheckCircle2 size={80} className="text-emerald-500 mx-auto" />
             <h2 className="text-4xl font-black text-white">تم التوثيق بنجاح</h2>
             <button onClick={() => setShowPreview(true)} className="w-full py-6 bg-white text-black rounded-2xl font-black text-xl flex items-center justify-center gap-3"><Eye size={24} /> معاينة المستند</button>
             <button onClick={() => setSubmitted(false)} className="text-zinc-500 font-bold hover:text-white transition-colors">توقيع جديد</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-[4rem] p-12 shadow-3xl border border-zinc-800 space-y-8">
            <div className="space-y-6">
              {pet.formFields.map((field: any) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-xs font-black text-zinc-500 mr-2">{field.label}</label>
                  {field.id === 'governorate' ? (
                    <select className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-bold outline-none focus:border-red-600 appearance-none" value={formData.governorate} onChange={(e) => setFormData({...formData, governorate: e.target.value})}>
                      {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                    </select>
                  ) : (
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-white font-bold outline-none focus:border-red-600" value={formData[field.id]} onChange={(e) => setFormData({...formData, [field.id]: e.target.value})} required />
                  )}
                </div>
              ))}
            </div>

            <div onClick={() => setAgreed(!agreed)} className={`p-8 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 items-center ${agreed ? 'bg-red-600/10 border-red-600/40' : 'bg-zinc-950 border-zinc-800'}`}>
               <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center ${agreed ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-700'}`}>
                  {agreed && <CheckCircle2 size={16} />}
               </div>
               <p className={`text-sm font-black ${agreed ? 'text-white' : 'text-zinc-600'}`}>{pet.termsLabel}</p>
            </div>

            <button type="submit" className={`w-full py-8 rounded-[2rem] font-black text-2xl transition-all flex items-center justify-center gap-4 ${agreed ? 'bg-red-600 text-white shadow-xl hover:bg-red-700' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}>
              <Lock size={24} className={agreed ? 'text-white/40' : ''} />
              {pet.form.submit}
              {agreed && <Send size={28} className="rotate-180" />}
            </button>
          </form>
        )}
      </ThreeDCard>

      {showPreview && (
          <div className="fixed inset-0 z-[600] bg-black/95 flex flex-col items-center overflow-y-auto p-10 backdrop-blur-3xl animate-in fade-in">
              <div className="max-w-6xl w-full flex justify-between items-center mb-10 sticky top-0 z-10 bg-zinc-900/80 p-6 rounded-3xl border border-white/5">
                  <div className="flex gap-4">
                      <button onClick={() => window.print()} className="px-8 py-3 bg-red-600 text-white rounded-xl font-black flex items-center gap-2 hover:bg-red-700"><Printer size={20} /> تحميل PDF</button>
                      <button onClick={() => setShowPreview(false)} className="px-8 py-3 bg-zinc-800 text-white rounded-xl font-black flex items-center gap-2"><X size={20} /> إغلاق</button>
                  </div>
                  <h3 className="text-xl font-black text-white">معاينة مستند الإقرار</h3>
              </div>
              <div className="scale-[0.5] md:scale-[0.8] lg:scale-100 origin-top pb-20"><PetitionA4 /></div>
          </div>
      )}
    </div>
  );
};

export default PetitionPage;
