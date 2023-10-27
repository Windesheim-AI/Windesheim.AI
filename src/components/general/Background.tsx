import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useColorConfig } from '../../constants/Colors';

export const Background = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        bar: {
            backgroundColor: colors.bg1,
            flex: 1,
            height: '100%',
            position: 'absolute',
            width: '100%',
        },
        bar2: {
            backgroundColor: colors.bg2,
            height: '200%',
            left: '10%',
            position: 'absolute',
            top: '-50%',
            transform: 'rotate(22.365deg)',
            width: '72%',
        },
        bar3: {
            backgroundColor: colors.bg3,
            height: '200%',
            left: '55%',
            position: 'absolute',
            top: '-20%',
            transform: 'rotate(22.365deg)',
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
            <View style={styles.bar} />
            <View style={styles.bar2} />
            <View style={styles.bar3} />
        </View>
    );
};
