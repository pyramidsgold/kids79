
import React from 'react';
import { Play, User, Calendar, Quote, MessageCircle, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';
import AIImageGenerator from '../components/AIImageGenerator';

const StoriesPage: React.FC = () => {
  const { t, showToast } = useContent();
  const navigate = useNavigate();
  const sp = t?.storiesPage || { items: [] };
  const stories = sp.items || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 text-right font-cairo">
      <header className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          {sp.title || "قصص المعاناة"}
        </h1>
        <p className="text-xl text-zinc-500 font-medium leading-relaxed">
          {sp.desc}
        </p>
        <div className="quran-font p-6 bg-yellow-900/10 border border-yellow-500/20 rounded-[2rem] text-yellow-500 text-2xl font-bold max-w-2xl mx-auto text-center italic">
          «إِنَّ اللَّهَ مَعَ الصَّابِرِينَ»
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stories.map((story: any) => (
          <ThreeDCard key={story.id}>
            <div 
              onClick={() => navigate(`/stories/${story.id}`)}
              className="bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-800 group cursor-pointer h-full flex flex-col transition-all hover:border-yellow-500/50 duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <AIImageGenerator prompt={`A sad but dignified father looking at a distance, emotional storytelling, ${story.title}`} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-yellow-600/80 flex items-center justify-center text-white border border-white/20">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-yellow-500 transition-colors leading-tight">{story.title}</h3>
                <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-1 font-medium">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                  <span className="text-yellow-600 font-black text-sm flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest">
                    مطالعة القصة <ArrowLeft size={16} />
                  </span>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <User size={14} /> <span className="text-[10px] font-bold">{story.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </ThreeDCard>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
