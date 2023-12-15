import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CourseCard } from './card/CourseCard';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useMapMultipleCoursesToData } from '../../lib/repositories/courses/mapMultipleCourseToData';
import useAllCourses from '../../lib/repositories/courses/useAllCourses';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { CourseDataMapped } from '../../types/Course';
import { TextTranslated } from '../general/text/TextTranslated';

function getAmountCompletedTask(course: CourseDataMapped) {
    if (!course.stageData) return 0;
    return course.stageData?.map((stage) => stage.isCompletedByUser).length;
}

type Props = {
    marginTop?: number;
    limit?: number;
};

export function CoursesOverview({ marginTop, limit }: Props) {
    const fonts = useFonts();
    const { data, isLoading, error } = useAllCourses();
    const courses = useMapMultipleCoursesToData(data);
    const navigator = useNavigation();
    const isLimited = limit !== undefined && limit > 0;

    const selectedCourses = isLimited
        ? getRandomLimitedItemsFromArray(courses, limit)
        : courses;

    const styles = StyleSheet.create({
        cardContainer: {
            marginTop: marginTop ?? 15,
        },
    });

    function onPress(courseId: string) {
        HapticFeedback(HapticForces.Light);
        navigator.navigate(Routes.StageOverview.toString(), {
            courseId,
        });
    }

    if (isLoading) {
        return <TextTranslated style={fonts.default} text="Loading..." />;
    }

    if (error) {
        return (
            <TextTranslated
                style={fonts.h1}
                text="An error occurred while loading the data"
            />
        );
    }

    return (
        <View style={styles.cardContainer} testID="test-container">
            {selectedCourses?.map((course: CourseDataMapped) => (
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
    );
}
