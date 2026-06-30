'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Award, ShieldCheck, Flame } from 'lucide-react';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';
import { WordRotate } from '@/components/magicui/word-rotate';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Star } from '@/components/custom/star';
import { useLanguage } from '@/contexts/language-context';

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const people = t.hero.team.map((member, i) => ({
    id: i + 1,
    name: member.name,
    designation: member.role,
    image: [
      'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0630-Copy.jpg',
      'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0636.jpg',
      'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/PHOTO-2024-09-10-13-56-57-1.jpg',
      'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0634.jpg',
    ][i],
  }));

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left - rect.width / 2) / rect.width, y: (e.clientY - rect.top - rect.height / 2) / rect.height });
  };

  return (
    <section
      className="relative lg:min-h-screen bg-background text-foreground pt-28 pb-20 lg:pt-44 lg:pb-24 overflow-hidden group font-sans"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, #00e5ff 1px, transparent 1px), linear-gradient(to bottom, #00e5ff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)] pointer-events-none" />

      {/* Floating sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full filter blur-[2px] ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-amber-500'}`}
            style={{ width: Math.random() * 6 + 3, height: Math.random() * 6 + 3, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.6 + 0.2 }}
            animate={{ y: [0, -100 - Math.random() * 150], x: [0, (Math.random() - 0.5) * 60], opacity: [0, 0.8, 0], scale: [1, 1.5, 0.5] }}
            transition={{ duration: Math.random() * 5 + 4, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 4 }}
          />
        ))}
      </div>

      {/* Gradient glows */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <motion.div className="absolute left-[15%] top-[20%] w-[380px] h-[380px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[80px]" animate={{ x: mouse.x * 60, y: mouse.y * 40, scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute right-[15%] top-[25%] w-[420px] h-[420px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[90px]" animate={{ x: mouse.x * -70, y: mouse.y * 30, scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute left-[38%] bottom-[15%] w-[350px] h-[350px] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[75px]" animate={{ x: mouse.x * 40, y: mouse.y * -50 }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">

          {/* Cert badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg relative group overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Award className="size-4 text-cyan-500 dark:text-cyan-400 animate-pulse" />
            <span>{t.hero.certBadge}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5 animate-ping" />
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center text-4xl lg:text-8xl font-black mb-6 leading-none tracking-tight uppercase">
            <span className="bg-gradient-to-r from-zinc-800 via-zinc-900 to-black dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-400 bg-clip-text text-transparent">
              {t.hero.titlePrefix}
            </span>
            <WordRotate
              words={[...t.hero.rotatingWords]}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 dark:from-cyan-400 dark:via-blue-500 dark:to-amber-500 bg-clip-text text-transparent w-full md:w-auto md:min-w-[650px] lg:min-w-[850px] text-center md:text-left font-black"
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-[850px] mx-auto leading-relaxed">
            <strong>{t.hero.subtitleBold}</strong> {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button size="lg" className="w-full sm:w-auto px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold tracking-wide rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.getQuote}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-foreground rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2" asChild>
              <Link href="#features"><span>{t.hero.ourServices}</span></Link>
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col items-center gap-3 mb-16">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex -space-x-3.5 me-2.5">
                <AnimatedTooltip items={people} />
              </div>
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 px-3 py-1 rounded-lg">
                <ShieldCheck className="size-4 text-emerald-500 dark:text-emerald-400" />
                <span className="text-zinc-700 dark:text-zinc-300 text-sm font-semibold">{t.hero.safetyBadge}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 px-3 py-1 rounded-lg">
                <Flame className="size-4 text-amber-500" />
                <span className="text-zinc-700 dark:text-zinc-300 text-sm font-semibold">{t.hero.ndtBadge}</span>
              </div>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }} className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 shadow-2xl shadow-cyan-500/5 p-2 bg-zinc-100/30 dark:bg-zinc-900/30 backdrop-blur-md">
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/60 dark:border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-500/60 dark:border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-500/60 dark:border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-500/60 dark:border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-4 left-10 text-[9px] font-mono text-zinc-500 pointer-events-none tracking-widest hidden md:block">SYSTEM: ACTIVE // HSE_NORMS: CONFORM</div>
            <div className="absolute bottom-4 left-10 text-[9px] font-mono text-zinc-500 pointer-events-none tracking-widest hidden md:block">WELDING_SPEC: ASME_IX // QUALITY_ASSURANCE: Bureau_Veritas</div>
            {mounted && (
              <HeroVideoDialog
                trigger={
                  <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 hover:from-blue-600/35 hover:to-cyan-500/35 transition-all duration-300 backdrop-blur-md rounded-full p-4 shadow-lg cursor-pointer">
                    <div className="bg-white dark:bg-zinc-950/80 hover:bg-zinc-100 dark:hover:bg-zinc-950 rounded-full p-4 shadow-lg border border-zinc-200 dark:border-zinc-800/80 transition-colors">
                      <Play className="size-8 text-cyan-500 dark:text-cyan-400 fill-cyan-500 dark:fill-cyan-400 ml-1" />
                    </div>
                  </div>
                }
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/3K528eY9kR0"
                thumbnailSrc="https://www.jhonpipeline.com/wp-content/uploads/2024/12/Jhon-Pipeline-2.jpg"
                thumbnailAlt={t.hero.videoAlt}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
