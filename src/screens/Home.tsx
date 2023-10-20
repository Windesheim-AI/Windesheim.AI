import * as React from 'react';

import { Button } from '../components/buttons/Button';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes } from '../constants/Colors';
import { routes } from '../routes/routes';

export const HomeScreen = () => {
    return (
        <PageView
            title="Home"
            description='"Artificial intelligence is the key to innovating the future and transforming our lives"'
        >
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={routes.WTR}
                width={100}
            />
        </PageView>
    );
};
