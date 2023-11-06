import React from 'react';
import { View } from 'react-native';

import { TextTranslated } from '../../text/TextTranslated';
import { useFonts } from '../../../constants/Fonts';
import { TextOptions } from '../../../types/Stage';

export default function TextRenderer({ options }: { options: TextOptions }) {
    const fonts = useFonts();
    return (
        <View style={fonts.description}>
            <TextTranslated text={options.text} />
        </View>
    );
}
