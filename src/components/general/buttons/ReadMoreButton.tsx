import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { TextTranslated } from '../text/TextTranslated';

export type Props = {
    buttonText?: string;
    buttonStyle?: ViewStyle;
    buttonTextStyle?: ViewStyle;
    navigateToRoute: Routes;
    navigationParams?: Record<string, string>;
    testID?: string;
};

export const ReadMoreButton = ({
    buttonText = 'Read more',
    buttonStyle,
    buttonTextStyle,
    navigateToRoute,
    navigationParams,
    testID,
}: Props) => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        buttonContainer: {
            borderRadius: 8,
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
            ...buttonStyle,
        },
        buttonText: {
            color: colors.text,
            ...fonts.description,
            marginRight: 8,
            ...buttonTextStyle,
        },
    });

    return (
        <Pressable
            testID={testID}
            style={styles.buttonContainer}
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                navigation.navigate(navigateToRoute, navigationParams);
            }}
        >
            <TextTranslated style={styles.buttonText} text={buttonText} />
            <FontAwesome5 name="arrow-right" size={16} color={colors.text} />
        </Pressable>
    );
};
