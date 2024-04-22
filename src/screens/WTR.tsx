import React from 'react';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const WTRScreen = () => {
    return (
        <PageScrollView title="WINDESHEIM TECH RADAR">
            <Themes />
            <TechProviders />
        </PageScrollView>
    );
};
