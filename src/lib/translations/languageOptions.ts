export type LanguageCode = string;
export type NativeTranslation = string;

export type LanguageTranslations = Record<LanguageCode, NativeTranslation>;

export const defaultLanguageCode: LanguageCode = 'en';
export const languageOptions: LanguageTranslations = {
    nl: 'Nederlands', // Dutch
    en: 'English',
    de: 'Deutsch', // German
    fr: 'Français', // French
};

export function getLanguageCodeByTranslation(
    translation: string,
): LanguageCode | undefined {
    return Object.keys(languageOptions).find(
        (code) => languageOptions[code] === translation,
    );
}
