// @ts-ignore
import { EXPO_PUBLIC_GTR_API_KEY } from '@env';
import {
    Inter_600SemiBold,
    Inter_400Regular,
    useFonts,
    Inter_300Light,
} from '@expo-google-fonts/inter';
import React from 'react';

import { defaultLanguageCode } from '../constants/Languages';
import { cacheProvider } from '../lib/translation/CacheProvider';
import Translator from '../lib/translation/Translator';
import { RootState, useAppSelector } from '../redux/Hooks';

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
    const languageState = useAppSelector((state: RootState) => state.language);

    const [fontsLoaded] = useFonts({
        Inter_600SemiBold,
        Inter_400Regular,
        Inter_300Light,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Translator
            cacheProvider={cacheProvider}
            to={languageState.langCode}
            from={defaultLanguageCode}
            /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
            googleApiKey={EXPO_PUBLIC_GTR_API_KEY}
        >
            {children}
        </Translator>
    );
}
