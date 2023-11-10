import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress';

import { shadow, useColorConfig } from './../../constants/Colors';
import * as j from '../../assets/courses/test.json';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useFonts } from '../../constants/Fonts';
import { useCourseWithData } from '../../hooks/useCourseWithData';
import { Course } from '../../types/Course';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes/routes';

export function Courses() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const courses = [j] as unknown as Course[];
    const navigator = useNavigation();

    const course = useCourseWithData(courses[0].id);

    const completedStages = course.stageData.filter(
        (stage) => stage.isCompletedByUser,
    ).length;
    const totalStages = course.stageData.length;
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
        <PageView>
            <View style={fonts.h1}>
                <TextTranslated text="Courses" />
            </View>

            {/* map the courses */}
            <View style={styles.cardContainer}>
                {courses.map((course: Course) => (
                    <View
                        key={course.id}
                        style={styles.card}
                        onTouchEnd={() => {
                            onPress(course.id);
                        }}
                    >
                        <View style={styles.title}>
                            <TextTranslated text={course.title} />
                        </View>
                        <View style={styles.description}>
                            <TextTranslated text={course.description} />
                        </View>

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
                    </View>
                ))}
            </View>
        </PageView>
    );
}
