import * as React from 'react';
import { Switch } from 'react-native';

import { ColorSchemeType } from '../../constants/Colors';

export type SwitchProps = {
    onValueChange?: () => void;
    isEnabled: boolean;
    colors: ColorSchemeType;
};

export const WhSwitch = ({ onValueChange, isEnabled, colors }: SwitchProps) => {
    return (
        <Switch
            trackColor={{ false: colors.primary, true: colors.success }}
            thumbColor={isEnabled ? colors.success : colors.primary}
            ios_backgroundColor={colors.background}
            onValueChange={onValueChange}
            value={isEnabled}
        />
    );
};
