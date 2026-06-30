'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

const gradients = [
  { id: 'grad-cyan-blue', from: '#00e5ff', to: '#3b82f6' },
  { id: 'grad-blue-purple', from: '#3b82f6', to: '#8b5cf6' },
  { id: 'grad-amber-orange', from: '#f59e0b', to: '#ef4444' },
];

const TrustedBrands = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background border-b border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-3">
            {t.stats.sectionLabel}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="text-3xl lg:text-5xl font-black text-foreground uppercase tracking-tight">
            {t.stats.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.stats.items.map((stat, idx) => {
            const g = gradients[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="flex flex-col items-center p-8 bg-card/40 backdrop-blur-md rounded-2xl border border-border shadow-lg relative group overflow-hidden"
              >
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none blur-xl" style={{ backgroundImage: `radial-gradient(circle at center, ${g.from}, transparent 70%)` }} />

                <div className="relative mb-6">
                  <svg viewBox="0 0 100 100" className="size-32">
                    <defs>
                      <linearGradient id={g.id} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={g.from} />
                        <stop offset="100%" stopColor={g.to} />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" stroke="rgba(120,120,120,0.15)" strokeWidth="6" fill="transparent" />
                    <motion.circle cx="50" cy="50" r="40" stroke={`url(#${g.id})`} strokeWidth="6" fill="transparent" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} whileInView={{ strokeDashoffset: 251.2 - (251.2 * 95) / 100 }} transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }} viewport={{ once: true }} strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }} viewport={{ once: true }} className="text-2xl font-black text-foreground tracking-tight">
                      {stat.value}
                    </motion.span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 uppercase tracking-wide">{stat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
