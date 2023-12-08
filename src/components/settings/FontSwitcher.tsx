import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorConfig } from '../../lib/constants/Colors';
import { MaxSize, MinSize } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppDispatch, useAppSelector } from '../../lib/redux/Hooks';
import { fontActions } from '../../lib/redux/slices/FontSlice';

export const FontSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const fontState = useAppSelector((state) => state.fontSize);
    const [fontSize, setFontSize] = useState<number>(fontState.fontSize);

    const colors = useColorConfig();
    const decreaseFontSize = () => {
        if (fontSize <= MinSize) return;
        HapticFeedback(HapticForces.Light);
        setFontSize((prevFontSize) => prevFontSize - 1);
    };

    useEffect(() => {
        storeDispatcher(fontActions.changeFontSize({ fontSize }));
    }, [fontSize, storeDispatcher]);

    const increaseFontSize = () => {
        if (fontSize >= MaxSize) return;
        HapticFeedback(HapticForces.Light);
        setFontSize((prevFontSize) => prevFontSize + 1);
    };

    const styles = StyleSheet.create({
        buttons: {
            alignItems: 'center',
            width: 40,
            paddingLeft: 15,
            paddingRight: 15,
            height: 'auto',
            backgroundColor: colors.background,
            borderRadius: 8,
            borderColor: colors.text,
        },
        text: {
            color: colors.text,
            fontSize: 20,
        },
        parent: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.background,
            maxHeight: 50,
            borderRadius: 8,
            borderColor: colors.text,
            borderWidth: 1,
            padding: 10,
            alignSelf: 'center',
        },
    });
    return (
        <View style={styles.parent}>
            <Pressable
                style={styles.buttons}
                testID="decreaseFont"
                onPress={decreaseFontSize}
            >
                <Text style={styles.text}>-</Text>
            </Pressable>
            <Text style={styles.text} testID="fontSize">
                {fontSize}
            </Text>
            <Pressable
                style={styles.buttons}
                testID="increaseFont"
                onPress={increaseFontSize}
            >
                <Text style={styles.text}>+</Text>
            </Pressable>
        </View>
    );
};
