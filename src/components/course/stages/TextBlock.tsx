import React from 'react';

import { useFonts } from '../../../constants/Fonts';
import { TextOptions } from '../../../types/CourseStageBlock';
import { TextTranslated } from '../../general/text/TextTranslated';
import { StyleSheet } from 'react-native';
import BlockWrapper from './block';

export default function TextRenderer({ options }: { options: TextOptions }) {
    const fonts = useFonts();

    const styles = StyleSheet.create({
        block: {
            marginTop: 20,
            marginBottom: 20,
        },
    });

    return (
        <BlockWrapper style={styles.block}>
            <TextTranslated
                style={fonts.description}
                key={options.courseId}
                text={options.text}
            />
        </BlockWrapper>
    );
}
