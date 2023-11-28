import { useRef } from 'react';
import { Animated } from 'react-native';

import { useAppSelector } from '../redux/Hooks';

export const useAnimatedValueNav = (initialValue: number) => {
    const animatedValue = useRef(new Animated.Value(initialValue)).current;
    const animationState = useAppSelector((state) => state.animation);

    const animateToValue = (toValue: number, duration: number) => {
        if (!animationState.isEnabled) {
            duration = 0;
        }
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver: false,
        }).start();
    };

    return [animatedValue, animateToValue] as const;
};

export const useAnimatedValue = (initialValue: number) => {
    const animatedValue = useRef(new Animated.Value(initialValue)).current;
    const animationState = useAppSelector((state) => state.animation);
    const animateToValue = (
        toValue: number,
        duration: number,
    ): Animated.CompositeAnimation => {
        if (!animationState.isEnabled) {
            duration = 0;
        }
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver: false,
        });
    };
    return [animatedValue, animateToValue] as const;
};
