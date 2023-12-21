import React from 'react';
import { StyleSheet } from 'react-native';

import BlockWrapper from './block';
import { shadow, useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { removeSlashes } from '../../../lib/utility/stringutils';
import { TextOptions } from '../../../types/CourseStageBlock';
import { TextTranslated } from '../../general/text/TextTranslated';

export default function TextRenderer({ options }: { options: TextOptions }) {
    const fonts = useFonts();
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        block: {
            ...shadow,
            backgroundColor: colors.listItemBg,
            padding: 10,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 10,
        },
    });

    return (
        <BlockWrapper style={styles.block}>
            <TextTranslated
                style={fonts.description}
                key={options.courseId}
                text={removeSlashes(options.text)}
            />
        </BlockWrapper>
    );
}
