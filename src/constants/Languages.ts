export type LanguageCode = string;
export type NativeTranslation = string;

export type LanguageTranslations = Record<LanguageCode, NativeTranslation>;

export const defaultLanguageCode: LanguageCode = 'en';
export const languages: LanguageTranslations = {
    af: 'Afrikaans',
    sq: 'Shqip', // Albanian
    am: 'አማርኛ', // Amharic
    ar: 'العربية', // Arabic
    hy: 'Հայերեն', // Armenian
    az: 'Azərbaycan', // Azerbaijani
    eu: 'Euskara', // Basque
    be: 'Беларуская', // Belarusian
    bn: 'বাঙালি', // Bengali
    bs: 'Bosanski', // Bosnian
    bg: 'Български', // Bulgarian
    ca: 'Català', // Catalan
    ceb: 'Cebuano',
    ny: 'Chichewa',
    'zh-cn': '简体中文', // Chinese Simplified
    'zh-tw': '繁體中文', // Chinese Traditional
    co: 'Corsican',
    hr: 'Hrvatski', // Croatian
    cs: 'Čeština', // Czech
    da: 'Dansk', // Danish
    nl: 'Nederlands', // Dutch
    en: 'English',
    eo: 'Esperanto',
    et: 'Eesti', // Estonian
    tl: 'Filipino',
    fi: 'Suomi', // Finnish
    fr: 'Français', // French
    fy: 'Frysk', // Frisian
    gl: 'Galego', // Galician
    ka: 'ქართული', // Georgian
    de: 'Deutsch', // German
    el: 'Ελληνικά', // Greek
    gu: 'ગુજરાતી', // Gujarati
    ht: 'Kreyòl Ayisyen', // Haitian Creole
    ha: 'Hausa',
    haw: 'ʻŌlelo Hawaiʻi', // Hawaiian
    iw: 'עִבְרִית', // Hebrew
    hi: 'हिन्दी', // Hindi
    hmn: 'Hmong',
    hu: 'Magyar', // Hungarian
    is: 'Íslenska', // Icelandic
    ig: 'Igbo',
    id: 'Bahasa Indonesia', // Indonesian
    ga: 'Gaeilge', // Irish
    it: 'Italiano', // Italian
    ja: '日本語', // Japanese
    jw: 'Basa Jawa', // Javanese
    kn: 'ಕನ್ನಡ', // Kannada
    kk: 'Қазақ тілі', // Kazakh
    km: 'ភាសាខ្មែរ', // Khmer
    ko: '한국어', // Korean
    ku: 'Kurdî', // Kurdish (Kurmanji)
    ky: 'Кыргызча', // Kyrgyz
    lo: 'ພາສາລາວ', // Lao
    la: 'Latina',
    lv: 'Latviešu', // Latvian
    lt: 'Lietuvių', // Lithuanian
    lb: 'Lëtzebuergesch', // Luxembourgish
    mk: 'Македонски', // Macedonian
    mg: 'Malagasy',
    ms: 'Bahasa Melayu', // Malay
    ml: 'മലയാളം', // Malayalam
    mt: 'Malti', // Maltese
    mi: 'Māori',
    mr: 'मराठी', // Marathi
    mn: 'Монгол', // Mongolian
    my: 'ဗမာစာ', // Myanmar (Burmese)
    ne: 'नेपाली', // Nepali
    no: 'Norsk', // Norwegian
    ps: 'پښتو', // Pashto
    fa: 'فارسی', // Persian
    pl: 'Polski', // Polish
    pt: 'Português', // Portuguese
    ma: 'ਪੰਜਾਬੀ', // Punjabi
    ro: 'Română', // Romanian
    ru: 'Русский', // Russian
    sm: 'Gagana Sāmoa', // Samoan
    gd: 'Gàidhlig na h-Alba', // Scots Gaelic
    sr: 'Српски', // Serbian
    st: 'Sesotho',
    sn: 'Shona',
    sd: 'سنڌي', // Sindhi
    si: 'සිංහල', // Sinhala
    sk: 'Slovenčina', // Slovak
    sl: 'Slovenščina', // Slovenian
    so: 'Soomaaliga', // Somali
    es: 'Español', // Spanish
    su: 'Basa Sunda', // Sundanese
    sw: 'Kiswahili', // Swahili
    sv: 'Svenska', // Swedish
    tg: 'тоҷикӣ', // Tajik
    ta: 'தமிழ்', // Tamil
    te: 'తెలుగు', // Telugu
    th: 'ไทย', // Thai
    tr: 'Türkçe', // Turkish
    uk: 'Українська', // Ukrainian
    ur: 'اردو', // Urdu
    ug: 'ئۇيغۇرچە', // Uyghur
    uz: 'Oʻzbek', // Uzbek
    vi: 'Tiếng Việt', // Vietnamese
    cy: 'Cymraeg', // Welsh
    xh: 'isiXhosa', // Xhosa
    yi: 'ייִדיש', // Yiddish
    yo: 'Yorùbá', // Yoruba
    zu: 'isiZulu', // Zulu
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
