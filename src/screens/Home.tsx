import React from 'react';

import { Themes } from '../components/WTR/Themes';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { HomePrompts } from '../components/home/HomePrompts';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageScrollView title="Home" description={description}>
            <HomePrompts />
            <Themes limit={3} />
        </PageScrollView>
    );
};
