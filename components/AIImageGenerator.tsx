
import React from 'react';
import { imageDatabase } from '../imageDatabase';

interface AIImageGeneratorProps {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  staticKey?: keyof typeof imageDatabase;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ 
  prompt, 
  className = "w-full h-full",
  staticKey
}) => {
  // استخدام صورة من قاعدة البيانات بناءً على المفتاح أو اختيار صورة افتراضية ذكية بناءً على الكلمات المفتاحية
  const getImageUrl = () => {
    if (staticKey && imageDatabase[staticKey]) {
      return imageDatabase[staticKey];
    }
    
    // خوارزمية بسيطة لاختيار صورة مناسبة من القاعدة إذا لم يتم تحديد مفتاح
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('father') || lowerPrompt.includes('man')) return imageDatabase.fatherEmotional;
    if (lowerPrompt.includes('child')) return imageDatabase.childSafety;
    if (lowerPrompt.includes('law') || lowerPrompt.includes('justice') || lowerPrompt.includes('legal')) return imageDatabase.justiceScale;
    if (lowerPrompt.includes('campaign')) return imageDatabase.campaign1;
    // Fix: changed story1 to storyImage to match imageDatabase.ts
    if (lowerPrompt.includes('story')) return imageDatabase.storyImage;
    if (lowerPrompt.includes('blueprint') || lowerPrompt.includes('map')) return imageDatabase.blueprint;
    
    return imageDatabase.hero; // الافتراضي
  };

  const imageUrl = getImageUrl();

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <img 
        src={imageUrl} 
        className="w-full h-full object-cover transition-all duration-1000 brightness-[0.7] group-hover:brightness-[1] group-hover:scale-105" 
        alt={prompt} 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
    </div>
  );
};

export default AIImageGenerator;
