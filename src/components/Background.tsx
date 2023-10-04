import React from 'react';
import { StyleSheet, View } from 'react-native';

import useTheme from '../utils/ThemeUtil';

export const Background = () => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        bar: {
            backgroundColor: theme.bar1Color,
            flex: 1,
            height: '100%',
            position: 'absolute',
            width: '100%',
        },
        bar2: {
            backgroundColor: theme.bar2Color,
            height: '200%',
            left: '10%',
            position: 'absolute',
            top: '-50%',
            transform: [{ rotate: '22.365deg' }],
            width: '72%',
        },
        bar3: {
            backgroundColor: theme.bar3Color,
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
