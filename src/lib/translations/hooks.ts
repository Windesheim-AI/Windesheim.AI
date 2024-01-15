import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { defaultLanguageCode } from './languageOptions';
import { useAppSelector } from '../redux/Hooks';

export function useTextTranslate(text: string): string {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    // If the language is not the default language, translate the text.
    return language !== defaultLanguageCode ? t(text, { lng: language }) : text;
}

export const usePreparedTranslator = () => {
    const language = useAppSelector((state) => state.language.langCode);
    const { t } = useTranslation();

    return (text: string) => translateText(t, text, language);
};

export function translateText(
    t: TFunction,
    text: string,
    language: string,
): string {
    // If the language is not the default language, translate the text.
    return language !== defaultLanguageCode ? t(text, { lng: language }) : text;
}
