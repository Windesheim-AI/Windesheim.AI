import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WTRSContentScreenProps } from './WTRContent';
import { TechProviders } from '../../components/WTR/TechProviders';
import { WhScrollView } from '../../components/general/WhScrollView';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';
import { Themes } from '../../components/WTR/Themes';

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
        <WhScrollView>
            <View style={styles.container}>
                <Text>WTRScreen</Text>
                <TechProviders />
                <Themes />
            </View>
        </WhScrollView>
    );
};
