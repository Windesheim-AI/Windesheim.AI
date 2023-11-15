import React, { createContext, useCallback } from 'react';

import { CacheProvider, TranslationHandler } from './Types';
import { translatorFactory } from './translators/TranslatorFactory';
import { defaultLanguageCode } from '../../constants/Languages';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultHandler: TranslationHandler = () => {};

export const TranslateContext: React.Context<TranslationHandler> =
    createContext(defaultHandler);
export const LanguageContext: React.Context<string> =
    createContext(defaultLanguageCode);

type TranslatorProps = {
    to: string;
    from: string;
    cacheProvider?: CacheProvider;
    children: React.ReactNode;
    googleApiKey: string;
};

export default function Translator({
    to,
    from,
    cacheProvider,
    children,
    googleApiKey,
}: TranslatorProps) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handleTranslationAsync: TranslationHandler = useCallback(
        /* istanbul ignore next */
        async (value, setTranslation) => {
            const options = {
                to,
                from,
                apiKey: googleApiKey,
            };
            const translator = translatorFactory.create(options, cacheProvider);
            const translation = await translator.translate(value);

            setTranslation(translation ?? value);
        },
        [to, from, googleApiKey, cacheProvider],
    );

    return (
        <TranslateContext.Provider value={handleTranslationAsync}>
            <LanguageContext.Provider value={to}>
                {children}
            </LanguageContext.Provider>
        </TranslateContext.Provider>
    );
}
