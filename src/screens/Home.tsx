import * as React from 'react';
import { View } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { PageView } from '../components/general/PageView';
import { Tutorial } from '../components/tutorial/tutorial';

export const HomeScreen = () => {
    return (
        <PageView
            title="Home"
            description="Artificial intelligence is the key to innovating the
                future and transforming our lives"
        >
            {/* WTR-site content */}
            <View>
                <Tutorial />
                <TechProviders />
                <Themes />
            </View>
        </PageView>
    );
};
