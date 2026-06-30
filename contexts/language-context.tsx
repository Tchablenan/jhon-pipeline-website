'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fr } from '@/locales/fr';
import { en } from '@/locales/en';
import type { Locale } from '@/locales/fr';

type Lang = 'fr' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Locale;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'fr',
  setLang: () => {},
  t: fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('jp-lang') as Lang | null;
    if (saved === 'fr' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('jp-lang', l);
  };

  const t = lang === 'en' ? en : fr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
