import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as nlTranslations from './nl.json';
import { defaultLanguageCode } from '../constants/Languages';

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            nl: {
                translation: nlTranslations,
            },
        },
        fallbackLng: defaultLanguageCode,

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    })
    .then(() => {
        /* Do nothing, everything is configured correctly. */
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.error(error));