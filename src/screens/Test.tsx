import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import { PageScrollView } from '../components/general/PageScrollView';
import { useColorConfig } from '../constants/Colors';
import { RootState, useAppSelector } from '../redux/Store';

export const TestScreen = () => {
    const themeState = useAppSelector((state: RootState) => state.theme);
    const colors = useColorConfig(themeState.theme);

    const styles = StyleSheet.create({
        text: {
            color: colors.text,
        },
    });

    return (
        <PageScrollView title="Test">
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod justo euismod, bibendum velit vel, bibendum nunc. Sed
                vel elit vestibulum, bibendum elit vel, bibendum nunc. Sed vel
                elit vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel
                elitvestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel
                elitvestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel
                elitvestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel
                elitvestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
                vestibulum, bibendum elit vel, bibendum nunc. Sed vel elit
            </Text>
        </PageScrollView>
    );
};
