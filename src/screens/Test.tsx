import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import { PageScrollView } from '../components/general/PageScrollView';
import { useColorConfig } from '../constants/Colors';

export const TestScreen = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        text: {
            color: colors.text,
        },
    });

    return (
        <PageScrollView title="Dit is een Test pagina">
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
