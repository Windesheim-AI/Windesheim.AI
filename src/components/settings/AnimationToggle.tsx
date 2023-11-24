import React from 'react';

import { useColorConfig } from '../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { toggleAnimation } from '../../redux/slices/AnimationSlice'; // You need to create this slice
import { WhSwitch } from '../input/WhSwitch';

export const AnimationToggle = () => {
    const storeDispatcher = useAppDispatch();
    const animationState = useAppSelector((state) => state.animation); // You need to add animation state to your redux store

    const colors = useColorConfig();
    const toggleSwitch = () => {
        storeDispatcher(toggleAnimation());
    };

    return (
        <WhSwitch
            onValueChange={toggleSwitch}
            isEnabled={animationState.isEnabled}
            colors={colors}
            testID="Animation toggle input"
        />
    );
};