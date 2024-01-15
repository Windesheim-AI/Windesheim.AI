import React from 'react';
import { TextProps, Text } from 'react-native';

import { useTextTranslate } from '../../../lib/translations/hooks';

type TextTranslatedProps = {
    text: string | undefined;
} & TextProps;

export const TextTranslated = (props: TextTranslatedProps) => {
    let { text } = props;
    if (!text) text = '';

    return <Text {...props}>{useTextTranslate(text)}</Text>;
};
