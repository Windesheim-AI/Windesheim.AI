import * as React from 'react';

import { GoBackButton } from '../../components/buttons/GoBackButton';
import { PageView } from '../../components/general/PageView';
import { FontSwitcher } from '../../components/settings/FontSwitcher';

export const FontSettingsScreen = () => {
    return (
        <PageView
            title="Settings > Fonts"
            description="This is a testing setting to demonstrate the capabilities."
        >
            <FontSwitcher />
            <GoBackButton />
        </PageView>
    );
};
