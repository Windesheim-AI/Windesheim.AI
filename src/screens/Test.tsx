import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';

import { CustomScrollView } from '../components/CustomScrollView';
import { useColorConfig } from '../constants/Colors';

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
};

export const TestScreen = ({ navigation }: HomeScreenProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
            width: '100%',
        },
    });

    return (
        <CustomScrollView>
            <View style={styles.container}>
                <Text>Test Screen</Text>
                <Button
                    title="Home"
                    onPress={() =>
                        navigation.navigate('Home', { screen: 'Home' })
                    }
                />
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    euismod justo euismod, bibendum velit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elitvestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elitvestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elitvestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elitvestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit vestibulum, bibendum elit vel, bibendum nunc.
                    Sed vel elit
                </Text>
            </View>
        </CustomScrollView>
    );
};
