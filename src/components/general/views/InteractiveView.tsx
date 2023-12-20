import React from 'react';
import { Pressable, View, ViewProps } from 'react-native';

type Props = {
    onPress: () => void;
} & ViewProps;

export function InteractiveView({ onPress, ...props }: Props) {
    return (
        <Pressable onPress={onPress}>
            <View {...props}>{props.children}</View>
        </Pressable>
    );
}
