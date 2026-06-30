'use client';

import { motion } from 'framer-motion';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { ShieldCheck, Award, Users, Handshake, Flame, HardHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

const highlightIcons = [Flame, Award, ShieldCheck, Handshake];
const highlightColors = [
  { color: 'text-orange-500', glow: 'group-hover:shadow-orange-500/10' },
  { color: 'text-cyan-500',   glow: 'group-hover:shadow-cyan-500/10' },
  { color: 'text-emerald-500', glow: 'group-hover:shadow-emerald-500/10' },
  { color: 'text-blue-500',   glow: 'group-hover:shadow-blue-500/10' },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background text-foreground border-b border-border/50 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center gap-4 mb-20">
          <CustomBadge>{t.about.badge}</CustomBadge>
          <CustomTitle>{t.about.title}</CustomTitle>
          <CustomSubtitle className="text-muted-foreground">{t.about.subtitle}</CustomSubtitle>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left image */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg">
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none z-10" />
              <img src="https://www.jhonpipeline.com/wp-content/uploads/2024/12/Jhon-Pipeline-2.jpg" alt="Chantier Jhon Pipeline" className="w-full h-[420px] object-cover" />
              <div className="absolute top-5 right-5 bg-white rounded-xl p-2 shadow-lg z-10">
                <img src="https://www.jhonpipeline.com/wp-content/uploads/2024/12/logo-jhon-pipeline-copie.jpg" alt="Logo JHON PIPELINE" className="h-12 w-auto object-contain rounded-md" />
              </div>
              <div className="absolute bottom-5 left-5 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md border border-border rounded-xl px-4 py-3 flex items-center gap-3 z-10">
                <div className="size-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <HardHat className="size-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground uppercase tracking-wider">{t.about.since}</div>
                  <div className="text-lg font-black text-cyan-600 dark:text-cyan-400">+20 ans</div>
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="absolute -bottom-8 -right-6 w-48 h-32 rounded-xl overflow-hidden border-4 border-background shadow-xl hidden lg:block">
              <img src="https://www.jhonpipeline.com/wp-content/uploads/2024/12/Jhon-Pipeline-32.jpg" alt="Équipe Jhon Pipeline" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Right text */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Users className="size-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{t.about.historyLabel}</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-foreground leading-tight">
              {t.about.historyTitle.replace(t.about.historyTitleHighlight, '')}{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                {t.about.historyTitleHighlight}
              </span>
            </h3>
            <p className="text-muted-foreground leading-relaxed">{t.about.p1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.about.p2}</p>
            <p className="text-muted-foreground leading-relaxed">{t.about.p3}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {t.about.miniStats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-card/60 border border-border/50">
                  <div className="text-xl font-black text-cyan-600 dark:text-cyan-400">{stat.value}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.about.highlights.map((item, index) => {
            const Icon = highlightIcons[index];
            const style = highlightColors[index];
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className={cn('group p-6 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:border-border hover:shadow-lg', style.glow)}>
                <div className={cn('size-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4', style.color)}>
                  <Icon className="size-6" />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
