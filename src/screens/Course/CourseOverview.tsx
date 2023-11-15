import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { StageItem } from './StageItem';
import { Button } from '../../components/general/buttons/Button';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import { stateColorSchemes } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../lib/fetcher/courses/useCourseWithData';
import { Routes } from '../../routes/routes';

type CourseOverviewPageProps = {
    courseId: string;
    stageId: string;
};

export default function CourseOverview() {
    const fonts = useFonts();

    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as CourseOverviewPageProps;
    const courseId = params.courseId;

    const course = useCourseWithData(courseId);

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
        },
        courseStageContainer: {
            marginTop: 10,
        },
    });

    function navigateBackToCourses() {
        //@ts-ignore
        navigator.navigate(Routes.Courses.toString());
    }

    return (
        <PageView>
            <View style={styles.container}>
                <TextTranslated style={fonts.h1} text="Course Overview" />

                {/* map the stages of the course */}
                <View style={styles.courseStageContainer}>
                    {course?.stageData.map((stage) => {
                        return (
                            <StageItem
                                key={stage.id}
                                title={stage.title}
                                id={stage.id}
                                description={stage.description}
                                isCompletedByUser={stage.isCompletedByUser}
                                courseId={course.courseId}
                            />
                        );
                    })}
                </View>

                <Button
                    buttonText="Back to Courses"
                    colorGradientScheme={stateColorSchemes.primary}
                    onPress={navigateBackToCourses}
                    testId="back-to-courses-button"
                />
            </View>
        </PageView>
    );
}
