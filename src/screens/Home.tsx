import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet, useColorScheme } from 'react-native';

import Colors from '../constants/Colors';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor:
                colorScheme === 'dark'
                    ? Colors.dark.background
                    : Colors.light.background,
            flex: 1,
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Details"
                onPress={() =>
                    navigation.navigate('Details', { screen: 'DetailsScreen' })
                }
            />
        </View>
    );
};
