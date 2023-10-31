import { useContext, useEffect, useState } from 'react';

import { TranslateContext } from '../../lib/translation/Translator';

type TextTranslatedProps = {
    text: string;
};

export const TextTranslated = ({ text }: TextTranslatedProps): string => {
    const handleTranslate = useContext(TranslateContext);
    const [translation, setTranslation] = useState(text);

    useEffect(() => {
        handleTranslate(text, setTranslation);
    }, [text, handleTranslate]);

    return translation;
};
