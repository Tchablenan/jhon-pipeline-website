'use client';

import { motion } from 'framer-motion';
import { X, Linkedin, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/logo';
import { useLanguage } from '@/contexts/language-context';

const Footer = () => {
  const { t, lang } = useLanguage();

  const links: Record<string, { label: string; href: string }[]> = {
    [t.footer.colServices]: [
      { label: t.services.items[0].title, href: '#features' },
      { label: t.services.items[1].title, href: '#features' },
      { label: t.services.items[2].title, href: '#features' },
      { label: t.services.items[3].title, href: '#features' },
    ],
    [t.footer.colCompany]: [
      { label: t.nav.home, href: '#' },
      { label: t.nav.about, href: '#about' },
      { label: t.nav.services, href: '#features' },
      { label: t.nav.gallery, href: '#gallery' },
      { label: t.nav.contact, href: '#contact' },
    ],
    [t.footer.colSupport]: [
      { label: '+225 25 23 00 31 26', href: 'tel:+22525230031 26' },
      { label: `${lang === 'fr' ? 'Urgence' : 'Emergency'}: +225 07 13 24 24 86`, href: 'tel:+2250713242486' },
      { label: 'Yopougon Zone Industrielle', href: 'https://maps.google.com/?q=Yopougon+Zone+Industrielle+Abidjan' },
      { label: 'infos@jhonpipeline.com', href: 'mailto:infos@jhonpipeline.com' },
    ],
  };

  const socialLinks = [
    { icon: X, href: '#', label: 'X (Twitter)' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:infos@jhonpipeline.com', label: 'Email' }
  ];

  return (
    <footer className="bg-background relative overflow-hidden">
      <div className="container px-6 mx-auto pt-14 pb-6 border-b border-border/50">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="lg:w-1/3 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3">
                <Logo />
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                {t.footer.description}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="size-9 border border-border/60 text-muted-foreground rounded-md flex items-center justify-center hover:text-cyan-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="size-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="w-full grow lg:w-auto lg:grow-0 lg:w-2/3 flex justify-end">
            <div className="w-full lg:w-auto flex justify-between flex-wrap lg:grid lg:grid-cols-3 gap-8 lg:gap-16">
              {Object.entries(links).map(([category, items], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-medium text-base mb-4 uppercase tracking-wider text-muted-foreground/80">{category}</h3>
                  <ul className="text-base space-y-2">
                    {items.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-accent-foreground hover:text-cyan-600 transition-colors hover:underline"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-border/50" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            {t.footer.copyright}
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            {t.footer.designedBy}{' '}
            <a href="https://www.genuineserviceprovider.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-cyan-600 hover:underline font-bold">
              GSP – Genuine Service Provider
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
