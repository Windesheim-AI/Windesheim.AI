import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { shadow, useColorConfig } from '../../constants/Colors';

export type CardProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};

export function Card({ children, style }: CardProps) {
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            ...shadow,
            elevation: 5,
        },
    });

    return <View style={[styles.card, style]}>{children}</View>;
}
