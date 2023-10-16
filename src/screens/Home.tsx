import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CustomButton } from '../components/buttons/Button';
import { colorSchemes, useColorConfig } from '../constants/Colors';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <CustomButton
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={colorSchemes.blue}
                screenName="WTR"
                width={100}
            />
        </View>
    );
};
