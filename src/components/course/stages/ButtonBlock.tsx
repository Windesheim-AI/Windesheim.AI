import { useNavigation } from '@react-navigation/native';
import React from 'react';

import BlockWrapper from './block';
import { buttonColorSchemes } from '../../../constants/Colors';
import { Routes } from '../../../routes/routes';
import { ButtonOptions } from '../../../types/Block';
import { Button } from '../../buttons/Button';

export default function ButtonBlock({ options }: { options: ButtonOptions }) {
    const colorGradientScheme = buttonColorSchemes[options.colorOptions];
    const navigator = useNavigation();
    function onPress() {
        //@ts-ignore
        navigator.navigate(Routes.Course.toString(), {
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