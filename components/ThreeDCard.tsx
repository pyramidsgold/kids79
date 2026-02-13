
import React from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`group perspective-2000 ${className}`}>
      <div className="relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] preserve-3d group-hover:[transform:rotateX(6deg)rotateY(-6deg)scale(1.03)] rounded-[3rem]">
        {/* Realistic Depth Shadow */}
        <div className="absolute -inset-2 bg-gradient-to-br from-yellow-500/10 via-transparent to-emerald-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        {/* Reflection Highlight */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>

        {/* Inner Content with Border Glow */}
        <div className="relative z-10 bg-[#0a0a0a] rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] group-hover:border-yellow-500/20 transition-all duration-700 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ThreeDCard;
