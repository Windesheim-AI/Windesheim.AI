import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { defaultLanguageCode } from './languageOptions';
import * as afTranslations from './languages/af.json';
import * as deTranslations from './languages/de.json';
import * as nlTranslations from './languages/nl.json';
import { handleError } from '../lib/utility/errorHandler';

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v3',
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            af: {
                translation: afTranslations,
            },
            nl: {
                translation: nlTranslations,
            },
            de: {
                translation: deTranslations,
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
    .catch((error) => handleError('Could not initialize i18n'));
