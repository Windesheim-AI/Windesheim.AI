import * as React from 'react';

import { GoBackButton } from '../../components/buttons/GoBackButton';
import { PageView } from '../../components/general/PageView';

export const TestSettingScreen = () => {
    return (
        <PageView
            title="Settings > Test"
            description="This is a testing setting to demonstrate the capabilities."
        >
            <GoBackButton />
        </PageView>
    );
};
