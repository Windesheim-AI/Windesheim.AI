import { useContext, useEffect, useState } from 'react';

import {
    LanguageContext,
    TranslateContext,
} from '../../lib/translation/Translator';

type TextTranslatedProps = {
    text: string;
};

export const TextTranslated = ({ text }: TextTranslatedProps): string => {
    const language = useContext(LanguageContext);
    const handleTranslate = useContext(TranslateContext);
    const [translation, setTranslation] = useState(text);

    useEffect(() => {
        handleTranslate(text, setTranslation);
    }, [text, language, handleTranslate]);

    return translation;
};
