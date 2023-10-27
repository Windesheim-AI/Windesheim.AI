import { TranslationOptions } from './Types';

export function getTranslateApiUrl(
    options: TranslationOptions,
    value: string,
): string {
    return `https://translation.googleapis.com/language/translate/v2?source=${options.from}&target=${options.to}&key=${options.apiKey}&q=${value}&format=text`;
}

const translationBlacklist = ['Community of Practice'];

export function isTranslationInBlacklist(value: string) {
    return translationBlacklist.includes(value);
}
