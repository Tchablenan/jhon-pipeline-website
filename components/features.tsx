'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { Link2, Compass, Factory, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

const icons = [Link2, Compass, Factory, HelpCircle];
const colors = [
  { bg: 'bg-cyan-500/10 dark:bg-cyan-500/5', icon: 'text-cyan-600 dark:text-cyan-400', hover: 'hover:border-cyan-500/40', shadow: 'group-hover:shadow-cyan-500/15', gradient: 'from-cyan-500 via-blue-500 to-indigo-500', glow: 'rgba(6, 182, 212, 0.15)' },
  { bg: 'bg-amber-500/10 dark:bg-amber-500/5', icon: 'text-amber-600 dark:text-amber-400', hover: 'hover:border-amber-500/40', shadow: 'group-hover:shadow-amber-500/15', gradient: 'from-amber-500 via-orange-500 to-red-500', glow: 'rgba(245, 158, 11, 0.15)' },
  { bg: 'bg-emerald-500/10 dark:bg-emerald-500/5', icon: 'text-emerald-600 dark:text-emerald-400', hover: 'hover:border-emerald-500/40', shadow: 'group-hover:shadow-emerald-500/15', gradient: 'from-emerald-500 via-teal-500 to-blue-500', glow: 'rgba(16, 185, 129, 0.15)' },
  { bg: 'bg-purple-500/10 dark:bg-purple-500/5', icon: 'text-purple-600 dark:text-purple-400', hover: 'hover:border-purple-500/40', shadow: 'group-hover:shadow-purple-500/15', gradient: 'from-purple-500 via-pink-500 to-red-500', glow: 'rgba(168, 85, 247, 0.15)' },
];

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-24 bg-background text-foreground border-b border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center gap-4 mb-20">
          <CustomBadge>{t.services.badge}</CustomBadge>
          <CustomTitle>{t.services.title}</CustomTitle>
          <CustomSubtitle className="text-muted-foreground max-w-[700px]">{t.services.subtitle}</CustomSubtitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            const c = colors[index];
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="group relative">
                <Card className={cn('h-full bg-card/40 backdrop-blur-md border border-border transition-all duration-500 p-8 relative overflow-hidden rounded-2xl group-hover:shadow-2xl text-foreground', c.hover)}>
                  <svg className="absolute -right-10 -bottom-10 size-48 text-zinc-400/10 dark:text-zinc-800/10 pointer-events-none group-hover:text-zinc-500/20 transition-colors duration-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="50" cy="50" r="40" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="30" />
                    <line x1="10" y1="50" x2="90" y2="50" />
                    <line x1="50" y1="10" x2="50" y2="90" />
                    <path d="M20,20 L80,80 M20,80 L80,20" />
                  </svg>
                  <CardContent className="p-0 relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className={cn('size-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative overflow-hidden border border-border', c.bg)}>
                        <Icon className={cn('size-6 relative z-10', c.icon)} />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-foreground tracking-tight mb-0.5">{service.stats}</div>
                        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{service.metric}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-4 leading-tight uppercase tracking-wide">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">{service.desc}</p>
                  </CardContent>
                  <div className={cn('absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left', c.gradient)} />
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl -z-10" style={{ backgroundImage: `radial-gradient(circle at top right, ${c.glow}, transparent 60%)` }} />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
