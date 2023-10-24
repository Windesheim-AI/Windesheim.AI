import * as React from 'react';

import { GoBackButton } from '../../components/buttons/GoBackButton';
import { PageView } from '../../components/general/PageView';

export const LanguageScreen = () => {
    return (
        <PageView
            title="Settings > Language"
            description='"Artificial intelligence is the key to innovating the future and transforming our lives"'
        >
            <GoBackButton />
        </PageView>
    );
};
