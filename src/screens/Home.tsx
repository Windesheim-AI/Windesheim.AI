import React from 'react';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Theme';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';
import { HomePrompts } from '../components/home/HomePrompts';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageView title="Home" description={description}>
            {/* WTR-site content */}
            <WhScrollView>
                <HomePrompts />
                <TechProviders />
                <Themes />
            </WhScrollView>
        </PageView>
    );
};
