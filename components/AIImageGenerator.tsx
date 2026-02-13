
import React, { useState, useEffect } from 'react';
import { Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AIImageGeneratorProps {
  prompt: string;
  className?: string;
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ 
  prompt, 
  className = "w-full h-full",
  aspectRatio = "1:1"
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const generateImage = async () => {
      setLoading(true);
      setError(false);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Highly descriptive prompt for consistent "Mithaq" aesthetic
        const enhancedPrompt = `Ultra-realistic cinematic 3D masterpiece. Subject: ${prompt}. 
        Aesthetic: Grand Islamic architecture, majesty, fatherly strength and dignity. 
        Lighting: Dramatic rim lighting, volumetric dust particles, royal emerald green and antique 24k gold color palette. 
        Technical: 8k resolution, shot on 35mm lens, f/1.8, highly detailed skin and fabric textures, sacred geometry patterns in the background.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: enhancedPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio
            }
          }
        });

        if (!isMounted) return;

        let generatedBase64 = null;
        if (response.candidates && response.candidates[0].content.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              generatedBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
              break;
            }
          }
        }

        if (generatedBase64) {
          setImageUrl(generatedBase64);
        } else {
          throw new Error("No image data returned");
        }
      } catch (err) {
        console.error("AI Image Generation Error:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generateImage();
    return () => { isMounted = false; };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`${className} bg-zinc-950 flex flex-col items-center justify-center space-y-6 relative overflow-hidden min-h-[300px]`}>
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150 animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
          <div className="text-center">
            <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] quran-font">جارٍ استحضار الرؤية الفنية</p>
            <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Mithaq AI Vision v3.0</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`${className} bg-zinc-900 flex items-center justify-center border border-white/5 min-h-[300px]`}>
        <div className="text-center space-y-3 opacity-30">
          <ImageIcon size={40} className="mx-auto text-zinc-500" />
          <p className="text-[10px] font-bold text-zinc-600">تعذر عرض الرؤية الفنية حالياً</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <img 
        src={imageUrl} 
        className="w-full h-full object-cover transition-all duration-1000 animate-in fade-in zoom-in-95 brightness-[0.7] group-hover:brightness-[1] group-hover:scale-110" 
        alt={prompt} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60"></div>
      <div className="absolute bottom-6 right-6 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[9px] font-black text-yellow-500/80 uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={12} /> Mithaq AI Imagine
        </p>
      </div>
    </div>
  );
};

export default AIImageGenerator;
