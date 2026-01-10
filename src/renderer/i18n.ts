import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';
import koTranslation from './locales/ko/translation.json';

export const SUPPORTED_LANGUAGES = {
  system: 'system',
  en: 'en',
  ko: 'ko',
  ja: 'ja',
} as const;

export type Language = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: Language = 'system';

const resources = {
  en: { translation: enTranslation },
  ko: { translation: koTranslation },
  ja: { translation: jaTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'gitchan-language',
    },
  });

export function changeLanguage(language: Language): void {
  if (language === 'system') {
    const systemLanguage = navigator.language.split('-')[0];
    const supportedLang = Object.keys(resources).includes(systemLanguage)
      ? systemLanguage
      : 'en';
    i18n.changeLanguage(supportedLang);
    localStorage.removeItem('gitchan-language');
  } else {
    i18n.changeLanguage(language);
    localStorage.setItem('gitchan-language', language);
  }
}

export function getCurrentLanguage(): Language {
  const storedLanguage = localStorage.getItem('gitchan-language');
  if (storedLanguage && storedLanguage in SUPPORTED_LANGUAGES) {
    return storedLanguage as Language;
  }
  return 'system';
}

export default i18n;
