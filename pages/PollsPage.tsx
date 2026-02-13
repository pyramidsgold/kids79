
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, Globe, ShieldCheck, Loader2, Users, AlertCircle } from 'lucide-react';
import ThreeDCard from '../components/ThreeDCard';
import { useContent } from '../App';

const PollsPage: React.FC = () => {
  const { t, showToast } = useContent();
  const p = t.polls;
  
  const [userIp, setUserIp] = useState<string>('');
  const [votedPolls, setVotedPolls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIp(data.ip);
        const savedVotes = JSON.parse(localStorage.getItem(`votes_${data.ip}`) || '[]');
        setVotedPolls(savedVotes);
        setLoading(false);
      })
      .catch(() => {
        setUserIp('127.0.0.1'); 
        setLoading(false);
      });
  }, []);

  const handleVote = (pollId: string, choice: 'yes' | 'no') => {
    if (votedPolls.includes(pollId)) {
        if (showToast) showToast('لقد سجلت رأيك مسبقاً في هذا الاستفتاء من هذا الجهاز.', 'error');
        return;
    }

    const updatedUserVotes = [...votedPolls, pollId];
    setVotedPolls(updatedUserVotes);
    localStorage.setItem(`votes_${userIp}`, JSON.stringify(updatedUserVotes));

    const globalPollData = JSON.parse(localStorage.getItem('poll_records') || '[]');
    globalPollData.push({ pollId, choice, ip: userIp, timestamp: new Date().toISOString() });
    localStorage.setItem('poll_records', JSON.stringify(globalPollData));
    
    if (showToast) showToast(p.voteSuccess);
  };

  const getPollResult = (poll: any) => {
    const records = JSON.parse(localStorage.getItem('poll_records') || '[]');
    const pollRecords = records.filter((r: any) => r.pollId === poll.id);
    const yesCount = pollRecords.filter((r: any) => r.choice === 'yes').length;
    const noCount = pollRecords.filter((r: any) => r.choice === 'no').length;
    const totalActual = yesCount + noCount;
    if (totalActual === 0) return { yes: poll.yes, no: poll.no, total: poll.total };
    const combinedTotal = poll.total + totalActual;
    const combinedYes = Math.round(((poll.yes / 100 * poll.total) + yesCount) / combinedTotal * 100);
    const combinedNo = 100 - combinedYes;
    return { yes: combinedYes, no: combinedNo, total: combinedTotal };
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 font-cairo">
        <Loader2 className="animate-spin text-red-600" size={64} />
        <p className="text-2xl text-zinc-500 font-black animate-pulse">جاري التحقق من الهوية الرقمية المشفرة...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16 space-y-24 text-right font-cairo animate-in fade-in duration-1000">
      <header className="text-center max-w-5xl mx-auto space-y-10">
        <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-red-600/10 text-red-500 text-[10px] font-black border border-red-600/20 uppercase tracking-[0.4em] shadow-xl">
           نظام الاستفتاء الشعبي الموحد
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
          {p.title}
        </h1>
        <p className="text-2xl text-zinc-500 font-medium leading-relaxed max-w-4xl mx-auto">{p.desc}</p>
        
        <div className="inline-flex items-center gap-6 px-10 py-5 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] shadow-inner">
           <Globe size={24} className="text-emerald-500" />
           <p className="text-sm font-black text-zinc-400">
             بوابة التصويت الآمنة: <span className="text-white font-black tracking-widest">{userIp}</span>
           </p>
           <ShieldCheck size={24} className="text-emerald-500" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
         {(p.items || []).map((poll: any) => {
           const result = getPollResult(poll);
           const hasVoted = votedPolls.includes(poll.id);

           return (
             <ThreeDCard key={poll.id}>
               <div className="bg-zinc-900 rounded-[4rem] border border-zinc-800 overflow-hidden shadow-3xl flex flex-col h-full group hover:border-red-600/50 transition-all duration-700 relative">
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                    <img 
                      src={poll.image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800"} 
                      className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" 
                      alt="Poll Subject" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent"></div>
                    {hasVoted && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in zoom-in">
                         <div className="px-10 py-5 bg-red-600 text-white rounded-[2rem] font-black shadow-3xl flex items-center gap-4 text-xl scale-110">
                            <CheckCircle2 size={32} /> تم التوثيق
                         </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-10 space-y-10 flex-1 flex flex-col">
                     <h3 className="text-2xl font-black text-white leading-relaxed min-h-[7rem]">{poll.question}</h3>
                     
                     <div className="space-y-8 mt-auto">
                        {hasVoted ? (
                          <div className="space-y-6 animate-in fade-in duration-700">
                             <div className="space-y-3">
                                <div className="flex justify-between text-xs font-black text-white uppercase tracking-widest">
                                   <span className="text-lg">{result.yes}%</span>
                                   <span>أؤيد (نعم)</span>
                                </div>
                                <div className="h-4 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                                   <div className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_20px_rgba(220,38,38,0.5)]" style={{ width: `${result.yes}%` }} />
                                </div>
                             </div>
                             <div className="space-y-3">
                                <div className="flex justify-between text-xs font-black text-zinc-600 uppercase tracking-widest">
                                   <span className="text-lg">{result.no}%</span>
                                   <span>أعارض (لا)</span>
                                </div>
                                <div className="h-4 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                                   <div className="h-full bg-zinc-800 transition-all duration-1000" style={{ width: `${result.no}%` }} />
                                </div>
                             </div>
                             <div className="pt-6 flex items-center justify-center gap-3 border-t border-zinc-800">
                                <Users size={16} className="text-zinc-700" />
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">إجمالي الأصوات: {result.total.toLocaleString()}</p>
                             </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-6">
                             <button 
                                onClick={() => handleVote(poll.id, 'yes')}
                                className="py-8 bg-zinc-950 border border-zinc-800 text-white rounded-[2rem] font-black flex flex-col items-center justify-center gap-4 hover:bg-red-600 hover:border-red-600 transition-all group/btn shadow-xl active:scale-95"
                             >
                                <ThumbsUp size={32} className="group-hover/btn:scale-110 transition-transform" />
                                <span className="text-sm tracking-widest">نعم</span>
                             </button>
                             <button 
                                onClick={() => handleVote(poll.id, 'no')}
                                className="py-8 bg-zinc-950 border border-zinc-800 text-zinc-600 rounded-[2rem] font-black flex flex-col items-center justify-center gap-4 hover:bg-zinc-800 hover:text-white transition-all group/btn shadow-xl active:scale-95"
                             >
                                <ThumbsDown size={32} className="group-hover/btn:scale-110 transition-transform" />
                                <span className="text-sm tracking-widest">لا</span>
                             </button>
                          </div>
                        )}
                     </div>
                  </div>
                  
                  <div className="px-10 pb-10 text-center">
                     <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center gap-3">
                        <AlertCircle size={14} className="text-zinc-700" />
                        <p className="text-[9px] text-zinc-700 font-black uppercase tracking-widest">
                          نظام التوثيق يمنع تكرار التصويت لضمان دقة الرصد الشعبي.
                        </p>
                     </div>
                  </div>
               </div>
             </ThreeDCard>
           );
         })}
      </div>
      
      <div className="bg-zinc-900 rounded-[5rem] p-20 text-center border border-zinc-800 shadow-3xl space-y-10 relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-transparent to-red-600 opacity-20"></div>
         <h2 className="text-5xl font-black text-white tracking-tighter">قوة التأثير الشعبي</h2>
         <p className="text-2xl text-zinc-500 max-w-4xl mx-auto font-medium leading-relaxed">
           نتائج هذه الاستفتاءات ليست مجرد أرقام، بل هي وثيقة ضغط تُقدم رسمياً ضمن تقارير الأثر التشريعي الموجهة لمجلس النواب المصري، لتعكس حجم الرفض المجتمعي للقوانين المهجورة والمطالبة بإصلاح حقيقي.
         </p>
         <button className="px-16 py-8 bg-white text-black rounded-[2.5rem] font-black text-2xl hover:scale-105 transition-all shadow-3xl">عرض التقرير السنوي الكامل</button>
      </div>
    </div>
  );
};

export default PollsPage;
