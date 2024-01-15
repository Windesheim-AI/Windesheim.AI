import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

import { DataWrapper } from '../../components/general/base/DataWrapper';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { IntractableView } from '../../components/general/views/IntractableView';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useMapMultipleCoursesToData } from '../../lib/repositories/courses/mapMultipleCourseToData';
import useAllCourses from '../../lib/repositories/courses/useAllCourses';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { CourseDataMapped } from '../../types/Course';

function getProgressPercentage(course: CourseDataMapped) {
    const stages = course.stageData;
    if (stages.length === 0) {
        return 0;
    }

    const stagesCompleted = stages?.filter((stage) => stage.isCompletedByUser);
    if (stagesCompleted?.length === 0) {
        return 0;
    }

    return stagesCompleted.length / stages.length;
}

export function Courses() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const { data, isLoading, error } = useAllCourses();
    const courses = useMapMultipleCoursesToData(data);
    const navigator = useNavigation();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            ...shadow,
            elevation: 5,
            ...colorStateConfig.highContrastBorder,
        },
        title: {
            ...fonts.courseTitle,
        },
        description: {
            ...fonts.description,
            marginTop: 10,
        },
        progressBar: {
            marginTop: 15,
            ...shadow,
        },
        cardContainer: {
            marginTop: 15,
        },
    });

    function onPress(courseId: string) {
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
                        <IntractableView
                            key={course.courseId}
                            style={styles.card}
                            onPress={() => onPress(course.courseId)}
                            testID={`course-card-${course.courseId}`}
                        >
                            <TextTranslated
                                style={styles.title}
                                text={course.title ?? ''}
                            />
                            <TextTranslated
                                style={styles.description}
                                text={course.description ?? ''}
                            />

                            <View style={styles.progressBar}>
                                <Bar
                                    progress={getProgressPercentage(course)}
                                    width={null}
                                    height={7}
                                    borderRadius={10}
                                    color={colors.success}
                                    unfilledColor={colors.listItemBg}
                                />
                            </View>
                        </IntractableView>
                    ))}
                </View>
            </PageScrollView>
        </DataWrapper>
    );
}
