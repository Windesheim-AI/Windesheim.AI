import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import SettingButton from '../components/SettingButton';
import { useColorConfig } from '../constants/Colors';

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

    function handleButtonPress(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="WTR"
                onPress={() => navigation.navigate('WTR', { screen: 'WTR' })}
            />
            <SettingButton
                description="Your setting description goes here"
                title="Your Setting Title"
                onPress={handleButtonPress}
            />
        </View>
    );
};
