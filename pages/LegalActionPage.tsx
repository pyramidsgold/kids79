
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Send, CheckCircle2, Eye, Printer, QrCode, 
  Scale, X, Activity, Gavel, Heart, Users, Download, Fingerprint,
  Shield // Fix: Add missing Shield icon import
} from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const governorates = ["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الغربية", "الشرقية", "القليوبية", "البحيرة", "أسيوط", "سوهاج"];

const LegalActionPage: React.FC = () => {
  const { t } = useContent();
  const la = t?.legalAction || {};
  const f = la.fields || {};
  const mx = la.damageMatrix || {};
  const mc = la.memoContent || {};

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [showPreview, setShowPreview] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [damageScores, setDamageScores] = useState({ father: 0, child: 0, family: 0, society: 0 });

  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    governorate: 'القاهرة',
    court: '',
    deprivationYears: '0',
    childrenCount: '1',
  });

  useEffect(() => {
    const dep = parseFloat(formData.deprivationYears) || 0;
    const kids = parseFloat(formData.childrenCount) || 1;

    setDamageScores({
      father: Math.min(100, (dep * 15) + 10),
      child: Math.min(100, (dep * 20) + (kids * 5)),
      family: Math.min(100, (dep * 10) + 30),
      society: Math.min(100, (dep * 5) + 15)
    });
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setStep('success');
  };

  const UnifiedDocument = () => (
    <div id="print-section" className="bg-white text-black p-8 md:p-12 w-[210mm] min-h-[297mm] mx-auto shadow-2xl relative font-serif text-right overflow-hidden border border-zinc-200" dir="rtl">
      <div className="absolute inset-6 border-2 border-black pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-10 relative z-10 pt-10 border-b-2 border-black pb-6">
        <div className="text-center">
          <h1 className="text-sm font-bold">جمهورية مصر العربية</h1>
          <p className="text-[10px]">مبادرة ميثاق للإصلاح</p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black">وثيقة تفويض واستخلاف سيادي</h2>
          <p className="text-xs bg-red-50 text-red-800 px-4 py-1 rounded-full mt-2">عريضة رسمية موجهة لصناع القرار</p>
        </div>
        <QrCode size={60} />
      </div>

      <div className="px-10 space-y-8 relative z-10">
        <p className="text-lg leading-relaxed">{mc.header}</p>
        <p className="text-lg">
          أقر أنا المواطن/ <span className="font-black border-b border-black">{formData.fullName || '................'}</span>، حامل الرقم القومي <span className="font-black border-b border-black">{formData.nationalId || '................'}</span>، المقيم بمحافظة <span className="font-black border-b border-black">{formData.governorate}</span>، بتفويضي لمبادرة ميثاق.
        </p>

        <div className="bg-emerald-50 border-r-4 border-emerald-600 p-6 rounded-lg">
           <h3 className="font-black mb-2">المطالب الأساسية:</h3>
           <ul className="list-disc list-inside space-y-1 font-bold">
              <li>إعادة سن الحضانة لـ 7 و 9 سنوات.</li>
              <li>إقرار الرعاية المشتركة المبيتة.</li>
              <li>تفعيل الولاية التعليمية المشتركة.</li>
           </ul>
        </div>

        <div className="bg-red-50 border-r-4 border-red-600 p-6 rounded-lg">
           <h3 className="font-black mb-4">نتائج قياس الضرر:</h3>
           <div className="grid grid-cols-4 gap-4 text-center text-sm font-black">
              <div><p>الأب</p><p className="text-xl">%{damageScores.father}</p></div>
              <div><p>الطفل</p><p className="text-xl">%{damageScores.child}</p></div>
              <div><p>الأسرة</p><p className="text-xl">%{damageScores.family}</p></div>
              <div><p>المجتمع</p><p className="text-xl">%{damageScores.society}</p></div>
           </div>
        </div>

        <div className="pt-20 flex justify-between items-end">
           <div className="text-center">
              <p className="text-xs text-zinc-400">توقيع الموحد</p>
              <div className="w-48 h-12 border border-zinc-100 rounded bg-zinc-50 flex items-center justify-center italic text-2xl font-bold">
                {formData.fullName.split(' ')[0] || 'Signature'}
              </div>
           </div>
           <Fingerprint size={60} className="text-zinc-200" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 font-cairo">
      
      {/* Damage Matrix Sidebar */}
      <div className="space-y-10 lg:sticky lg:top-40 no-print">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-zinc-900 text-yellow-500 rounded-full text-xs font-black border border-yellow-500/20">
            <Shield size={16} /> {la.title}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">منظومة <br /> <span className="text-gradient-gold">رصد الاستخلاف</span></h1>
          <p className="text-zinc-400 font-medium">{la.desc}</p>
        </div>

        <div className="bg-zinc-900 rounded-[2rem] p-8 border border-zinc-800 space-y-8">
           <h3 className="text-xl font-black text-white flex items-center gap-3">
             <Activity size={24} className="text-red-600" /> {mx.title}
           </h3>
           <div className="space-y-6">
              {[
                { label: mx.father, score: damageScores.father, color: "bg-red-600", icon: Gavel },
                { label: mx.child, score: damageScores.child, color: "bg-amber-500", icon: Heart },
                { label: mx.family, score: damageScores.family, color: "bg-blue-600", icon: Users },
                { label: mx.society, score: damageScores.society, color: "bg-emerald-500", icon: ShieldCheck }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                      <span>{m.label}</span>
                      <span className="text-white text-sm">%{m.score}</span>
                   </div>
                   <div className="h-2 bg-black rounded-full overflow-hidden border border-zinc-800">
                      <div className={`h-full ${m.color} transition-all duration-1000`} style={{ width: `${m.score}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Form or Success View */}
      <ThreeDCard className="no-print">
        {step === 'success' ? (
          <div className="bg-zinc-950 rounded-[3rem] p-10 md:p-16 text-center border border-zinc-800 space-y-10 animate-in zoom-in">
             <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
             <h2 className="text-3xl md:text-5xl font-black text-white">{la.success}</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => setShowPreview(true)} className="py-5 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-200">
                  <Eye size={20} /> معاينة
                </button>
                <button onClick={() => window.print()} className="py-5 bg-emerald-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-700">
                  <Download size={20} /> تحميل PDF
                </button>
             </div>
             <button onClick={() => setStep('form')} className="text-zinc-500 font-bold underline">تعديل البيانات</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-zinc-800 space-y-8 text-right">
            <h3 className="text-2xl font-black text-white">إدخال بيانات الموحد</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-black text-zinc-500">{f.fullName}</label>
                <input required className="w-full px-6 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold outline-none focus:border-red-600" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500">{f.nationalId}</label>
                <input required maxLength={14} className="w-full px-6 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold outline-none focus:border-red-600" value={formData.nationalId} onChange={e => setFormData({...formData, nationalId: e.target.value.replace(/\D/g,'')})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500">{f.governorate}</label>
                <select className="w-full px-6 py-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold outline-none focus:border-red-600" value={formData.governorate} onChange={e => setFormData({...formData, governorate: e.target.value})}>
                   {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-red-600">{f.deprivationYears}</label>
                <input type="number" className="w-full px-6 py-4 rounded-xl bg-zinc-950 border border-red-600/20 text-red-500 font-bold outline-none" value={formData.deprivationYears} onChange={e => setFormData({...formData, deprivationYears: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-yellow-500">{f.childrenCount}</label>
                <input type="number" className="w-full px-6 py-4 rounded-xl bg-zinc-950 border border-yellow-500/20 text-yellow-500 font-bold outline-none" value={formData.childrenCount} onChange={e => setFormData({...formData, childrenCount: e.target.value})} />
              </div>
            </div>

            <div onClick={() => setAgreed(!agreed)} className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-start ${agreed ? 'bg-red-600/10 border-red-600/40' : 'bg-zinc-950 border-zinc-800'}`}>
              <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0 mt-1 ${agreed ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-700'}`}>
                  {agreed && <CheckCircle2 size={16} />}
              </div>
              <p className={`text-xs font-black leading-relaxed ${agreed ? 'text-white' : 'text-zinc-600'}`}>
                أقر أنا الموحد الموقع أعلاه بتفويضي لمبادرة ميثاق للمطالبة بإصلاح قانون الأحوال الشخصية.
              </p>
            </div>

            <button type="submit" className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-4 ${agreed ? 'bg-red-600 text-white shadow-xl' : 'bg-zinc-800 text-zinc-700 cursor-not-allowed'}`}>
               توثيق التفويض السيادي <Send size={24} className="rotate-180" />
            </button>
          </form>
        )}
      </ThreeDCard>

      {/* Mobile-Friendly Document Preview */}
      {showPreview && (
        <div className="fixed inset-0 z-[600] bg-black/95 flex flex-col items-center overflow-y-auto p-4 md:p-10">
          <div className="max-w-6xl w-full flex justify-between items-center mb-10 sticky top-0 z-10 glass-effect p-6 rounded-3xl">
             <div className="flex gap-3">
                <button onClick={() => window.print()} className="px-6 py-3 bg-red-600 text-white rounded-xl font-black text-sm flex items-center gap-2">
                   <Printer size={18} /> طباعة
                </button>
                <button onClick={() => setShowPreview(false)} className="px-6 py-3 bg-zinc-800 text-white rounded-xl font-black text-sm flex items-center gap-2">
                   <X size={18} /> إغلاق
                </button>
             </div>
             <h3 className="hidden md:block text-xl font-black text-white">معاينة وثيقة التفويض 2025</h3>
          </div>
          {/* Responsive Scaling Container */}
          <div className="w-full flex justify-center pb-20">
            <div className="origin-top scale-[0.3] sm:scale-[0.5] md:scale-[0.7] lg:scale-100 flex-shrink-0">
              <UnifiedDocument />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalActionPage;
