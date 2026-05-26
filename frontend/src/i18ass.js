import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ru from './locales/ru/translation.json'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ru: { translation: ru },
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
