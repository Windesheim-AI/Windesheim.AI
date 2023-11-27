import React from 'react';
import { View } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { PageView } from '../components/general/views/PageView';
import { WhScrollView } from '../components/general/views/WhScrollView';
import { HomePrompts } from '../components/home/HomePrompts';
import { Routes } from '../routes/routes';
import { stateColorSchemes } from '../constants/Colors';
import { Button } from '../components/general/buttons/Button';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <WhScrollView>
            <PageView title="Home" description={description}>
                <View>
                    <HomePrompts />
                    <View>
                        <TechProviders limit={5} />
                        <Button
                            buttonText="See all Tech Providers"
                            screenName={Routes.PromptLibrary}
                            colorGradientScheme={stateColorSchemes.success}
                            testId="see-all-tech-providers-button"
                            icon="arrow-right"
                            height={40}
                        />
                    </View>
                </View>
            </PageView>
        </WhScrollView>
    );
};
