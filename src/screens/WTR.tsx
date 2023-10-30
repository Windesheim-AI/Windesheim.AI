/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { WTRSContentcreenProps } from './WTRContent';
import { TechProviders } from '../components/WTR/TechProfiders';
import { Routes } from '../routes/routes';

export const WTRScreen = () => {
    const navigator = useNavigation();
    const route = useRoute();
    const params = route.params as WTRSContentcreenProps;
    const page = params?.page?.toString();

    useEffect(() => {
        if (page && page != 'view') {
            navigator.navigate(Routes.WindesheimTechRadarContent, { page });
        }
    }, [navigator, page]);

    return (
        <View>
            <Text>WTRScreen</Text>
            <TechProviders />
        </View>
    );
};
