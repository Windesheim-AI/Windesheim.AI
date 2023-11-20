import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

import { DataWrapper } from '../../components/base/DataWrapper';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { IntractableView } from '../../components/general/views/IntractableView';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import useAllCourses from '../../lib/fetcher/useAllCourses';
import { Routes } from '../../routes/routes';
import { CourseDataMapped } from '../../types/Course';
import { useMapMultipleCoursesToData } from '../../util/data/mapMultipleCourseToData';

export function Courses() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const { data, isLoading, error } = useAllCourses();
    const courses = useMapMultipleCoursesToData(data);
    const navigator = useNavigation();

    function getProgressPercentage(course: CourseDataMapped) {
        const stages = course.stageData;
        const stagesCompleted = stages.filter(
            (stage) => stage.isCompletedByUser,
        );
        return stagesCompleted.length / stages.length;
    }

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            ...shadow,
            elevation: 5,
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
        //@ts-ignore
        navigator.navigate(Routes.StageOverview.toString(), {
            courseId,
        });
    }

    return (
        <DataWrapper error={error} isLoading={isLoading}>
            <PageScrollView>
                <TextTranslated style={fonts.h1} text="Courses" />

                {/* map the courses */}
                <View style={styles.cardContainer}>
                    {courses?.map((course: CourseDataMapped) => (
                        <IntractableView
                            key={course.courseId}
                            style={styles.card}
                            onPress={() => onPress(course.courseId)}
                        >
                            <TextTranslated
                                style={styles.title}
                                text={course.title}
                            />
                            <TextTranslated
                                style={styles.description}
                                text={course.description}
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
