import React from 'react';
import { Platform, Pressable, View, ViewProps } from 'react-native';

type IntractableViewProps = {
    onPress: () => void;
} & ViewProps;

export function IntractableView({ onPress, ...props }: IntractableViewProps) {
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
