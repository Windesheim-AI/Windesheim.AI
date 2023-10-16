import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useColorConfig } from '../constants/Colors';
import { any } from 'cypress/types/bluebird';
import { useAppDispatch } from '../redux/Hooks';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const colors = useColorConfig();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dispatch = useAppDispatch();

    const styles = StyleSheet.create({
        button: {
            marginBottom: 10,
        },
        container: {
            alignItems: 'center',
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            width: '100%',
        },
        contentContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            width: '100%',
        },
        width100: {
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                style={styles.width100}
            >
                <Text>Home Screen</Text>
                <Button
                    style={styles.button}
                    title="Test"
                    onPress={() =>
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                        dispatch({
                            type: 'navigation/showNavBar',
                            payload: true,
                        })
                    }
                />
                <Text>Home Screen</Text>
                <Button
                    style={styles.button}
                    title="Test"
                    onPress={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                        dispatch({
                            type: 'navigation/showNavBar',
                            payload: false,
                        });
                    }}
                />
            </ScrollView>
        </View>
    );
};
