import * as React from 'react';
import { View } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Theme';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';

export const HomeScreen = () => {
    return (
        <PageView
            title="Home"
            description="Artificial intelligence is the key to innovating the
                future and transforming our lives"
        >
            {/* WTR-site content */}
            <WhScrollView>
                <View>
                    <TechProviders />
                    <Themes />
                </View>
            </WhScrollView>
        </PageView>
    );
};
