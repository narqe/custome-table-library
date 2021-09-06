// File: i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TRANSLATIONS_ES from '../translations/es/translations.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    resources: {
      supportedLngs: ['es'],
      fallbackLng: 'es',
      es: {
        translation: TRANSLATIONS_ES,
      },
    },
    lng: 'es',
  });

export default i18n;
