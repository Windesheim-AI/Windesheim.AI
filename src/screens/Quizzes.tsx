import React from 'react';
import { View } from 'react-native';

import { CoursesOverview } from '../components/course/CoursesOverview';
import { TextTranslated } from '../components/general/text/TextTranslated';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';

export function Quizzes() {
    return (
        <PageScrollView>
            <View>
                <TitleSimple
                    titleText="Courses"
                    explainationText="Here you will soon find the newest interactive courses to learn about Generative AI."
                />
                <CoursesOverview />
            </View>
            <View>
                <TitleSimple
                    titleText="Quizzes"
                    explainationText="Here you will soon find the newest quizzes to learn in a fun and interactive way about Generative AI."
                />
                <TextTranslated text="Loading..." />
            </View>
        </PageScrollView>
    );
}
