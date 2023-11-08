import React from 'react';
import { View } from 'react-native';

import { TextTranslated } from '../../text/TextTranslated';
import { useFonts } from '../../../constants/Fonts';
import { TextOptions } from '../../../types/Block';

export default function TextRenderer({ options }: { options: TextOptions }) {
    const fonts = useFonts();
    return (
        <View style={fonts.description} key={options.courseId}>
            <TextTranslated text={options.text} />
        </View>
    );
}
