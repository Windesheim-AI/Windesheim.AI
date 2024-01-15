import React from 'react';
import { StyleSheet } from 'react-native';

import BlockWrapper from './block';
import { useColorStateConfig } from '../../../lib/constants/Colors';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/CourseStageBlock';
import { Button } from '../../general/buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    const colorStateConfig = useColorStateConfig();
    let colorGradientScheme;
    let textColorScheme;
    // check if colorOptions exists on options and if so, use that instead of the default colorGradientScheme.
    if (colorStateConfig.colors[options.colorOptions]) {
        colorGradientScheme = colorStateConfig.colors[options.colorOptions];
        textColorScheme = colorStateConfig.text
            ? colorStateConfig.text[options.colorOptions]
            : undefined;
    } else {
        colorGradientScheme = colorStateConfig.colors.primary;
        textColorScheme = colorStateConfig.text?.primary;
    }

    const navigator = useNavigation();

    function onPress() {
        navigator.navigate(Routes.CourseStage, {
            courseId: options.courseId,
            stageId: options.navigateToStageId,
        });
    }

    const styles = StyleSheet.create({
        block: {
            marginTop: 5,
            marginBottom: 5,
        },
    });

    return (
        <BlockWrapper style={styles.block}>
            <Button
                buttonText={options.text}
                colorGradientScheme={colorGradientScheme}
                textColorScheme={textColorScheme}
                onPress={onPress}
            />
        </BlockWrapper>
    );
}
