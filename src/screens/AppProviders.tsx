import React from 'react';

import { defaultLanguageCode } from '../constants/Languages';
import { cacheProvider } from '../lib/translation/CacheProvider';
import Translator from '../lib/translation/Translator';
import { getEnvValue } from '../lib/utility/env/env';
import { EnvOptions } from '../lib/utility/env/env.values';
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
            googleApiKey={getEnvValue(EnvOptions.GoogleTranslateApiKey)}
        >
            {children}
        </Translator>
    );
}
