import * as React from 'react';

import { ListButton } from '../components/buttons/ListButton';
import { PageView } from '../components/general/PageView';
import { useStaticLoading } from '../lib/utility/loaderFunctions';
import { Routes } from '../routes/routes';

export const StudyScreen = () => {
    useStaticLoading();
    return (
        <PageView title="Welcome to WIN game">
            <ListButton
                buttonText="Study"
                screenName={Routes.WindesheimTechRadarContent}
                width={100}
            />
            <ListButton
                buttonText="Game"
                screenName={Routes.WindesheimTechRadarContent}
                width={100}
            />
            <ListButton
                buttonText="Community of Practice"
                screenName={Routes.WindesheimTechRadarContent}
                width={100}
            />
        </PageView>
    );
};
