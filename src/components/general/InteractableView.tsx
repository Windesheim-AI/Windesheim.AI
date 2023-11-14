import React from 'react';
import { View, ViewProps } from 'react-native';

type InteractableViewProps = {
    onPress: () => void;
} & ViewProps;

export function InteractableView({ onPress, ...props }: InteractableViewProps) {
    return (
        <View {...props} onTouchEnd={onPress} onPointerUp={onPress}>
            {props.children}
        </View>
    );
}
