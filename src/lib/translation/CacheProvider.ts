// example provider
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CacheProvider } from './Types';

export const cacheProvider: CacheProvider = {
    get: async (language, key) => {
        const translationsKey = `translations.${language}`;
        const jsonTranslations = await AsyncStorage.getItem(translationsKey);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const translations = JSON.parse(jsonTranslations ?? '{}');

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return translations?.[key] ?? undefined;
    },
    set: async (language, key, value) => {
        const translationsKey = `translations.${language}`;
        const jsonTranslations = await AsyncStorage.getItem(translationsKey);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const translations = jsonTranslations
            ? JSON.parse(jsonTranslations)
            : {};

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        translations[key] = value;

        return await AsyncStorage.setItem(
            translationsKey,
            JSON.stringify(translations),
        );
    },
};
