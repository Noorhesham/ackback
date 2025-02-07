import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Translations
import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';
import translationTR from './locales/tr.json';

// Configure i18next
i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    .init({
        fallbackLng: 'ar',
        lng: 'ar',
        debug: true,
        resources: {
            ar: {
                translation: translationAR,
            },
            en: {
                translation: translationEN,
            },
            tr: {
                translation: translationTR,
            },
        },
        interpolation: {
            escapeValue: false, // React already escapes variables
        },
    });

export default i18n;