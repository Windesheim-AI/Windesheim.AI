import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { useColorConfig } from '../constants/Colors';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        description: {
            color: 'gray',
            fontSize: 16,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Home</Text>
            <Text style={styles.description}>
                "Artificial intelligence is the key to innovating the future and transforming our lives"
            </Text>
            <Button
                title="WTR"
                onPress={() => navigation.navigate('WTR', { screen: 'WTR' })}
            />
        </View>
    );
};
