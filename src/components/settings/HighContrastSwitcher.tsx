import React, { useState } from 'react';

import { useColorConfig } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { themeActions } from '../../redux/slices/ThemeSlice';
import { WhSwitch } from '../general/input/WhSwitch';

export const HighContrastSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const themeState = useAppSelector((state) => state.theme);
    const colors = useColorConfig();
    const [isHighContrastModeEnabled, setIsHighContrastModeEnabled] = useState(
        themeState.isHighContrastEnabled,
    );

    const toggleSwitch = () => {
        setIsHighContrastModeEnabled(!isHighContrastModeEnabled);

        storeDispatcher(
            themeActions.setHighContrastEnabled({
                isEnabled: !isHighContrastModeEnabled,
            }),
        );
    };

    return (
        <WhSwitch
            onValueChange={toggleSwitch}
            isEnabled={isHighContrastModeEnabled}
            colors={colors}
            testID="High contrast mode switcher input"
        />
    );
};
