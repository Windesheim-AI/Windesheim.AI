import React from 'react';
import { StyleSheet } from 'react-native';

import BlockWrapper from './block';
import { stateColorSchemes } from '../../../constants/Colors';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/CourseStageBlock';
import { Button } from '../../general/buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    // ToDo: use the configured color scheme of the options.
    let colorGradientScheme;
    // check if colorOptions exists on options and if so, use that instead of the default colorGradientScheme.
    if (stateColorSchemes[options.colorOptions]) {
        colorGradientScheme = stateColorSchemes[options.colorOptions];
    } else {
        colorGradientScheme = stateColorSchemes.primary;
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
                onPress={onPress}
            />
        </BlockWrapper>
    );
}
