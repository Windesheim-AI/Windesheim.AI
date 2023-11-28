import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../general/text/TextTranslated';

export const BackgroundCollectButton = () => {
    const colors = useColorConfig();
    const navigation = useNavigation();

    const fonts = useFonts();
    const styles = StyleSheet.create({
        text: {
            color: colors.text,
            ...fonts.h2,
        },
        button: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
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
        <Pressable
            style={styles.button}
            onPress={() => {
                navigation.navigate('MyInfo');
            }}
        >
            <Text style={styles.text}>
                <TextTranslated text="MyInfo" />
            </Text>
        </Pressable>
    );
};
