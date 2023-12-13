import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CourseCard } from '../../components/course/card/CourseCard';
import { DataWrapper } from '../../components/general/base/DataWrapper';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useMapMultipleCoursesToData } from '../../lib/repositories/courses/mapMultipleCourseToData';
import useAllCourses from '../../lib/repositories/courses/useAllCourses';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { CourseDataMapped } from '../../types/Course';

function getAmountCompletedTask(course: CourseDataMapped) {
    if (!course.stageData) return 0;
    return course.stageData?.map((stage) => stage.isCompletedByUser).length;
}

export function Courses() {
    const fonts = useFonts();
    const { data, isLoading, error } = useAllCourses();
    const courses = useMapMultipleCoursesToData(data);
    const navigator = useNavigation();

    const styles = StyleSheet.create({
        cardContainer: {
            marginTop: 15,
        },
    });

    function onPress(courseId: string) {
        HapticFeedback(HapticForces.Light);
        navigator.navigate(Routes.StageOverview.toString(), {
            courseId,
        });
    }

    return (
        <DataWrapper error={error} isLoading={isLoading}>
            <PageScrollView>
                <TextTranslated style={fonts.h1} text="Courses" />

                <GoBackButton
                    onPress={() => navigator.navigate(Routes.Study)}
                    buttonText="Study"
                />

                {/* map the courses */}
                <View style={styles.cardContainer} testID="test-container">
                    {courses?.map((course: CourseDataMapped) => (
                        <View
                            testID={`course-card-${course.courseId}`}
                            key={course.courseId}
                        >
                            <CourseCard
                                key={course.courseId}
                                title={course.title}
                                completedTasks={getAmountCompletedTask(course)}
                                totalTasks={course.stageData?.length ?? 0}
                                level="0"
                                likes={0}
                                onPress={() => onPress(course.courseId)}
                            />
                        </View>
                    ))}
                </View>
            </PageScrollView>
        </DataWrapper>
    );
}
