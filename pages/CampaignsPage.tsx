
import React from 'react';
import { 
  Target, Flag, Rocket, ArrowLeft, CheckCircle2, AlertCircle, 
  TrendingUp, Facebook, Youtube, Video as VideoIcon, Instagram, 
  Share2, Users, Fingerprint, HeartHandshake, Film
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import AIImageGenerator from '../components/AIImageGenerator';

const CampaignsPage: React.FC = () => {
  const { t } = useContent();
  const cp = t?.campaignsPage || { items: [] };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <Facebook size={18} className="text-blue-500" />;
      case 'YouTube': return <Youtube size={18} className="text-red-500" />;
      case 'TikTok': return <Share2 size={18} className="text-emerald-400" />;
      default: return <Target size={18} className="text-red-600" />;
    }
  };

  const getIcon = (title: string) => {
    if (title.includes('توقيع') || title.includes('تفويض')) return Fingerprint;
    if (title.includes('دعم')) return HeartHandshake;
    if (title.includes('سينما') || title.includes('إعلام')) return Film;
    return Rocket;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-32 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-600/10 text-emerald-500 rounded-full text-xs font-black border border-emerald-600/20 uppercase tracking-widest animate-float">
          <Rocket size={16} /> برامج الحراك التشريعي والميداني
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
          {cp.title || "البرامج والحملات"}
        </h1>
        <p className="text-2xl text-zinc-500 font-medium leading-relaxed">{cp.desc}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {(cp.items || []).map((item: any) => {
          const Icon = getIcon(item.title);
          return (
            <ThreeDCard key={item.id}>
              <div className="bg-zinc-900 rounded-[4rem] overflow-hidden border border-zinc-800 shadow-2xl flex flex-col h-full group transition-all hover:border-emerald-600/30 relative">
                <div className="relative aspect-video overflow-hidden bg-zinc-950">
                  <AIImageGenerator prompt={`Modern professional social advocacy campaign about ${item.title}, high impact lighting`} />
                  
                  <div className="absolute top-6 right-6 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
                    {item.status === 'نشط حالياً' || item.status === 'تفاعل حي' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-amber-500" />}
                    {item.status}
                  </div>
                  
                  <div className="absolute top-6 left-6 w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <Icon size={28} />
                  </div>

                  {item.platform && (
                    <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/80 rounded-2xl border border-white/10 text-white flex items-center gap-3">
                        {getPlatformIcon(item.platform)}
                        <span className="text-xs font-black">{item.platform}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-10 space-y-8 flex-1 flex flex-col">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-white group-hover:text-emerald-500 transition-colors leading-tight">{item.title}</h3>
                    <p className="text-zinc-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                  </div>

                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-end text-xs font-black uppercase tracking-widest text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-emerald-600" />
                        <span>الهدف: {item.goal}</span>
                      </div>
                      <span className="text-emerald-500">{item.progress}%</span>
                    </div>
                    <div className="h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                      <div 
                        className="h-full bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  {item.isExternal ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-6 bg-zinc-800 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-blue-600 transition-all group-hover:shadow-2xl"
                    >
                      شارك عبر {item.platform} <ArrowLeft size={28} />
                    </a>
                  ) : (
                    <Link 
                      to={item.link} 
                      className="w-full py-6 bg-emerald-600 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-emerald-700 transition-all group-hover:shadow-2xl group-hover:shadow-emerald-600/20"
                    >
                      تفاعل مع الحملة <ArrowLeft size={28} />
                    </Link>
                  )}
                </div>
              </div>
            </ThreeDCard>
          );
        })}
      </div>

      <section className="bg-zinc-950 rounded-[5rem] p-20 border border-zinc-900 shadow-5xl relative overflow-hidden text-center space-y-12">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px]"></div>
        <Users size={80} className="text-emerald-600 mx-auto animate-bounce" />
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">قوة التغيير تبدأ بصوتك</h2>
        <p className="text-2xl text-zinc-500 max-w-5xl mx-auto font-medium leading-relaxed">
          كل تفاعل رقمي، كل توقيع، وكل مشاركة لقصتك هي بمثابة "تصويت سيادي" حقيقي يغير واقع 15 مليون طفل مصري. نحن لا نطلب إحساناً، بل ننتزع حقاً أهدرته القوانين.
        </p>
        <div className="pt-8">
          <Link to="/legal-action" className="px-16 py-8 bg-white text-black rounded-full font-black text-3xl hover:scale-105 transition-all shadow-4xl inline-flex items-center gap-6">
            أصدر تفويضك السيادي الآن <ArrowLeft size={36} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;
