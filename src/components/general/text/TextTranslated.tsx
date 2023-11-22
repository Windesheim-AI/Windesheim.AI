import React from 'react';
import { TextProps, Text } from 'react-native';

import { useTextTranslate } from '../../../translations/hooks';

type TextTranslatedProps = {
    text: string;
} & TextProps;

export const TextTranslated = (props: TextTranslatedProps) => {
    const { text } = props;

    return <Text {...props}>{useTextTranslate(text)}</Text>;
};
