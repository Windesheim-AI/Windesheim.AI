import React from 'react';

import { TechProviders } from '../components/WTR/TechProviders';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';
import { HomePrompts } from '../components/home/HomePrompts';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <WhScrollView>
            <PageView title="Home" description={description}>
                <HomePrompts />
                <TechProviders limit={5} />
            </PageView>
        </WhScrollView>
    );
};
