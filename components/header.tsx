'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { Drawer, DrawerTitle, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const navKeys = ['home', 'about', 'values', 'services', 'gallery', 'faq', 'contact'] as const;
  const navLabels: Record<typeof navKeys[number], string> = {
    home: t.nav.home,
    about: t.nav.about,
    values: t.nav.values,
    services: t.nav.services,
    gallery: t.nav.gallery,
    faq: t.nav.faq,
    contact: t.nav.contact,
  };
  const sectionMap: Record<typeof navKeys[number], string> = {
    home: 'home',
    about: 'about',
    values: 'how-it-works',
    services: 'features',
    gallery: 'gallery',
    faq: 'faq',
    contact: 'contact',
  };

  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY < 50) { setActiveSection('home'); return; }
      const sections = ['about', 'how-it-works', 'features', 'gallery', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) setActiveSection(section);
            return;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleNavClick = (key: typeof navKeys[number]) => {
    setIsOpen(false);
    if (key === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(sectionMap[key]);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isActive = (key: typeof navKeys[number]) => activeSection === sectionMap[key];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled ? 'bg-background/60 backdrop-blur-sm shadow-xs' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-2.5">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navKeys.map((key, index) => (
              <motion.button
                key={key}
                onClick={() => handleNavClick(key)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
                className={cn(
                  'cursor-pointer transition-colors relative group font-semibold',
                  isActive(key)
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-accent-foreground hover:text-cyan-600 dark:hover:text-cyan-400'
                )}
              >
                {navLabels[key]}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all ${isActive(key) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </motion.button>
            ))}
            <Button
              variant="default"
              className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={() => handleNavClick('contact')}
            >
              {t.nav.getQuote}
            </Button>
          </nav>

          {/* Mobile nav */}
          <div className="md:hidden flex items-center space-x-4">
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground" variant="ghost" size="icon">
                  <Menu className="size-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-6 pb-8">
                <DrawerTitle />
                <nav className="flex flex-col space-y-4 mt-6">
                  {navKeys.map((key) => (
                    <Button
                      key={key}
                      onClick={() => handleNavClick(key)}
                      variant="ghost"
                      className={cn(
                        'w-full justify-start hover:text-cyan-600 dark:hover:text-cyan-400',
                        isActive(key) && 'text-cyan-600 dark:text-cyan-400 font-medium'
                      )}
                    >
                      {navLabels[key]}
                    </Button>
                  ))}
                  <div className="pt-4">
                    <RainbowButton className="w-full" onClick={() => handleNavClick('contact')}>
                      {t.nav.getQuote}
                    </RainbowButton>
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Lang toggle */}
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setLang('fr')}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200',
                lang === 'fr'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200',
                lang === 'en'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              EN
            </button>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <Button
              className="cursor-pointer text-muted-foreground hover:bg-transparent hover:text-foreground"
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {resolvedTheme === 'dark' ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-blue-600" />}
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
