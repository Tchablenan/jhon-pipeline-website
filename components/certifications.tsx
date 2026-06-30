'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

const logoMap: Record<string, string> = {
  'Bureau Veritas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bureau_Veritas_logo.svg/320px-Bureau_Veritas_logo.svg.png',
};

const Certifications = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 bg-zinc-50 dark:bg-zinc-950 border-b border-border/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-6">
          {t.certifications.label}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {t.certifications.items.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-cyan-500/30 transition-all duration-300 group"
            >
              {logoMap[cert.name] ? (
                <img src={logoMap[cert.name]} alt={cert.name} className="h-7 w-auto object-contain" />
              ) : (
                <div className="h-8 w-14 rounded-md bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center">
                  <span className="text-white text-[10px] font-black tracking-tight">{cert.name.split(' ')[0]}</span>
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-foreground leading-none">{cert.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{cert.tag}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
