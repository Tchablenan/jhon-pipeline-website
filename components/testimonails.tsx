'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Marquee from '@/components/ui/marquee';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import { useLanguage } from '@/contexts/language-context';

const logoMap: Record<string, string> = {
  'Bureau Veritas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bureau_Veritas_logo.svg/320px-Bureau_Veritas_logo.svg.png',
};

const avatarColors = [
  'from-cyan-500 to-blue-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-indigo-600',
  'from-rose-500 to-pink-600',
];

const TestimonialCard = ({ name, designation, company, content, index }: { name: string; designation: string; company: string; content: string; index: number }) => {
  const [imgErr, setImgErr] = useState(false);
  const logo = logoMap[company];
  const initials = company.slice(0, 2).toUpperCase();
  const gradient = avatarColors[index % avatarColors.length];

  return (
    <div className="flex-shrink-0 w-[350px] bg-card/40 backdrop-blur-md rounded-2xl p-6 border border-border/50 shadow-md mx-1.5 flex flex-col justify-between group transition-all duration-300 hover:border-cyan-500/20">
      <p className="text-muted-foreground mb-6 font-medium text-sm leading-relaxed">"{content}"</p>
      <div className="flex items-center gap-4 border-t border-border/30 pt-4 mt-auto">
        <div className="size-12 rounded-xl flex-shrink-0 overflow-hidden border border-border bg-white dark:bg-zinc-900 flex items-center justify-center">
          {logo && !imgErr ? (
            <img src={logo} alt={company} className="w-full h-full object-contain p-1.5" onError={() => setImgErr(true)} />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <span className="text-white text-sm font-black tracking-tight">{initials}</span>
            </div>
          )}
        </div>
        <div>
          <div className="font-bold text-foreground text-sm leading-tight">{name}</div>
          <div className="text-[11px] text-muted-foreground">{designation}</div>
          <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mt-0.5">{company}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  const firstColumn = t.testimonials.items.slice(0, 3);
  const secondColumn = t.testimonials.items.slice(3, 5);

  return (
    <section className="py-24 bg-background overflow-hidden border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center gap-4 mb-16">
          <CustomBadge>{t.testimonials.badge}</CustomBadge>
          <CustomTitle>{t.testimonials.title}</CustomTitle>
          <CustomSubtitle className="text-muted-foreground">{t.testimonials.subtitle}</CustomSubtitle>
        </motion.div>
      </div>

      <div className="w-full mx-auto px-6">
        <motion.div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-1.5 mx-auto" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <Marquee pauseOnHover className="[--duration:40s] grow">
            {firstColumn.map((item, i) => <TestimonialCard key={i} {...item} index={i} />)}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s] grow">
            {secondColumn.map((item, i) => <TestimonialCard key={i} {...item} index={i + 3} />)}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 start-0 w-1/12 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-1/12 bg-gradient-to-l from-background" />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
