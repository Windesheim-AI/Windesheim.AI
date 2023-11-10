import * as React from 'react';

import { ListButton } from '../components/buttons/ListButton';
import { PageView } from '../components/general/PageView';
import { Routes } from '../routes/routes';

export const StudyScreen = () => {
    return (
        <PageView title="Welcome to WIN game">
            <ListButton
                buttonText="Study"
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
            <ListButton
                buttonText="Game"
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
            <ListButton
                buttonText="Community of Practice"
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
        </PageView>
    );
};
