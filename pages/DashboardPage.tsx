
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Area, AreaChart, Cell, PieChart, Pie, LineChart, Line, Legend
} from 'recharts';
import { 
  TrendingUp, Users, Scale, Timer, Gavel, Globe, AlertTriangle, Heart, 
  ShieldAlert, Search, BarChart3, Calendar, CheckCircle2, Flag, Zap, 
  Clock, UserMinus, ShieldCheck, Brain, Sparkles, Loader2, ArrowLeftRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const DashboardPage: React.FC = () => {
  const { t } = useContent();
  const d = t?.dashboardPage || {};
  
  // AI Insights State
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // بيانات الوجع - الأحمر (الواقع الحالي)
  const currentPainData = [
    { year: '2015', kids: 3.5, divorce: 180 },
    { year: '2017', kids: 5.2, divorce: 200 },
    { year: '2019', kids: 8.8, divorce: 225 },
    { year: '2021', kids: 12.1, divorce: 254 },
    { year: '2024', kids: 15.0, divorce: 285 },
  ];

  // بيانات الحل - الأصفر (مطالب الميثاق)
  const demandProjection = [
    { label: 'سن الحضانة', current: 15, proposed: 7, color: '#eab308' },
    { label: 'ساعات الرعاية', current: 3, proposed: 48, color: '#eab308' },
    { label: 'الولاية التعليمية', current: 0, proposed: 100, color: '#eab308' },
  ];

  // بيانات الأمل - الأخضر (الأثر الإيجابي)
  const impactStats = [
    { name: 'استقرار نفسي', current: 20, after: 85 },
    { name: 'انخفاض الجريمة', current: 15, after: 60 },
    { name: 'وفر مالي للدولة', current: 10, after: 90 },
  ];

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        حلل البيانات التالية لمنظومة العدالة الأسرية في مصر لعام 2025:
        1. هناك 15 مليون طفل محروم من الرعاية الوالدية المشتركة.
        2. 28% من الأزواج المصريين يتعرضون للاعتداء الجسدي أو المعنوي من قبل الزوجات (إحصائية رسمية).
        3. قضايا النزاع الأسري تصل لـ 1.5 مليون قضية سنوياً.
        4. مقترح "ميثاق": خفض سن الحضانة لـ 7 سنوات للولد و9 للبنت، وإقرار الرعاية المشتركة المبيتة.
        
        قدم رؤية استراتيجية مختصرة (3 نقاط) توضح كيف يساهم إقرار ميثاق في خفض حدة العنف المتبادل واستعادة هيبة الأب.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.8,
          topK: 40,
        },
      });

      setAiInsight(response.text);
    } catch (error) {
      setAiInsight("عذراً، المحرك الاستراتيجي يواجه ضغطاً حالياً. يرجى المحاولة لاحقاً.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const statCards = [
    { label: "نزاعات حالية", value: "1.5M", suffix: "قضية سنوياً", color: "text-red-600", bg: "bg-red-600/5", border: "border-red-600/20", icon: Gavel, category: "واقع" },
    { label: "اعتداءات ضد الأزواج", value: "28%", suffix: "من الرجال المصريين", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", icon: AlertTriangle, category: "خطر مجتمعي" },
    { label: "سن الحضانة المطلوب", value: "7 / 9", suffix: "سنوات (مطلب ميثاق)", color: "text-yellow-500", bg: "bg-yellow-500/5", border: "border-yellow-500/20", icon: Flag, category: "مطلب" },
    { label: "وفر ميزانية القضاء", value: "4.2B", suffix: "جنيه سنوياً", color: "text-emerald-500", bg: "bg-emerald-500/5", border: "border-emerald-500/20", icon: TrendingUp, category: "نتيجة" },
    { label: "توازن نفسي", value: "88%", suffix: "تحسن في سلوك الطفل", color: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/20", icon: Heart, category: "نتيجة" },
    { label: "الرعاية المشتركة", value: "48h", suffix: "استضافة أسبوعية", color: "text-yellow-400", bg: "bg-yellow-400/5", border: "border-yellow-400/20", icon: Zap, category: "مطلب" },
  ];

  const [liveClock, setLiveClock] = useState(new Date().toLocaleTimeString('ar-EG'));

  useEffect(() => {
    const timer = setInterval(() => setLiveClock(new Date().toLocaleTimeString('ar-EG')), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 text-right font-cairo">
      {/* Header Section */}
      <header className="relative p-10 md:p-20 rounded-[4rem] bg-zinc-950 border border-zinc-900 overflow-hidden shadow-4xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/5 blur-3xl opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-900 rounded-full border border-white/5">
               <Search size={16} className="text-zinc-500" />
               <span className="text-[10px] font-black text-zinc-500 tracking-widest">{d.subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter">
              {d.title}
            </h1>
            <div className="flex gap-4">
              <span className="px-4 py-1.5 bg-red-600/10 text-red-500 rounded-lg text-[9px] font-black border border-red-600/20 uppercase tracking-widest">الواقع المأساوي</span>
              <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg text-[9px] font-black border border-yellow-500/20 uppercase tracking-widest">مطالب ميثاق</span>
              <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg text-[9px] font-black border border-emerald-500/20 uppercase tracking-widest">الأثر المستقبلي</span>
            </div>
          </div>
          <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 flex flex-col items-center">
             <Timer size={32} className="text-red-600 mb-2" />
             <span className="text-3xl font-black text-white font-mono">{liveClock}</span>
             <p className="text-[10px] text-zinc-600 font-bold mt-2 uppercase tracking-tighter">Live Monitor 2025</p>
          </div>
        </div>
      </header>

      {/* AI Strategy Engine */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-emerald-500 rounded-[4rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-zinc-950 p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-4xl space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-zinc-900 rounded-[2rem] flex items-center justify-center text-emerald-500 shadow-2xl border border-white/5">
                <Brain size={40} className={isAnalyzing ? 'animate-pulse' : ''} />
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  {d.aiTitle} <Sparkles size={24} className="text-yellow-500" />
                </h2>
                <p className="text-zinc-500 font-bold">{d.aiSubtitle}</p>
              </div>
            </div>
            {!aiInsight && !isAnalyzing && (
              <button 
                onClick={handleAIAnalysis}
                className="px-10 py-5 bg-emerald-600 text-white rounded-full font-black text-lg shadow-3xl hover:bg-emerald-700 transition-all flex items-center gap-4"
              >
                {d.aiAnalyzeBtn} <ArrowLeftRight size={20} />
              </button>
            )}
          </div>

          {isAnalyzing && (
            <div className="p-10 text-center space-y-6 animate-pulse">
              <Loader2 size={48} className="animate-spin text-emerald-500 mx-auto" />
              <p className="text-xl text-zinc-400 font-black">{d.aiThinking}</p>
            </div>
          )}

          {aiInsight && (
            <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 animate-in slide-in-from-bottom-5 duration-700">
              <div className="flex justify-between items-start mb-6">
                 <div className="px-4 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20 uppercase">التحليل الاستراتيجي النهائي</div>
                 <button onClick={() => setAiInsight(null)} className="text-zinc-600 hover:text-white transition-colors"><Timer size={20}/></button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-xl md:text-2xl text-zinc-200 leading-[2] font-medium whitespace-pre-wrap text-justify">
                  {aiInsight}
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-zinc-800 flex items-center gap-4 text-xs font-black text-zinc-500 uppercase tracking-widest">
                 <ShieldCheck size={16} className="text-emerald-500" /> تمت المعالجة عبر ميثاق AI v3.0 • 2025 م
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {statCards.map((stat, i) => (
          <ThreeDCard key={i}>
            <div className={`p-10 rounded-[3rem] border ${stat.bg} ${stat.border} shadow-3xl h-full flex flex-col justify-between group transition-all`}>
               <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl bg-black border ${stat.border} ${stat.color}`}>
                    <stat.icon size={28} />
                  </div>
                  <span className={`text-[8px] font-black ${stat.color} opacity-40 uppercase tracking-widest`}>{stat.category}</span>
               </div>
               <div className="mt-8 space-y-2">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                  <h4 className={`text-6xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h4>
                  <p className="text-zinc-600 font-bold text-sm">{stat.suffix}</p>
               </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* الأحمر: نزيف الواقع */}
        <ThreeDCard>
          <div className="bg-zinc-900 p-10 md:p-14 rounded-[4rem] border border-red-600/20 h-[600px] flex flex-col shadow-4xl">
            <div className="flex justify-between items-center mb-10">
               <div className="text-right">
                  <h3 className="text-2xl font-black text-white">نزيف الواقع (أحمر)</h3>
                  <p className="text-red-600 font-bold text-xs">عدد الأطفال المحرومين بالمليون (2015-2024 م)</p>
               </div>
               <UserMinus className="text-red-600" size={32} />
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentPainData}>
                  <defs>
                    <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#3f3f46" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', border: 'none', borderRadius: '1rem' }} />
                  <Area type="monotone" dataKey="kids" stroke="#dc2626" strokeWidth={4} fillOpacity={1} fill="url(#colorRed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ThreeDCard>

        {/* الأصفر: مطالب ميثاق */}
        <ThreeDCard>
          <div className="bg-zinc-900 p-10 md:p-14 rounded-[4rem] border border-yellow-500/20 h-[600px] flex flex-col shadow-4xl">
            <div className="flex justify-between items-center mb-10">
               <div className="text-right">
                  <h3 className="text-2xl font-black text-white">مطالب ميثاق (أصفر)</h3>
                  <p className="text-yellow-500 font-bold text-xs">الفجوة بين الوضع الحالي والمقترح</p>
               </div>
               <Flag className="text-yellow-500" size={32} />
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demandProjection} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="label" type="category" stroke="#71717a" fontSize={10} width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#09090b', border: 'none', borderRadius: '1rem' }} />
                  <Bar dataKey="proposed" radius={[0, 10, 10, 0]} barSize={30}>
                    {demandProjection.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#eab308" />
                    ))}
                  </Bar>
                  <Bar dataKey="current" fill="#dc2626" radius={[0, 10, 10, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ThreeDCard>
      </div>

      {/* Strategic Vision Footer */}
      <section className="bg-zinc-950 p-16 rounded-[4rem] border border-zinc-900 text-center space-y-10">
         <h2 className="text-4xl font-black text-white">الخلاصة الإحصائية 2025 م</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-right">
            <div className="p-8 bg-red-600/5 border border-red-600/20 rounded-3xl">
               <h4 className="text-red-600 font-black mb-4">التكلفة الإنسانية</h4>
               <p className="text-zinc-500 text-sm font-medium">كل يوم تأخير في إقرار ميثاق يكلف الدولة 250 حالة نزاع جديدة و 400 طفل محروم إضافي.</p>
            </div>
            <div className="p-8 bg-yellow-500/5 border border-yellow-500/20 rounded-3xl">
               <h4 className="text-yellow-500 font-black mb-4">نقطة الارتكاز</h4>
               <p className="text-zinc-500 text-sm font-medium">سن الحضانة (7/9) هو المفتاح لخفض ضغط التقاضي في محاكم الأسرة بنسبة تزيد عن 60% فورياً.</p>
            </div>
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
               <h4 className="text-emerald-500 font-black mb-4">العائد القومي</h4>
               <p className="text-zinc-500 text-sm font-medium">الاستثمار في "الرعاية المشتركة" يوفر على الدولة مليارات الجنيهات المصروفة في علاج آثار التفكك الأسري.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default DashboardPage;
