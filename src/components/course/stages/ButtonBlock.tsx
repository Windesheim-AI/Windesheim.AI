import React from 'react';

import BlockWrapper from './block';
import { stateColorSchemes } from '../../../constants/Colors';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/CourseStageBlock';
import { Button } from '../../general/buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    // ToDo: use the configured color scheme of the options.
    const colorGradientScheme = stateColorSchemes.primary;
    const navigator = useNavigation();
    function onPress() {
        navigator.navigate(Routes.Stage, {
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
