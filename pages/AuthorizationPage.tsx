
import React, { useState, useEffect } from 'react';
import { PenTool, CheckCircle2, ShieldCheck, Loader2, Flag, Printer, Eye, X, Lock, QrCode, FileText, Landmark, ShieldAlert, Award } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحيرة", "الشرقية", "الغربية", "المنوفية", "القليوبية", "الفيوم", "سوهاج", "المنيا", "أسيوط", "بني سويف", "قنا", "دمياط", "أسوان", "الإسماعيلية", "بورسعيد", "السويس", "الأقصر", "البحر الأحمر", "شمال سيناء", "جنوب سيناء", "مطروح", "الوادي الجديد"
];

const AuthorizationPage: React.FC = () => {
  const { t, showToast } = useContent();
  const auth = t.authorizationPage;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [digitalId] = useState(`MRT-${Math.random().toString(36).substr(2, 6).toUpperCase()}-2025`);
  const [sigDate] = useState(new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }));
  
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    governorate: 'القاهرة',
    court: '',
    damageType: 'حرمان كلي'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nationalId.length !== 14) {
      showToast?.('الرقم القومي يجب أن يكون 14 رقماً', 'error');
      return;
    }
    if (!agreed) {
        showToast?.('يجب الإقرار بمسؤولية التفويض للمتابعة', 'error');
        return;
    }
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        if (showToast) showToast(auth.success, 'success');
    }, 2000);
  };

  const MemoA4 = () => (
    <div className="bg-white text-black p-[20mm] w-[210mm] min-h-[297mm] mx-auto shadow-4xl relative border-[4px] border-double border-zinc-900 font-serif" dir="rtl">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
            <h1 className="text-[12rem] font-black transform -rotate-45">ميثاق</h1>
        </div>

        <div className="flex justify-between items-start border-b-4 border-zinc-900 pb-8 mb-12 relative z-10">
            <div className="text-center">
                <h1 className="text-lg font-bold">جمهورية مصر العربية</h1>
                <p className="text-xs">سجل التفويضات السيادية</p>
                <p className="text-[10px] text-zinc-400 mt-1">تطبيق المادة 13 من ميثاق الاستخلاف</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-zinc-900 text-white flex items-center justify-center rounded-3xl mb-2 shadow-xl border-4 border-zinc-800">
                    <Flag size={48} />
                </div>
                <h2 className="text-2xl font-black tracking-tighter">مذكرة تفويض سيادي</h2>
                <span className="text-[10px] font-bold mt-1 bg-zinc-100 px-4 py-0.5 rounded-full border border-zinc-200">موثق رقمياً 2025</span>
            </div>
            <div className="text-right">
                <p className="text-xs font-bold">رقم القيد المركزي:</p>
                <p className="text-sm font-mono font-black text-red-600">{digitalId}</p>
                <p className="text-[10px] mt-2">{sigDate}</p>
            </div>
        </div>
        
        <div className="space-y-10 text-justify px-8 relative z-10 leading-relaxed">
            <h2 className="text-3xl font-bold text-center underline underline-offset-[14px] mb-12">وثيقة استرداد الولاية والقوامة</h2>
            
            <p className="text-xl font-medium">
                بموجب هذه الوثيقة، وبكامل قواي العقلية وإرادتي الحرة، أقر أنا/ <span className="font-black border-b-2 border-zinc-900 px-2">{formData.fullName || '................................'}</span>، حامل الرقم القومي <span className="font-black border-b-2 border-zinc-900 px-2">{formData.nationalId || '................'}</span>، المقيم بمحافظة <span className="font-black border-b-2 border-zinc-900 px-2">{formData.governorate}</span>.
            </p>

            <div className="p-10 border-4 border-double border-zinc-300 rounded-[2rem] bg-zinc-50/50 italic font-black text-2xl leading-relaxed text-center relative">
                <span className="absolute -top-6 -right-6 w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center text-xs not-italic">إقرار</span>
                "{auth.legalText}"
            </div>

            <div className="grid grid-cols-2 gap-8 text-lg">
                <div className="space-y-4">
                    <h4 className="font-bold border-r-4 border-zinc-900 pr-4">بيانات النزاع:</h4>
                    <ul className="space-y-2 text-sm">
                        <li>نوع الضرر الموثق: {formData.damageType}</li>
                        <li>الدائرة القضائية: {formData.court || 'غير محدد'}</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h4 className="font-bold border-r-4 border-zinc-900 pr-4">التعهد القانوني:</h4>
                    <p className="text-sm">أتعهد بالالتزام بكافة بنود 'الميثاق الغليظ' كمنهاج تربوي وأخلاقي في حال استرداد الولاية الشرعية على ذريتي.</p>
                </div>
            </div>

            <p className="text-lg">
                هذا التفويض يعتبر "تفويضاً سيادياً شعبياً" موجهاً للسيد رئيس الجمهورية ومجلس النواب والجهات التشريعية، ليكون جزءاً من الكتلة التصويتية المطالبة بالإصلاح الفوري لقوانين الأحوال الشخصية.
            </p>
        </div>

        <div className="absolute bottom-[30mm] left-[20mm] right-[20mm] flex justify-between items-end relative z-10 px-6 border-t border-zinc-100 pt-10">
            <div className="text-center space-y-4">
                <p className="font-bold text-xs">التوقيع الرقمي المعتمد</p>
                <div className="w-64 h-24 border-2 border-zinc-200 rounded-3xl flex items-center justify-center bg-zinc-50 overflow-hidden shadow-inner">
                   <span className="font-serif text-4xl italic text-blue-900 transform -rotate-3 select-none">
                     {formData.fullName.split(' ')[0] || 'SIGNATURE'}
                   </span>
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-2">
                <QrCode size={100} className="text-zinc-900" />
                <span className="text-[8px] font-black text-zinc-400">امسح للتحقق من صحة القيد</span>
            </div>

            <div className="text-center space-y-4">
                <p className="font-bold text-xs">ختم المبادرة</p>
                <div className="w-28 h-28 rounded-full border-4 border-double border-red-800/20 flex items-center justify-center rotate-[-15deg] relative">
                    <div className="absolute inset-2 border border-red-800/10 rounded-full"></div>
                    <p className="text-[10px] font-black text-red-800/40 text-center uppercase">MRT-VERIFIED<br/>LEGAL REFORM<br/>2025</p>
                </div>
            </div>
        </div>

        <div className="absolute bottom-6 left-12 right-12 flex justify-between text-[8px] font-black text-zinc-300 tracking-widest">
            <p>منصة ميثاق الرقمية - السيادة للأصل والعدل للقسط - {digitalId}</p>
            <p>تم الإصدار عبر بروتوكول التوثيق الشعبي الموحد</p>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-8 no-print">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-600/10 text-emerald-500 rounded-full text-[10px] font-black border border-emerald-500/20 uppercase tracking-[0.4em] shadow-xl animate-pulse">
          <Award size={16} /> نظام التمثيل التشريعي السيادي
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
          {auth.title.split(' ')[0]} <span className="text-emerald-500">{auth.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-2xl text-zinc-500 font-medium leading-relaxed max-w-3xl mx-auto">{auth.desc}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start no-print pb-32">
        <div className="space-y-10 lg:sticky lg:top-40">
          <ThreeDCard>
            <div className="bg-zinc-950/80 backdrop-blur-3xl rounded-[4rem] p-12 border border-zinc-800 shadow-4xl space-y-10 relative overflow-hidden group">
               <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-[100px]"></div>
               <div className="flex items-center gap-6 justify-end">
                  <h3 className="text-3xl font-black text-white">لماذا التفويض؟</h3>
                  <div className="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Landmark size={32} />
                  </div>
               </div>
               <p className="text-xl text-zinc-400 leading-relaxed font-medium">
                 هذا التفويض هو أداتك القانونية لتكون جزءاً من "الكتلة الضاغطة" التي تمثلها مبادرة ميثاق أمام البرلمان. كل صوت هو لبنة في جدار حماية مستقبل أطفال مصر.
               </p>
               <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-emerald-500/10 flex items-center gap-6 group-hover:scale-105 transition-all">
                  <ShieldCheck size={40} className="text-emerald-500" />
                  <p className="text-sm font-black text-zinc-300">بياناتك مشفرة ومحمية ببروتوكولات الأمن القومي للمبادرة.</p>
               </div>
            </div>
          </ThreeDCard>
          
          <div className="p-8 rounded-[3rem] bg-red-600/5 border border-red-600/10 flex items-center gap-6">
             <ShieldAlert size={32} className="text-red-600" />
             <p className="text-zinc-500 text-sm font-bold">تحذير: التفويض السيادي وثيقة رسمية، يرجى التأكد من صحة البيانات لتفادي استبعاد القيد من السجل التشريعي.</p>
          </div>
        </div>

        <ThreeDCard>
          {submitted ? (
             <div className="bg-zinc-900 rounded-[4rem] p-16 text-center border border-zinc-800 space-y-12 animate-in zoom-in duration-700">
                <div className="hidden"><div id="print-section"><MemoA4 /></div></div>
                <div className="w-32 h-32 bg-emerald-600/10 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-500/20">
                   <CheckCircle2 size={80} className="text-emerald-500" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-white">تم توثيق السيادة</h2>
                  <p className="text-zinc-500 font-bold">رقم القيد المركزي: <span className="text-white font-mono">{digitalId}</span></p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button onClick={() => setShowPreview(true)} className="py-6 bg-white text-black rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all shadow-xl">
                    <Eye size={24} /> معاينة المستند
                  </button>
                  <button onClick={() => window.print()} className="py-6 bg-zinc-800 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-zinc-700 transition-all">
                    <Printer size={24} /> طباعة/حفظ PDF
                  </button>
                </div>
                <button onClick={() => setSubmitted(false)} className="text-zinc-500 font-bold hover:text-white transition-colors underline underline-offset-8">إصدار تفويض جديد</button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-950 rounded-[4rem] p-12 shadow-4xl border border-zinc-800 space-y-10">
              <h3 className="text-3xl font-black text-white border-r-8 border-emerald-600 pr-6 flex items-center gap-4">
                بيانات الموحد السيادية <PenTool size={28} className="text-emerald-500" />
              </h3>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 mr-2 uppercase tracking-widest">{auth.form.fullName}</label>
                  <input type="text" className="w-full px-8 py-5 rounded-[2rem] bg-zinc-900 border border-zinc-800 text-white font-black text-lg focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700" placeholder="مثال: أحمد محمود محمد علي" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-500 mr-2 uppercase tracking-widest">{auth.form.nationalId}</label>
                    <input type="text" maxLength={14} className="w-full px-8 py-5 rounded-[2rem] bg-zinc-900 border border-zinc-800 text-white font-black text-lg focus:border-emerald-500 outline-none transition-all" value={formData.nationalId} onChange={(e) => setFormData({...formData, nationalId: e.target.value.replace(/\D/g,'')})} required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-zinc-500 mr-2 uppercase tracking-widest">{auth.form.governorate}</label>
                    <select className="w-full px-8 py-5 rounded-[2rem] bg-zinc-900 border border-zinc-800 text-white font-black text-lg focus:border-emerald-500 outline-none appearance-none cursor-pointer" value={formData.governorate} onChange={(e) => setFormData({...formData, governorate: e.target.value})}>
                      {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 mr-2 uppercase tracking-widest">{auth.form.court}</label>
                  <input type="text" className="w-full px-8 py-5 rounded-[2rem] bg-zinc-900 border border-zinc-800 text-white font-black text-lg focus:border-emerald-500 outline-none transition-all" placeholder="مثال: نيابة الأسرة بالمعادي" value={formData.court} onChange={(e) => setFormData({...formData, court: e.target.value})} />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 mr-2 uppercase tracking-widest">نوع الضرر الموثق</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['حرمان كلي', 'منع مبيت', 'تعنت تعليمي', 'نزاع ممتد'].map((type) => (
                      <button 
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, damageType: type})}
                        className={`py-4 rounded-2xl font-black text-sm border transition-all ${formData.damageType === type ? 'bg-red-600 text-white border-red-600 shadow-lg' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div onClick={() => setAgreed(!agreed)} className={`p-10 rounded-[2.5rem] border-4 transition-all cursor-pointer flex gap-6 items-start shadow-inner ${agreed ? 'bg-emerald-600/10 border-emerald-600/40' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}>
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${agreed ? 'bg-emerald-600 border-emerald-600 text-white scale-110' : 'border-zinc-700 bg-zinc-950'}`}>
                    {agreed && <CheckCircle2 size={24} />}
                </div>
                <p className={`text-base font-black leading-relaxed ${agreed ? 'text-white' : 'text-zinc-500'}`}>{auth.termsLabel}</p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-8 rounded-[2.5rem] font-black text-3xl transition-all flex items-center justify-center gap-4 relative overflow-hidden group ${agreed ? 'bg-emerald-600 text-white shadow-4xl hover:bg-emerald-700 hover:scale-105 active:scale-95' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={36} />
                ) : (
                  <>
                    <Lock size={32} className={agreed ? 'text-white/40' : ''} />
                    {auth.form.submit}
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </>
                )}
              </button>
            </form>
          )}
        </ThreeDCard>
      </div>

      {showPreview && (
          <div className="fixed inset-0 z-[600] bg-black/95 flex flex-col items-center overflow-y-auto p-4 md:p-10 backdrop-blur-3xl animate-in fade-in duration-500">
              <div className="max-w-7xl w-full flex justify-between items-center mb-10 sticky top-0 z-10 bg-zinc-900/90 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 shadow-4xl">
                  <div className="flex gap-4">
                      <button onClick={() => window.print()} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-emerald-700 shadow-xl transition-all"><Printer size={24} /> حفظ/طباعة الوثيقة</button>
                      <button onClick={() => setShowPreview(false)} className="px-8 py-4 bg-zinc-800 text-white rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-zinc-700 transition-all"><X size={24} /> إغلاق المعاينة</button>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-white">
                    <FileText size={32} className="text-emerald-500" />
                    <h3 className="text-2xl font-black">معاينة تفويض الإرادة الحرة MRT-2025</h3>
                  </div>
              </div>
              <div className="w-full flex justify-center pb-40">
                <div className="scale-[0.35] sm:scale-[0.5] md:scale-[0.75] lg:scale-100 origin-top shadow-4xl">
                    <MemoA4 />
                </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AuthorizationPage;
