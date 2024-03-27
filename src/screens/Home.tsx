import React from 'react';
import { View } from 'react-native';

import { PageScrollView } from '../components/general/views/PageScrollView';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageScrollView title="Home" description={description}>
            <View />
        </PageScrollView>
    );
};
