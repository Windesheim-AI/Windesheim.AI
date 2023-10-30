/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WTRSContentScreenProps } from './WTRContent';
import { TechProviders } from '../../components/WTR/TechProfiders';
import { Routes } from '../../routes/routes';
import { useColorConfig } from '../../constants/Colors';

export const WTRScreen = () => {
    const navigator = useNavigation();
    const route = useRoute();
    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();

    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
    });

    useEffect(() => {
        if (page && page !== 'view') {
            //@ts-ignore
            navigator.navigate(Routes.WindesheimTechRadarContent, { page });
        }
    }, [navigator, page]);

    return (
        <View style={styles.container}>
            <Text>WTRScreen</Text>
            <TechProviders />
        </View>
    );
};
