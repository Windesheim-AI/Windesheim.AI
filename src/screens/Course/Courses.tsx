import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

import { TextTranslated } from '../../components/general/text/TextTranslated';
import { IntractableView } from '../../components/general/views/IntractableView';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../lib/fetcher/useCourseWithData';
import { useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { Routes } from '../../routes/routes';
import { CourseDataMapped } from '../../types/Course';

export function Courses() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const { data, isLoading } = useCourseWithData();
    const navigator = useNavigation();

    const storeDispatcher = useAppDispatch();
    useEffect(() => {
        storeDispatcher(setLoading(isLoading));
    }, [isLoading, storeDispatcher]);

    const courses: CourseDataMapped[] = data;

    if (isLoading) {
        return null;
    }

    function getProgressPercentage(course: CourseDataMapped) {
        const stages = course.stages;
        const stagesCompleted = stages.filter(
            (stage) => stage.isCompletedByUser,
        );
        return (stagesCompleted.length / stages.length) * 100;
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
        navigator.navigate(Routes.CourseOverview.toString(), {
            courseId,
        });
    }

    return (
        <PageScrollView>
            <TextTranslated style={fonts.h1} text="Courses" />

            {/* map the courses */}
            <View style={styles.cardContainer}>
                {courses.map((course: CourseDataMapped) => (
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
    );
}
