import React from 'react';
import { TextProps, Text } from 'react-native';

type TextTranslatedProps = {
    text: string;
} & TextProps;

export const TextTranslated = (props: TextTranslatedProps) => {
    const { text } = props;

    return <Text {...props}>{text}</Text>;
};
