import React from 'react';
import { Pressable, StyleSheet, TextStyle } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';

export type GoBackButtonProps = {
    onPress?: () => void;
    buttonText?: string;
    style?: TextStyle;
};

export const GoBackButton = ({
    onPress,
    buttonText = 'Go Back',
    style,
}: GoBackButtonProps) => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    if (!onPress) {
        /* istanbul ignore next */
        onPress = () => {
            navigation.goBack();
        };
    }
    const handlePress = () => {
        HapticFeedback(HapticForces.Light);
        onPress?.();
    };

    const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: colors.background,
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            color: colors.text,
            ...fonts.button,
            marginLeft: 8,
        },
    });

    return (
        <Pressable
            testID="GoBackButton"
            style={[styles.buttonContainer, style]}
            onPress={onPress}
        >
            <FontAwesome5 name="arrow-left" size={20} color={colors.text} />
            <TextTranslated style={styles.buttonText} text={buttonText} />
        </Pressable>
    );
};
