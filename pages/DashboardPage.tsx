
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Area, AreaChart, Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts';
import { 
  TrendingUp, Gavel, AlertTriangle, 
  ShieldAlert, Activity, ShieldCheck,
  Ghost, ShieldX, Database, FileText, Search
} from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import { imageDatabase } from '../imageDatabase';

const DashboardPage: React.FC = () => {
  const { t } = useContent();
  const d = t?.dashboardPage || {};
  
  // إحصائيات الأثر الاجتماعي العميقة
  const impactData = [
    { year: '2015', suicide: 45, delinquency: 3100, poverty: 12 },
    { year: '2018', suicide: 88, delinquency: 5400, poverty: 18 },
    { year: '2021', suicide: 142, delinquency: 8900, poverty: 25 },
    { year: '2024', suicide: 210, delinquency: 12500, poverty: 34 },
  ];

  const riskData = [
    { subject: 'الاعتداء على الأزواج', A: 28, fullMark: 100 },
    { subject: 'اليتم القسري', A: 92, fullMark: 100 },
    { subject: 'تفكك الروابط', A: 85, fullMark: 100 },
    { subject: 'فقدان القدوة', A: 88, fullMark: 100 },
    { subject: 'الانحراف السلوكي', A: 78, fullMark: 100 },
  ];

  const statCards = [
    { label: "أطفال محرومون", value: "15M", suffix: "طفل ضحية 'اليتم القسري'", color: "text-red-500", bg: "bg-red-600/5", border: "border-red-600/20", icon: Ghost },
    { label: "اعتداء ضد الرجال", value: "28%", suffix: "إحصائية رسمية صادمة", color: "text-red-600", bg: "bg-zinc-950", border: "border-red-600/10", icon: ShieldAlert },
    { label: "تفويضات سيادية", value: "1.2M", suffix: "توقيع موثق رقمياً", color: "text-emerald-500", bg: "bg-emerald-600/5", border: "border-emerald-600/20", icon: ShieldCheck },
    { label: "قضايا سنوية", value: "250K", suffix: "نزاعات رؤية ونفقة", color: "text-yellow-500", bg: "bg-yellow-600/5", border: "border-yellow-600/20", icon: Gavel },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 text-right font-cairo">
      <header className="relative p-12 md:p-20 rounded-[4rem] bg-zinc-950 border border-zinc-900 overflow-hidden shadow-4xl min-h-[50vh] flex flex-col justify-center">
        <img 
          src={imageDatabase.dataBackground} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 brightness-[0.3]" 
          alt="Data Background" 
        />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/10 via-transparent to-emerald-600/10 opacity-50"></div>
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 text-red-500 rounded-full text-xs font-black border border-red-600/20">
             <Activity size={16} /> مركز الرصد الاستراتيجي الموحد
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">{d.title}</h1>
          <p className="text-zinc-500 font-bold text-2xl max-w-4xl leading-relaxed">{d.husbandAssaultStat}</p>
          <div className="flex flex-wrap gap-6 pt-4">
             <div className="flex items-center gap-2 text-zinc-400 font-black text-sm uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
                <Database size={16} className="text-red-600" /> حزم البيانات الموثقة: 142 حزمة
             </div>
             <div className="flex items-center gap-2 text-zinc-400 font-black text-sm uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
                <Search size={16} className="text-emerald-600" /> معامل الخطأ التشريعي: ±0.01%
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <ThreeDCard key={i}>
            <div className={`p-10 rounded-[3rem] border ${stat.bg} ${stat.border} h-full flex flex-col justify-between group transition-all duration-500 hover:scale-105`}>
               <div className={`p-5 rounded-3xl bg-black border ${stat.border} ${stat.color} w-fit shadow-2xl`}>
                 <stat.icon size={32} />
               </div>
               <div className="mt-8 space-y-3">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                  <h4 className={`text-6xl md:text-7xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h4>
                  <p className="text-zinc-500 font-bold text-sm leading-tight">{stat.suffix}</p>
               </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <ThreeDCard className="lg:col-span-1">
            <div className="bg-zinc-900 p-12 rounded-[4rem] border border-red-600/10 h-[600px] flex flex-col shadow-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500"><ShieldX size={200} /></div>
               <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-3 relative z-10">مؤشر الخطر البنيوي <AlertTriangle className="text-red-500" /></h3>
               <div className="flex-1 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
                      <PolarGrid stroke="#27272a" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: 900 }} />
                      <Radar name="الخطر" dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
                      <Tooltip contentStyle={{backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '15px'}} />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </ThreeDCard>

         <ThreeDCard className="lg:col-span-2">
            <div className="bg-zinc-900 p-12 rounded-[4rem] border border-emerald-500/10 h-[600px] flex flex-col shadow-3xl">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">تطور الأثر الكارثي (2015-2025) <TrendingUp className="text-red-600" /></h3>
                  <div className="flex gap-4">
                     <span className="flex items-center gap-2 text-[10px] text-zinc-500 font-black"><div className="w-3 h-3 bg-red-600 rounded-full"/> حالات الانتحار</span>
                     <span className="flex items-center gap-2 text-[10px] text-zinc-500 font-black"><div className="w-3 h-3 bg-emerald-500 rounded-full"/> انحراف الأحداث</span>
                  </div>
               </div>
               <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impactData}>
                      <defs>
                        <linearGradient id="colorSuicide" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#18181b" />
                      <XAxis dataKey="year" stroke="#71717a" tick={{fontWeight: 900}} />
                      <YAxis stroke="#71717a" />
                      <Tooltip contentStyle={{backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '15px', textAlign: 'right'}} />
                      <Area type="monotone" dataKey="suicide" stroke="#dc2626" fillOpacity={1} fill="url(#colorSuicide)" strokeWidth={4} />
                      <Area type="monotone" dataKey="delinquency" stroke="#10b981" fillOpacity={0} strokeWidth={4} strokeDasharray="10 5" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </ThreeDCard>
      </div>

      <section className="bg-zinc-950 p-16 rounded-[5rem] border border-white/5 space-y-16 relative overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="text-center space-y-8 relative z-10">
           <FileText size={64} className="text-red-600 mx-auto mb-6" />
           <h2 className="text-4xl md:text-5xl font-black text-white">البيانات السيادية هي أساس العدالة</h2>
           <p className="text-zinc-500 font-bold text-2xl max-w-4xl mx-auto leading-relaxed">
              يوفر مرصد المظالم الرقمي رؤية دقيقة للواقع المأساوي الذي تفرضه القوانين المهجورة، مما يعزز موقف المبادرة في المطالبة بالإصلاح التشريعي الفوري بناءً على حقائق مثبتة بعيداً عن العواطف المجردة.
           </p>
           <div className="pt-10">
              <button className="px-12 py-5 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-4xl flex items-center gap-4 mx-auto">
                 <Database size={24} /> تحميل التقرير الإحصائي السنوي
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
