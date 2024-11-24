import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import ja from './locales/ja.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  supportedLngs: ['en', 'ru', 'zh', 'es', 'de', 'fr', 'ja'],
  fallbackLng: 'en',
  resources: {
    en: en,
    ru: ru,
    zh: zh,
    es: es,
    de: de,
    fr: fr,
    ja: ja,
  },
  returnNull: false,
  ns: ['translation'],
  defaultNS: 'translation',

  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator'],
    caches: ['cookie'], // Сохраняем язык в cookie для последующих посещений
    lookupQuerystring: 'lang', // Указываем, что параметр в URL — это 'lang'
  },
  
});