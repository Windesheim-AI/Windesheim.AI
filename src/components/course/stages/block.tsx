import React from 'react';
import { View, ViewStyle } from 'react-native';

export default function BlockWrapper({
    children,
    style,
}: {
    children: React.ReactNode;
    style?: ViewStyle;
}) {
    return <View style={style}>{children}</View>;
}
