import { useTranslation } from 'react-i18next';

import { defaultLanguageCode } from './languageOptions';
import { useAppSelector } from '../redux/Hooks';

export function useTextTranslate(text: string): string {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    // If the language is not the default language, translate the text.
    return language !== defaultLanguageCode ? t(text, { lng: language }) : text;
}
