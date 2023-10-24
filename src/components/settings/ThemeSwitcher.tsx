import * as React from 'react';
import { useState } from 'react';
import { Switch } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Store';
import { themeActions } from '../../redux/slices/ThemeSlice';

export const ThemeSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const themeState = useAppSelector((state: RootState) => state.theme);
    const colors = useColorConfig(themeState.theme);
    const [isDarkMode, setIsDarkMode] = useState(themeState.theme === 'dark');
    const toggleSwitch = () => {
        setIsDarkMode(!isDarkMode);

        storeDispatcher(
            themeActions.changeTheme({
                theme: isDarkMode ? 'light' : 'dark',
            }),
        );
    };

    return (
        <Switch
            trackColor={{ false: colors.primary, true: colors.success }}
            thumbColor={isDarkMode ? colors.success : colors.primary}
            ios_backgroundColor={colors.background}
            onValueChange={toggleSwitch}
            value={isDarkMode}
        />
    );
};
