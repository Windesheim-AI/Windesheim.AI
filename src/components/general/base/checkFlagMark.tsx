import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { shadow, useColorConfig } from '../../../lib/constants/Colors';

export function CheckMarkFlag() {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        checkmarkContainer: {
            position: 'absolute',
            right: 20,
            top: 0,
            padding: 5,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopStartRadius: 2,
            borderTopEndRadius: 2,
            paddingTop: 10,
            backgroundColor: colors.success,
            color: colors.text,
            fontSize: 20,
            ...shadow,
        },
        checkmark: {
            color: colors.text,
            fontSize: 20,
        },
    });

    return (
        <View style={styles.checkmarkContainer}>
            <FontAwesome5 name="check" style={styles.checkmark} size={5} />
        </View>
    );
}
