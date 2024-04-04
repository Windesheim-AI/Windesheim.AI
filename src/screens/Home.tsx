import React from 'react';

import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { Introduction } from '../components/general/card/Introduction';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const HomeScreen = () => {
    return (
        <PageScrollView>
            <Introduction />
            <DisclaimerCard data-testid="disclaimerText" />
        </PageScrollView>
    );
};
