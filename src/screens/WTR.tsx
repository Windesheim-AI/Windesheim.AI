import { useRoute } from '@react-navigation/native';
import React from 'react';

import { WTRSContentScreenProps } from './WTR/WTRContent';
import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Theme';
import { WTRContentDisplay } from '../components/WTR/WTRContentDisplay';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';

export const WTRScreen = () => {
    const route = useRoute();

    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();

    if (page) {
        return <WTRContentDisplay page={page} />;
    }

    return (
        <WhScrollView>
            <PageView title="Windesheim Tech Radar">
                <TechProviders />
                <Themes />
            </PageView>
        </WhScrollView>
    );
};
