import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../constants/Colors';

export type GoBackButtonProps = {
    onPress?: () => void;
    buttonText?: string;
};

export const GoBackButton = ({
    onPress,
    buttonText = 'Go Back',
}: GoBackButtonProps) => {
    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium,
    });

    const colors = useColorConfig();
    const navigation = useNavigation();

    if (!onPress) {
        onPress = () => {
            navigation.goBack();
        };
    }

    if (!fontsLoaded && !fontError) {
        return null;
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
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 8,
        },
    });

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <FontAwesome5 name="arrow-left" size={20} color={colors.text} />
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};
