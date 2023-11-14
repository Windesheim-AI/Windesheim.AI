import React from 'react';

import { useContext, useEffect, useState } from 'react';
import { TranslateContext } from '../../lib/translation/Translator';
import { TextProps, Text } from 'react-native';

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
