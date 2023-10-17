import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useColorConfig } from '../constants/Colors';
import { useAppDispatch } from '../redux/Hooks';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const colors = useColorConfig();

    const dispatch = useAppDispatch();

    const styles = StyleSheet.create({
        button: {
            marginBottom: 10,
        },
        container: {
            alignItems: 'center',
            backgroundColor: colors.background,
            flex: 1,
            height: 1000,
            padding: 20,
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                title="Show NavBar"
                onPress={() =>
                    dispatch({
                        type: 'navigation/showNavBar',
                        payload: true,
                    })
                }
            />
            <Button
                style={styles.button}
                title="Hide NavBar"
                onPress={() => {
                    dispatch({
                        type: 'navigation/showNavBar',
                        payload: false,
                    });
                }}
            />

            <Button
                style={styles.button}
                title="Test page"
                onPress={() => {
                    navigation.navigate('Test', { screen: 'Test' });
                }}
            />
        </View>
    );
};
