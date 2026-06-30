'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { Button } from '@/components/ui/button';
import { Heart, ShieldCheck, Lightbulb, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

const stepIcons = [Heart, ShieldCheck, Lightbulb];
const stepColors = [
  'from-cyan-500 via-blue-500 to-indigo-500',
  'from-blue-500 to-indigo-500',
  'from-indigo-500 to-amber-500',
];
const stepImages = [
  'https://www.jhonpipeline.com/wp-content/uploads/2024/12/Jhon-Pipeline-2.jpg',
  'https://www.jhonpipeline.com/wp-content/uploads/2024/12/Jhon-Pipeline-32.jpg',
  'https://www.jhonpipeline.com/wp-content/uploads/revslider/media-carousel-autoplay1/IMG_0634.jpg',
];

const HowItWorks = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveStep((prev) => (prev + 1) % t.values.items.length), 7000);
    return () => clearInterval(timer);
  }, [t.values.items.length]);

  return (
    <section id="how-it-works" className="py-24 bg-background text-foreground border-b border-border/50 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center gap-4 mb-20">
          <CustomBadge>{t.values.badge}</CustomBadge>
          <CustomTitle>{t.values.title}</CustomTitle>
          <CustomSubtitle className="text-muted-foreground">{t.values.subtitle}</CustomSubtitle>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left selectors */}
          <div className="lg:col-span-5 space-y-6 relative">
            <div className="absolute left-[38px] top-6 bottom-6 w-[8px] bg-zinc-200 dark:bg-zinc-900 rounded-full hidden md:block overflow-hidden">
              <motion.div className="w-full bg-gradient-to-b from-cyan-500 via-blue-500 to-amber-500 rounded-full" initial={{ height: '0%' }} animate={{ height: activeStep === 0 ? '33%' : activeStep === 1 ? '66%' : '100%' }} transition={{ duration: 0.8, ease: 'easeInOut' }} style={{ minHeight: '20px' }} />
            </div>

            {t.values.items.map((step, index) => {
              const Icon = stepIcons[index];
              const isActive = index === activeStep;
              return (
                <div key={step.title} onClick={() => setActiveStep(index)} className={cn('flex gap-6 p-6 rounded-2xl border transition-all duration-500 cursor-pointer relative group', isActive ? 'bg-card/60 dark:bg-zinc-900/60 border-border shadow-xl' : 'bg-transparent border-transparent hover:bg-card/20 dark:hover:bg-zinc-900/20 hover:border-border')}>
                  {isActive && <motion.div layoutId="active-border" className="absolute inset-0 rounded-2xl border border-cyan-500/30 pointer-events-none" transition={{ duration: 0.5 }} />}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={cn('size-12 rounded-xl flex items-center justify-center border transition-all duration-500', isActive ? 'bg-background border-cyan-500 dark:border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'bg-card border-border group-hover:border-zinc-300 dark:group-hover:border-zinc-700')}>
                      <Icon className={cn('size-5 transition-colors duration-500', isActive ? 'text-cyan-500 dark:text-cyan-400' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300')} />
                    </div>
                  </div>
                  <div className="space-y-1 relative z-10 w-full">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">{t.values.valueLabel} 0{index + 1}</span>
                    <h3 className={cn('text-xl font-bold transition-colors duration-500', isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground')}>{step.title}</h3>
                    <span className="text-xs font-semibold text-muted-foreground block">{step.subtitle}</span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="text-sm text-muted-foreground leading-relaxed pt-2 overflow-hidden">
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right image */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            <div className="absolute size-96 rounded-full border border-zinc-200 dark:border-zinc-900/50 -z-10 animate-[spin_40s_linear_infinite]" />
            <div className="absolute size-80 rounded-full border border-dashed border-zinc-200 dark:border-zinc-900/30 -z-10 animate-[spin_20s_linear_infinite_reverse]" />
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl p-2 bg-card/30 backdrop-blur-md">
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-500/60 pointer-events-none z-20" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-500/60 pointer-events-none z-20" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-500/60 pointer-events-none z-20" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-500/60 pointer-events-none z-20" />
              <div className="w-full h-full rounded-lg overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img key={activeStep} src={stepImages[activeStep]} alt={t.values.items[activeStep].title} className="w-full h-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6, ease: 'easeInOut' }} />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">{t.values.tag}</span>
                  <h4 className="text-xl font-bold uppercase tracking-tight">{t.values.items[activeStep].title}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 relative z-10">
          <Button size="lg" variant="outline" className="px-8 bg-card hover:bg-zinc-100 dark:hover:bg-zinc-900 border-border text-foreground hover:text-foreground rounded-xl font-semibold cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>{t.values.cta}</span>
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
