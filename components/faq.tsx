'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CustomBadge } from '@/components/custom/badge';
import { CustomTitle } from '@/components/custom/title';
import { CustomSubtitle } from '@/components/custom/subtitle';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background border-b border-border/50" id="faq">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex items-center justify-center flex-col text-center gap-5 mb-20">
          <CustomBadge>{t.faq.badge}</CustomBadge>
          <CustomTitle>{t.faq.title}</CustomTitle>
          <CustomSubtitle>{t.faq.subtitle}</CustomSubtitle>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faq.items.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                <AccordionItem value={`item-${index}`} className="bg-background rounded-lg border border-border px-6 hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-start font-semibold text-foreground hover:text-cyan-600 data-[state=open]:text-cyan-600 transition-colors cursor-pointer">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/95 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="flex flex-col justify-center items-center gap-1.5 text-center mt-12">
          <span className="text-muted-foreground">{t.faq.contact}</span>
          <Link href="#contact" className="text-cyan-600 hover:text-cyan-700 transition-colors hover:underline font-bold">
            {t.faq.contactLink}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
