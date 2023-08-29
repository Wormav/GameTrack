import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './assets/locales/fr/fr';
import en from './assets/locales/en/en';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      fr,
      en,

      // Ajoutez plus d'espaces de noms si nécessaire
    },
    debug: true,
    lng: 'fr', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: 'fr',
    ns: ['common', 'app'],
    defaultNS: 'app',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;