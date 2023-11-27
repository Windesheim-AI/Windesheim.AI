import React from 'react';
import { Platform, Pressable, View, ViewProps } from 'react-native';

type Props = {
    onPress: () => void;
} & ViewProps;

export function IntractableView({ onPress, ...props }: Props) {
    return (
        <Pressable onPress={onPress}>
            <View {...props}>{props.children}</View>
        </Pressable>
    );
}
