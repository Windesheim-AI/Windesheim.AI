import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function BlockWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const styles = StyleSheet.create({
        block: {
            marginTop: 20,
            marginBottom: 20,
        },
    });

    return <View style={styles.block}>{children}</View>;
}
