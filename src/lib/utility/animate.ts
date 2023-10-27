import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedValue = (initialValue: number) => {
    const animatedValue = useRef(new Animated.Value(initialValue)).current;

    const animateToValue = (toValue: number, duration: number) => {
        Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver: false,
        }).start();
    };

    return [animatedValue, animateToValue] as const;
};
