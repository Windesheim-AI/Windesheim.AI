import * as React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { RootState } from '../../redux/Store';

export const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const themeState = useAppSelector((state: RootState) => state.theme);
    const colors = useColorConfig(themeState.theme);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);

        dispatch({
            type: 'theme/changeTheme',
            payload: {
                theme: isEnabled ? 'light' : 'dark',
            },
        });
    };

    return (
        <Switch
            trackColor={{ false: colors.primary, true: colors.success }}
            thumbColor={isEnabled ? colors.success : colors.primary}
            ios_backgroundColor={colors.background}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};
