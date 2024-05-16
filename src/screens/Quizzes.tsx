import React from 'react';
import { View } from 'react-native';

import { CoursesOverview } from '../components/course/CoursesOverview';
import { TextTranslated } from '../components/general/text/TextTranslated';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useColorConfig } from '../lib/constants/Colors';
import { useFonts } from '../lib/constants/Fonts';

export function Quizzes() {
    const colors = useColorConfig();
    const fonts = useFonts();
    const styles = {
        text: {
            ...fonts.h1,
            color: colors.text,
        },
    };
    return (
        <PageScrollView>
            <View>
                <TitleSimple
                    titleText="Courses"
                    explainationText="Here you'll find an overview of all the courses that are available to you. You can find more information about the courses by clicking on them."
                />
                <CoursesOverview />
            </View>
            <View>
                <TitleSimple
                    titleText="Quizzes"
                    explainationText="Soon you'll find the latest quizzes here to learn more about Generative AI in a fun and interactive way."
                />
                <TextTranslated style={styles.text} text="Coming Soon!" />
            </View>
        </PageScrollView>
    );
}
