export type LanguageCode = string;
export type NativeTranslation = string;

export type LanguageTranslations = Record<LanguageCode, NativeTranslation>;

export const defaultLanguageCode: LanguageCode = 'en';
export const languages: LanguageTranslations = {
    nl: 'Nederlands', // Dutch
    en: 'English',
};

export function languageLabels(): string[] {
    return Object.values(languages);
}

export function getLanguageCodeByTranslation(
    translation: string,
): LanguageCode | undefined {
    return Object.keys(languages).find(
        (code) => languages[code] === translation,
    );
}
