import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DataWrapper } from '../../components/general/base/DataWrapper';
import { StageCard } from '../../components/general/base/StageCard';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import { useFonts } from '../../lib/constants/Fonts';
import { useMapSingleCourseToData } from '../../lib/repositories/courses/mapSingleCourseToData';
import useSingleCourse from '../../lib/repositories/courses/useSingleCourse';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Stage } from '../../types/Stage';

type StageOverviewPageProps = {
    courseId: string;
    stageId: string;
};

export type StageItemProps = {
    stage: Stage;
};

export default function StageOverview() {
    const fonts = useFonts();

    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as StageOverviewPageProps;
    const courseId = params.courseId;

    const { data, isLoading, error } = useSingleCourse(courseId);
    const course = useMapSingleCourseToData(data);

    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
        },
        courseStageContainer: {
            marginTop: 10,
        },
    });

    function navigateBackToCourses() {
        navigator.navigate(Routes.Courses.toString());
    }

    if (!course?.stageData && !isLoading) {
        return (
            <PageView>
                <View style={styles.container}>
                    <TextTranslated style={fonts.h1} text="Course not found" />
                    <GoBackButton
                        buttonText="Courses"
                        onPress={navigateBackToCourses}
                    />
                </View>
            </PageView>
        );
    }

    return (
        <DataWrapper error={error} isLoading={isLoading}>
            <PageView>
                <View style={styles.container}>
                    <TextTranslated style={fonts.h1} text="Course Overview" />
                    <GoBackButton
                        buttonText="Courses"
                        onPress={navigateBackToCourses}
                    />

                    {/* map the stages of the course */}
                    <View style={styles.courseStageContainer}>
                        {course?.stageData?.map((stage, count) => {
                            return (
                                <StageCard
                                    key={stage.id}
                                    stageTitle={stage.title}
                                    stageIndex={count}
                                    stageDescription={stage.blocks}
                                    courseId={course.courseId}
                                    stageId={stage.id}
                                />
                            );
                        })}
                    </View>
                </View>
            </PageView>
        </DataWrapper>
    );
}
