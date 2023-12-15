import React from 'react';
import { View } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { TitleWithSeeAll } from '../components/general/text/TitleWithSeeAll';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { PromptsLimitedView } from '../components/promptLibary/PromptsLimitedView';
import { Routes } from '../routes/routes';

export const HomeScreen = () => {
    const description =
        'Artificial intelligence is the key to innovating the future and transforming our lives';

    return (
        <PageScrollView title="Home" description={description}>
            <View>
                <TitleWithSeeAll
                    title="Useful Prompts"
                    navigateToRoute={Routes.PromptLibrary}
                />
                <PromptsLimitedView limit={3} />
            </View>

            <Themes limit={3} />
            <TechProviders limit={3} />
        </PageScrollView>
    );
};
