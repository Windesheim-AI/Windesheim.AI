import { useRoute } from '@react-navigation/native';
import React from 'react';

import { WTRSContentScreenProps } from './WTR/WTRContent';
import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { WTRContentDisplay } from '../components/WTR/WTRContentDisplay';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const WTRScreen = () => {
    const route = useRoute();

    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();

    if (page) {
        return <WTRContentDisplay page={page} />;
    }

    return (
        <PageScrollView title="Windesheim Tech Radar">
            <TechProviders />
            <Themes />
        </PageScrollView>
    );
};
