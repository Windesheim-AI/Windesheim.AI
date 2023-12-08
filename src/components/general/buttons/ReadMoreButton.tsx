import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../text/TextTranslated';

export type GoBackButtonProps = {
    onPress?: () => void;
    buttonText?: string;
};

export const ReadMoreButton = ({
    onPress,
    buttonText = 'View more',
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

    const styles = StyleSheet.create({
        buttonContainer: {
            borderRadius: 8,
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            color: colors.text,
            ...fonts.description,
            marginRight: 8,
        },
    });

    return (
        <Pressable
            testID="GoBackButton"
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <TextTranslated style={styles.buttonText} text={buttonText} />
            <FontAwesome5 name="arrow-right" size={16} color={colors.text} />
        </Pressable>
    );
};
