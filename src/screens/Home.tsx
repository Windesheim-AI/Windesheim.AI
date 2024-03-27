import React from 'react';
import { View } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { TitleWithSeeAll } from '../components/general/text/TitleWithSeeAll';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageScrollView title="Home" description={description}>
            <DisclaimerCard />
        </PageScrollView>
    );
};
