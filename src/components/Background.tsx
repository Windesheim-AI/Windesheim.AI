import React from 'react';
import { StyleSheet, View } from 'react-native';

import useTheme from '../utils/ThemeUtil';

export const Background = () => {
    const { useBar1Color, useBar2Color, useBar3Color } = useTheme();

    const backgroundColorBG1 = useBar1Color();
    const backgroundColorBG2 = useBar2Color();
    const backgroundColorBG3 = useBar3Color();

    const styles = StyleSheet.create({
        bar: {
            backgroundColor: backgroundColorBG1,
            flex: 1,
            height: '100%',
            position: 'absolute',
            width: '100%',
        },
        bar2: {
            backgroundColor: backgroundColorBG2,
            height: '200%',
            left: '10%',
            position: 'absolute',
            top: '-50%',
            transform: [{ rotate: '22.365deg' }],
            width: '72%',
        },
        bar3: {
            backgroundColor: backgroundColorBG3,
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
