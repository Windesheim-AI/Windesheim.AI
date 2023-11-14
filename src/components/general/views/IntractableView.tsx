import React from 'react';
import { Platform, Pressable, View, ViewProps } from 'react-native';

type Props = {
    onPress: () => void;
} & ViewProps;

export function IntractableView({ onPress, ...props }: Props) {
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
