import React from 'react';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Theme';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageView title="Home" description={description}>
            {/* WTR-site content */}
            <WhScrollView>
                <TechProviders />
                <Themes />
            </WhScrollView>
        </PageView>
    );
};
