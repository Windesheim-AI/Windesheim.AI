import React from 'react';

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { Introduction } from '../components/general/card/Introduction';
import { PageScrollView } from '../components/general/views/PageScrollView';
export const HomeScreen = () => {
    return (
        <PageScrollView>
            <SettingsButton />
            <Introduction />
            <DisclaimerCard />
        </PageScrollView>
    );
};
