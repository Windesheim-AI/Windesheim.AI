import * as React from 'react';
import { Text, View } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { PageView } from '../components/general/PageView';
import { Link } from '@react-navigation/native';

export const HomeScreen = () => {
    return (
        <PageView
            title="Home"
            description="Artificial intelligence is the key to innovating the
                future and transforming our lives"
        >
            {/* WTR-site content */}
            <View>
                <TechProviders />
                <Themes />
            </View>
            <Link to="/Course">
                <Text>Course</Text>
            </Link>
        </PageView>
    );
};
