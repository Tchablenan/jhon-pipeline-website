'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Boxes } from '@/components/ui/background-boxes';
import { useLanguage } from '@/contexts/language-context';

const CallToAction = () => {
  const { t } = useLanguage();

  return (
    <section className="h-96 relative w-full overflow-hidden bg-zinc-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-zinc-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-6">
            {t.cta.label}
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-white mb-10">
            {t.cta.title}
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
            <Button
              size="lg"
              className="font-bold bg-cyan-500 hover:bg-cyan-400 text-zinc-950 border-0 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transition-all duration-300 cursor-pointer px-10 rounded-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.cta.button}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
