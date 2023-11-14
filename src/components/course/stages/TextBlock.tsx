import React from 'react';
import { View, Text } from 'react-native';

import { useFonts } from '../../../constants/Fonts';
import { TextOptions } from '../../../types/CourseStageBlock';
import { TextTranslated } from '../../text/TextTranslated';

export default function TextRenderer({ options }: { options: TextOptions }) {
    const fonts = useFonts();

    return (
        <TextTranslated
            style={fonts.description}
            key={options.courseId}
            text={options.text}
        />
    );
}
