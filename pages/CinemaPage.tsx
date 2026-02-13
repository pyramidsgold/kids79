
import React, { useState } from 'react';
import { Film, Tv, Play, Star, Calendar, Clock, List, X, ArrowLeft, Info, PlayCircle, ChevronLeft, ExternalLink, Sparkles } from 'lucide-react';
import { useContent } from '../App';
import ThreeDCard from '../components/ThreeDCard';
import AIImageGenerator from '../components/AIImageGenerator';

const CinemaPage: React.FC = () => {
  const { t } = useContent();
  const cinema = t?.cinemaPage || { items: [], categories: {} };
  const [filter, setFilter] = useState('all');
  const [selectedSeries, setSelectedSeries] = useState<any>(null);
  const [activeEpisode, setActiveEpisode] = useState<any>(null);

  const filteredItems = (cinema.items || []).filter((item: any) => 
    filter === 'all' ? true : item.type === (filter === 'movies' ? 'movie' : 'series')
  );

  const mockEpisodes = (series: any) => [
    { id: 1, title: `الحلقة الأولى - نداء الفطرة`, duration: '45:00', videoUrl: series.videoUrl },
    { id: 2, title: `الحلقة الثانية - الميثاق الغليظ`, duration: '42:30', videoUrl: series.videoUrl },
    { id: 3, title: `الحلقة الثالثة - البرهان الشرعي`, duration: '48:15', videoUrl: series.videoUrl },
    { id: 4, title: `الحلقة الرابعة - فجر القسط`, duration: '44:00', videoUrl: series.videoUrl },
  ];

  const handleWatchNow = (item: any) => {
    if (item.type === 'movie') {
      setActiveEpisode({
        title: item.title,
        videoUrl: item.videoUrl
      });
    } else {
      setSelectedSeries(item);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-600/10 text-yellow-500 rounded-full text-xs font-black border border-yellow-500/20 uppercase tracking-widest">
          <Sparkles size={16} /> الفن في خدمة القسط
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
          {cinema.title || "بيان الحق"}
        </h1>
        <p className="quran-font text-3xl text-yellow-500 italic">«وَبِالْوَالِدَيْنِ إِحْسَانًا»</p>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">{cinema.desc}</p>
        
        <div className="flex justify-center gap-4 pt-6">
          {Object.entries(cinema.categories || {}).map(([key, label]: [string, any]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-10 py-3 rounded-2xl font-black text-sm transition-all border ${filter === key ? 'bg-yellow-500 text-black border-yellow-500 shadow-xl shadow-yellow-500/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredItems.map((item: any) => (
          <ThreeDCard key={item.id}>
            <div className="bg-zinc-900 rounded-[3rem] overflow-hidden border border-zinc-800 shadow-2xl flex flex-col h-full group relative">
              <div className="relative aspect-[2/3] overflow-hidden bg-zinc-950">
                <AIImageGenerator 
                  prompt={`Dramatic movie poster, ${item.title}, showing a father's struggle and love, cinematic lighting, gold and dark green color grading`} 
                  aspectRatio="3:4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent flex flex-col justify-end p-10 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl text-yellow-500 border border-yellow-500/20">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-black">{item.rating || '9.9'}</span>
                    </div>
                    <span className="text-white/60 text-xs font-black tracking-widest">{item.year}</span>
                  </div>
                  <h3 className="text-4xl font-black text-white group-hover:text-yellow-500 transition-colors leading-tight">{item.title}</h3>
                </div>
                <div className="absolute top-6 left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                  {item.type === 'movie' ? <Film size={24} /> : <Tv size={24} />}
                </div>
              </div>
              
              <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                <p className="text-zinc-500 text-base leading-relaxed font-medium line-clamp-3 italic">"{item.desc}"</p>
                <div className="flex items-center justify-between text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-yellow-600" /> {item.duration || item.episodesCount}</span>
                  <span className="text-zinc-600">بيان الحق 2025</span>
                </div>
                <button 
                  onClick={() => handleWatchNow(item)}
                  className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all border ${item.type === 'series' ? 'bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700' : 'bg-yellow-600 text-white border-yellow-500 hover:bg-yellow-700 shadow-lg shadow-yellow-600/20'}`}
                >
                  {item.type === 'series' ? (
                    <>عرض الحلقات <List size={20} /></>
                  ) : (
                    <>شاهد الآن <Play size={20} fill="currentColor" /></>
                  )}
                </button>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>

      {/* Series Episodes Modal */}
      {selectedSeries && (
        <div className="fixed inset-0 z-[600] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
          <div className="max-w-6xl w-full h-full md:h-[85vh] bg-zinc-900 rounded-[3rem] border border-zinc-800 shadow-4xl flex flex-col md:flex-row overflow-hidden relative">
            <button 
              onClick={() => setSelectedSeries(null)}
              className="absolute top-8 left-8 z-10 p-4 bg-black/40 hover:bg-yellow-600 text-white rounded-2xl transition-all border border-white/10 shadow-2xl"
            >
              <X size={24} />
            </button>

            {/* Sidebar with Info */}
            <div className="w-full md:w-1/3 p-12 space-y-10 bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="inline-flex px-5 py-1.5 bg-yellow-600/10 text-yellow-500 text-[10px] font-black rounded-full border border-yellow-500/20 uppercase tracking-[0.3em]">
                  {selectedSeries.type === 'series' ? 'مسلسل درامي' : 'فيلم وثائقي'}
                </div>
                <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">{selectedSeries.title}</h2>
                <div className="flex items-center gap-6 text-zinc-500 text-sm font-black">
                  <span className="flex items-center gap-2"><Star size={14} className="text-yellow-500" fill="currentColor" /> {selectedSeries.rating}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} /> {selectedSeries.year}</span>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium italic">"{selectedSeries.desc}"</p>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-yellow-600/5 rounded-[2.5rem] border border-yellow-600/20 text-center">
                  <p className="quran-font text-2xl text-yellow-500 mb-2">«وَأَوْفُوا بِالْعَهْدِ»</p>
                  <p className="text-zinc-500 text-xs font-bold leading-relaxed">تُعرض هذه المواد لترسيخ قيم الأمانة والقوامة في المجتمع المصري.</p>
                </div>
              </div>
            </div>

            {/* Episodes List */}
            <div className="w-full md:w-2/3 p-12 overflow-y-auto space-y-8 bg-islamic-pattern">
              <h3 className="text-3xl font-black text-white mb-10 border-b border-zinc-800 pb-6 flex items-center gap-4">
                 قائمة الحلقات <span className="text-yellow-500 text-xs font-black bg-yellow-500/10 px-4 py-1 rounded-full border border-yellow-500/20">منهاج القسط</span>
              </h3>
              <div className="grid gap-6">
                {mockEpisodes(selectedSeries).map((ep) => (
                  <div 
                    key={ep.id}
                    onClick={() => setActiveEpisode(ep)}
                    className="flex items-center justify-between p-8 bg-zinc-800/30 hover:bg-zinc-800 rounded-[2.5rem] border border-white/5 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center text-zinc-500 group-hover:bg-yellow-500 group-hover:text-black transition-all shadow-xl">
                        <Play size={24} fill="currentColor" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white group-hover:text-yellow-500 transition-colors">{ep.title}</h4>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-2 mt-2"><Clock size={12} className="text-yellow-600" /> {ep.duration}</span>
                      </div>
                    </div>
                    <ChevronLeft size={28} className="text-zinc-700 group-hover:text-white transition-all group-hover:-translate-x-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Video Player Modal */}
      {activeEpisode && (
        <div className="fixed inset-0 z-[700] bg-black flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300 backdrop-blur-3xl">
           <div className="absolute top-10 left-10 flex gap-4">
             <button 
               onClick={() => setActiveEpisode(null)}
               className="p-5 bg-zinc-900 hover:bg-yellow-600 text-white rounded-2xl transition-all shadow-4xl border border-white/5"
             >
               <X size={32} />
             </button>
           </div>

           <div className="w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden border border-zinc-800 shadow-[0_0_200px_rgba(234,179,8,0.1)] bg-black relative">
              <iframe 
                src={`${activeEpisode.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeEpisode.title}
              ></iframe>
           </div>

           <div className="mt-12 text-center space-y-6">
              <div className="inline-flex px-6 py-1.5 bg-yellow-600/20 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                بيان الحق • البث الرسمي للمبادرة
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">{activeEpisode.title}</h2>
              <p className="quran-font text-3xl text-zinc-500 font-medium italic">«لِيَقُومَ النَّاسُ بِالْقِسْطِ»</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default CinemaPage;
