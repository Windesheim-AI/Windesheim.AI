import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { WTRSContentScreenProps } from './WTRContent';
import { TechProviders } from '../../components/WTR/TechProviders';
import { Themes } from '../../components/WTR/Themes';
import { useColorConfig } from '../../constants/Colors';
import { WTRContentDisplay } from '../../components/WTR/WTRContentDisplay';

export const WTRScreen = () => {
    const route = useRoute();
    const colors = useColorConfig();

    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
            height: '100%',
        },
    });

    if (page) {
        return <WTRContentDisplay page={page} />;
    }

    return (
        <View style={styles.container}>
            <TechProviders />
            <Themes />
        </View>
    );
};
