import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { WTRSContentScreenProps } from './WTRContent';
import { TechProviders } from '../../components/WTR/TechProviders';
import { Themes } from '../../components/WTR/Themes';
import { WTRContentDisplay } from '../../components/WTR/WTRContentDisplay';
import { PageView } from '../../components/general/PageView';

export const WTRScreen = () => {
    const route = useRoute();

    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();

    if (page) {
        return <WTRContentDisplay page={page} />;
    }

    return (
        <PageView title="Windesheim Tech Radar">
            <TechProviders />
            <Themes />
        </PageView>
    );
};
