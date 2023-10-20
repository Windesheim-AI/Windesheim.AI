import * as React from 'react';

import { Button } from '../components/buttons/Button';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes } from '../constants/Colors';

export const SettingsScreen = () => {
    return (
        <PageView title="Settings">
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName="WTR"
                width={100}
            />
        </PageView>
    );
};
