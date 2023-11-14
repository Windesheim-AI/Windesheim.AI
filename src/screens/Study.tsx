import * as React from 'react';

import { ListButton } from '../components/general/buttons/ListButton';
import { PageView } from '../components/general/views/PageView';
import { Routes } from '../routes/routes';

export const StudyScreen = () => {
    return (
        <PageView title="Welcome to WIN game">
            <ListButton
                buttonText="Courses"
                screenName={Routes.Courses}
                width={100}
            />
        </PageView>
    );
};
