import React from 'react';

import { TechProviders } from '../components/WTR/TechProviders';
import { AmazingCard } from '../components/general/base/AmazingCard';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';
import { HomePrompts } from '../components/home/HomePrompts';
import { useColorStateConfig } from '../lib/constants/Colors';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';
    const colorStateConfig = useColorStateConfig();

    return (
        <WhScrollView>
            <PageView title="Home" description={description}>
                <AmazingCard
                    colorGradientScheme={colorStateConfig.colors.secondary}
                />
                <HomePrompts />
                <TechProviders limit={5} />
            </PageView>
        </WhScrollView>
    );
};
