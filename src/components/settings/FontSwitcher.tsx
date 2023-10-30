import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorConfig, shadow } from '../../constants/Colors';
import { MaxSize, MinSize } from '../../constants/Fonts';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/Store';
import { fontActions } from './../../redux/slices/FontSlice';

export const FontSwitcher = () => {
    const storeDispatcher = useAppDispatch();
    const fontState = useAppSelector((state: RootState) => state.fontSize);
    const [fontSize, setFontSize] = useState<number>(fontState.fontSize);

    const colors = useColorConfig();
    const decreaseFontSize = () => {
        if (fontSize <= MinSize) return;
        setFontSize((prevFontSize) => prevFontSize - 1);
    };

    const increaseFontSize = () => {
        if (fontSize >= MaxSize) return;
        setFontSize((prevFontSize) => prevFontSize + 1);
    };

    const styles = StyleSheet.create({
        buttons: {
            alignItems: 'center',
            width: 40,
            paddingLeft: 15,
            paddingRight: 15,
            height: 'auto',
            backgroundColor: colors.text,
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.text,
            maxHeight: 50,
            borderRadius: 8,
            borderColor: colors.text,
            borderWidth: 0,
            // widfth fit-content
            alignSelf: 'center',
            marginTop: 10,

            // shadow
            ...shadow,
        },
        text: {
            fontSize: 25,
            color: colors.background,
        },
    });
    return (
        <View style={styles.container}>
            <Pressable style={styles.buttons} onPress={decreaseFontSize}>
                <Text style={styles.text}>-</Text>
            </Pressable>
            <Text style={styles.text}>{fontSize}</Text>
            <Pressable style={styles.buttons} onPress={increaseFontSize}>
                <Text style={styles.text}>+</Text>
            </Pressable>
        </View>
    );
};
