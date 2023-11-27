import React from 'react';

import BlockWrapper from './block';
import { useColorStateConfig } from '../../../constants/Colors';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/CourseStageBlock';
import { Button } from '../../general/buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    const colorStateConfig = useColorStateConfig();
    const colorGradientScheme = colorStateConfig.colors.primary;
    const textColorScheme = colorStateConfig.text?.primary;
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
                textColorScheme={textColorScheme}
                onPress={onPress}
            />
        </BlockWrapper>
    );
}
