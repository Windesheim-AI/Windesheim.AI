import React from 'react';

import BlockWrapper from './block';
import { useCurrentStateColorScheme } from '../../../constants/Colors';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/CourseStageBlock';
import { Button } from '../../general/buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    const stateColorSchemes = useCurrentStateColorScheme();
    const colorGradientScheme = stateColorSchemes.primary;
    const navigator = useNavigation();

    function onPress() {
        navigator.navigate(Routes.CourseStage, {
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
