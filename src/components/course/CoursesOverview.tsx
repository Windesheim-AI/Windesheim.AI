import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

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
    return course.stageData.filter((stage) => stage.isCompletedByUser).length;
}

type Props = {
    limit?: number;
};

export function CoursesOverview({ limit }: Props) {
    const fonts = useFonts();
    const { data, isLoading, error } = useAllCourses();
    const courses = useMapMultipleCoursesToData(data);
    const navigator = useNavigation();
    const isLimited = limit !== undefined && limit > 0;

    const selectedCourses = isLimited
        ? getRandomLimitedItemsFromArray(courses, limit)
        : courses;

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
        <FlatList
            testID="test-container"
            data={selectedCourses}
            horizontal
            renderItem={({ item }) => (
                <View
                    style={styles.courseCardContainer}
                    testID={`course-card-${item.courseId}`}
                >
                    <CourseCard
                        key={item.courseId}
                        title={item.title}
                        completedTasks={getAmountCompletedTask(item)}
                        totalTasks={item.stageData?.length ?? 0}
                        onPress={() => onPress(item.courseId)}
                    />
                </View>
            )}
            keyExtractor={(item) => item.courseId}
        />
    );
}

const styles = StyleSheet.create({
    courseCardContainer: {
        width: 280,
        marginRight: 20,
    },
});
