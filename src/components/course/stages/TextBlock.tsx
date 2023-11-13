import React from 'react';
import { View, Text } from 'react-native';

import { useFonts } from '../../../constants/Fonts';
import { TextOptions } from '../../../types/Block';
import { TextTranslated } from '../../text/TextTranslated';

export default function TextRenderer({ options }: { options: TextOptions }) {
    const fonts = useFonts();
    return (
        <View style={fonts.description} key={options.courseId}>
            <Text>
                <TextTranslated text={options.text} />
            </Text>
        </View>
    );
}
