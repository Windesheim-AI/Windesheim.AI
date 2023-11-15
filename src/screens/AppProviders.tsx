// @ts-ignore
import { EXPO_PUBLIC_GTR_API_KEY } from '@env';
import React from 'react';

import { defaultLanguageCode } from '../constants/Languages';
import { cacheProvider } from '../lib/translation/CacheProvider';
import Translator from '../lib/translation/Translator';
import { useAppSelector } from '../redux/Hooks';

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
    const languageState = useAppSelector((state) => state.language);

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
