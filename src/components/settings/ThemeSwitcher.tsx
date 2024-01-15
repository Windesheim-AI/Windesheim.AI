import React, { useState } from 'react';

import { useColorConfig } from '../../lib/constants/Colors';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { themeActions } from '../../lib/redux/slices/ThemeSlice';
import { WhSwitch } from '../general/input/WhSwitch';

export const ThemeSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const themeState = useAppSelector((state) => state.theme);
    const colors = useColorConfig();
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
        <WhSwitch
            onValueChange={toggleSwitch}
            isEnabled={isDarkMode}
            colors={colors}
            testID="Theme switcher input"
        />
    );
};
