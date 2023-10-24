import * as React from 'react';
import { useState } from 'react';

import { useColorConfig } from '../../constants/Colors';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Store';
import { themeActions } from '../../redux/slices/ThemeSlice';
import { WhSwitch } from '../input/WhSwitch';

export const ThemeSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const themeState = useAppSelector((state: RootState) => state.theme);
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
