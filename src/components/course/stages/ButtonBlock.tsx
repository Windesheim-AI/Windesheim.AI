import { useNavigation } from '@react-navigation/native';
import React from 'react';

import BlockWrapper from './block';
import { stateColorSchemes } from '../../../constants/Colors';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/CourseStageBlock';
import { Button } from '../../general/buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    // ToDo: use the configured color scheme of the options.
    const colorGradientScheme = stateColorSchemes.primary;
    const navigator = useNavigation();
    function onPress() {
        //@ts-ignore
        navigator.navigate(Routes.Stage.toString(), {
            courseId: options.courseId,
            stageId: options.navigateToStageId,
        });
    }

    return (
        <BlockWrapper>
            <Button
                buttonText={options.text}
                colorGradientScheme={colorGradientScheme}
                onPress={onPress}
            />
        </BlockWrapper>
    );
}
