export type LanguageCode = string;
export type NativeTranslation = string;

export type LanguageTranslations = Record<LanguageCode, NativeTranslation>;

export const defaultLanguageCode: LanguageCode = 'en';
export const languages: LanguageTranslations = {
    en: 'English',
    zh: '中文', // Chinese
    hi: 'हिन्दी', // Hindi
    es: 'Español', // Spanish
    ar: 'العربية', // Arabic
    bn: 'বাংলা', // Bengali
    pt: 'Português', // Portuguese
    ru: 'Русский', // Russian
    pa: 'ਪੰਜਾਬੀ', // Punjabi
    jv: 'Basa Jawa', // Javanese
    te: 'తెలుగు', // Telugu
    mr: 'मराठी', // Marathi
    ko: '한국어', // Korean
    fr: 'Français', // French
    vi: 'Tiếng Việt', // Vietnamese
    ta: 'தமிழ்', // Tamil
    ur: 'اردو', // Urdu
    tr: 'Türkçe', // Turkish
    it: 'Italiano', // Italian
    th: 'ไทย', // Thai
    gu: 'ગુજરાતી', // Gujarati
    pl: 'Polski', // Polish
    uk: 'Українська', // Ukrainian
    ms: 'Bahasa Melayu', // Malay
    fa: 'فارسی', // Persian
    kn: 'ಕನ್ನಡ', // Kannada
    or: 'ଓଡ଼ିଆ', // Odia
    my: 'မြန်မာ', // Burmese
    sa: 'संस्कृतम्', // Sanskrit
    am: 'አማርኛ', // Amharic
    ja: '日本語', // Japanese
    bg: 'български', // Bulgarian
    hr: 'Hrvatski', // Croatian
    cs: 'Čeština', // Czech
    da: 'Dansk', // Danish
    nl: 'Nederlands', // Dutch
    fi: 'Suomi', // Finnish
    el: 'Ελληνικά', // Greek
    he: 'עִבְרִית', // Hebrew
    hu: 'Magyar', // Hungarian
    id: 'Bahasa Indonesia', // Indonesian
    nb: 'Norsk Bokmål', // Norwegian Bokmål
    nn: 'Norsk Nynorsk', // Norwegian Nynorsk
    fil: 'Filipino', // Filipino
    sv: 'Svenska', // Swedish
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
