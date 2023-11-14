import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

import * as j from '../../assets/courses/test.json';
import { InteractableView } from '../../components/general/InteractableView';
import { PageScrollView } from '../../components/general/PageScrollView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../hooks/useCourseWithData';
import { Routes } from '../../routes/routes';
import { Course } from '../../types/Course';

export function Courses() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const courses = [j] as unknown as Course[];
    const navigator = useNavigation();

    const currentCourse = useCourseWithData(courses[0].id);

    const completedStages = currentCourse.stageData.filter(
        (stage) => stage.isCompletedByUser,
    ).length;
    const totalStages = currentCourse.stageData.length;
    const progressPercentage = Math.round(
        (completedStages / totalStages) * 100,
    );

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
                {courses.map((course: Course) => (
                    <InteractableView
                        key={course.id}
                        style={styles.card}
                        onPress={() => onPress(course.id)}
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
                                progress={progressPercentage / 100}
                                width={null}
                                height={7}
                                borderRadius={10}
                                color={colors.success}
                                unfilledColor={colors.listItemBg}
                            />
                        </View>
                    </InteractableView>
                ))}
            </View>
        </PageScrollView>
    );
}
