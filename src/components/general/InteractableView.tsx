import React from 'react';
import { Platform, Pressable, View, ViewProps } from 'react-native';

type InteractableViewProps = {
    onPress: () => void;
} & ViewProps;

export function InteractableView({ onPress, ...props }: InteractableViewProps) {
    return Platform.OS !== 'web' ? (
        <View {...props} onTouchEnd={onPress}>
            {props.children}
        </View>
    ) : (
        <Pressable onPress={onPress}>
            <View {...props}>{props.children}</View>
        </Pressable>
    );
}