import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorScheme } from '../constants/Colors';

export const Background = () => {
    const colors = ColorScheme.useColorScheme();

    const styles = StyleSheet.create({
        bar: {
            backgroundColor: colors.bg_1,
            flex: 1,
            height: '100%',
            position: 'absolute',
            width: '100%',
        },
        bar2: {
            backgroundColor: colors.bg_2,
            height: '200%',
            left: '10%',
            position: 'absolute',
            top: '-50%',
            transform: [{ rotate: '22.365deg' }],
            width: '72%',
        },
        bar3: {
            backgroundColor: colors.bg_3,
            height: '200%',
            left: '55%',
            position: 'absolute',
            top: '-20%',
            transform: [{ rotate: '22.365deg' }],
            width: '100%',
        },
        container: {
            flex: 1,
            height: '100%',
            overflow: 'hidden',
            position: 'absolute',
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.bar}></View>
            <View style={styles.bar2}></View>
            <View style={styles.bar3}></View>
        </View>
    );
};
