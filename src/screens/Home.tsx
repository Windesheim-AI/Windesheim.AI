import React from 'react';

import { Introduction } from '../components/general/card/Introduction';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageScrollView>
            <Introduction />
            <DisclaimerCard />
        </PageScrollView>
    );
};
