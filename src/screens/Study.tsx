import React from 'react';

import { ListButton } from '../components/general/buttons/ListButton';
import { PageView } from '../components/general/views/PageView';
import { Routes } from '../routes/routes';

export const StudyScreen = () => {
    return (
        <PageView
            title="Welcome to study"
            description="Knowing is like turning on a light on the way trying to go."
        >
            <ListButton
                buttonText="Courses"
                screenName={Routes.Courses}
                width={100}
                testId="courses-button"
            />
            <ListButton
                buttonText="Prompt Library"
                screenName={Routes.PromptLibrary}
                width={100}
                testId="prompt-library-button"
            />
        </PageView>
    );
};
