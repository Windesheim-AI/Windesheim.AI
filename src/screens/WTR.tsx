import React from 'react';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const WTRScreen = () => {
    return (
        <PageScrollView>
            <TitleSimple
                titleText="Windesheim Tech Radar"
                explainationText="The Windesheim Tech Radar is linked to the windesheim.tech website. The Tech Radar is a useful tool to see which technologies (tech providers) and trends (themes) exist and how they relate to each other."
            />
            <TechProviders />
            <Themes />
        </PageScrollView>
    );
};
