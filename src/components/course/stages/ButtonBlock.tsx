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
    const navigator = useNavigation();

    let colorGradientScheme = colorStateConfig.colors.primary;
    let textColorScheme = colorStateConfig.text?.primary;
    // check if colorOptions exists on options and if so, use that instead of the default colorGradientScheme.
    if (colorStateConfig.colors[options.colorOptions]) {
        colorGradientScheme = colorStateConfig.colors[options.colorOptions];
        textColorScheme = colorStateConfig.text
            ? colorStateConfig.text[options.colorOptions]
            : undefined;
    }

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
