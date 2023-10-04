import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import useTheme from '../utils/ThemeUtil';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            flex: 1,
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="WTR"
                onPress={() => navigation.navigate('WTR', { screen: 'WTR' })}
            />
        </View>
    );
};
