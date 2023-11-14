import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { StageItem } from './StageItem';
import { Button } from '../../components/buttons/Button';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { stateColorSchemes } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../hooks/useCourseWithData';
import { Routes } from '../../routes/routes';
import { Stage, StageDataMapped } from '../../types/Stage';

type CourseOverviewPageProps = {
    courseId: string;
    stageId: string;
};

export type StageItemProps = {
    stage: Stage;
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
                />
            </View>
        </PageView>
    );
}
