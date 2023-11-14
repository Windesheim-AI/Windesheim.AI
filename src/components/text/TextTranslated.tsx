import React, { useContext, useEffect, useState } from 'react';
import { TextProps, Text } from 'react-native';

import { TranslateContext } from '../../lib/translation/Translator';

type TextTranslatedProps = {
    text: string;
} & TextProps;

export const TextTranslated = (props: TextTranslatedProps) => {
    const handleTranslate = useContext(TranslateContext);
    const { text } = props;
    const [translation, setTranslation] = useState(text);

    useEffect(() => {
        handleTranslate(text, setTranslation);
    }, [text, handleTranslate]);

    return <Text {...props}>{translation}</Text>;
};
