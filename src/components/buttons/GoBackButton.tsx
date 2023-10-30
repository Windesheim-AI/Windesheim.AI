import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';
import { TextTranslated } from '../text/TextTranslated';

export type GoBackButtonProps = {
    onPress?: () => void;
    buttonText?: string;
};

export const GoBackButton = ({
    onPress,
    buttonText = 'Go Back',
}: GoBackButtonProps) => {
    const colors = useColorConfig();
    const navigation = useNavigation();

    if (!onPress) {
        onPress = () => {
            navigation.goBack();
        };
    }

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
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 8,
        },
    });

    return (
        <Pressable
            testID="GoBackButton"
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <FontAwesome5 name="arrow-left" size={20} color={colors.text} />
            <Text style={styles.buttonText}>
                <TextTranslated text={buttonText} />
            </Text>
        </Pressable>
    );
};
