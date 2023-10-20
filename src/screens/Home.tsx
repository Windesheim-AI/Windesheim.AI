import * as React from 'react';

import { Button } from '../components/buttons/Button';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes } from '../constants/Colors';
import { Routes } from '../routes/routes';

export const HomeScreen = () => {
    return (
        <PageView
            title="Home"
            description='"Artificial intelligence is the key to innovating the future and transforming our lives"'
        >
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
        </PageView>
    );
};
