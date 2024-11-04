import React from 'react';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { Introduction } from '../components/general/card/Introduction';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';

export const HomeScreen = () => {
    return (
        <PageScrollView>
            <Introduction />
            <DisclaimerCard />
        </PageScrollView>
    );
};
