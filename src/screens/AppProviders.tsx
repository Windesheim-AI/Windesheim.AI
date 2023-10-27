import React from 'react';
import Config from 'react-native-config';

import { cacheProvider } from '../lib/translation/CacheProvider';
import Translator from '../lib/translation/Translator';
import { RootState, useAppSelector } from '../redux/Store';

type AppProvidersProps = {
    children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
    const languageState = useAppSelector((state: RootState) => state.language);

    return (
        <Translator
            cacheProvider={cacheProvider}
            to={languageState.langCode}
            from="en"
            googleApiKey={Config.GOOGLE_TRANSLATE_API_KEY ?? ''}
        >
            {children}
        </Translator>
    );
}
