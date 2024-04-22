import React from 'react';
import { View } from 'react-native';

import { CoursesOverview } from '../components/course/CoursesOverview';
import { TitleWithSeeAll } from '../components/general/text/TitleWithSeeAll';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { PromptsLimitedView } from '../components/promptLibary/PromptsLimitedView';
import { Routes } from '../routes/routes';

export const StudyScreen = () => {
    return (
        <PageScrollView
            title="STUDY"
            description="Knowing is like turning on a light on the way trying to go."
        >
            <View>
                <TitleWithSeeAll
                    title="Courses"
                    navigateToRoute={Routes.Courses}
                />
                <CoursesOverview marginTop={0} limit={3} />
            </View>

            <View>
                <TitleWithSeeAll
                    title="Prompt Library"
                    navigateToRoute={Routes.PromptLibrary}
                />
                <PromptsLimitedView limit={3} />
            </View>
        </PageScrollView>
    );
};
