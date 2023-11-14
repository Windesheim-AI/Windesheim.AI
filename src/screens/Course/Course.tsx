import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

import * as courseTestData from '../../assets/courses/test.json';
import { Button } from '../../components/buttons/Button';
import { CourseNavigation } from '../../components/course/CourseNavigation';
import StageRenderer from '../../components/course/StageRenderer';
import { TextTranslated } from '../../components/text/TextTranslated';
import {
    buttonColorSchemes,
    shadow,
    useColorConfig,
} from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useAppDispatch } from '../../redux/Hooks';
import { courseDataActions } from '../../redux/slices/CourseDataSlice';
import { Routes } from '../../routes/routes';
import { Course } from '../../types/Course';
import { PageScrollView } from '../../components/general/PageScrollView';

type CoursePageProps = {
    courseId: string;
    stageId: string;
};

export default function CoursePage() {
    //@ts-ignore
    const course: Course = courseTestData; //later replaced dby a fetch.
    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as CoursePageProps;

    const storeDispatcher = useAppDispatch();

    const stageId = params.stageId;
    if (stageId === 'start') {
        //@ts-ignore
        navigator.navigate(Routes.Course.toString(), {
            courseId: course.id,
            stageId: course.stages[0].id,
        });
    }
    const activeStageCount = course.stages.findIndex((e) => e.id === stageId);

    const fonts = useFonts();
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        progressBar: {
            marginTop: 15,
            ...shadow,
            borderColor: colors.listItemBg,
            color: colors.primary,
        },
        courseTitle: {
            ...fonts.h1,
            marginTop: 15,
            marginBottom: 10,
        },
    });

    if (!course) {
        return null; // or a loading indicator
    }

    const stage = course.stages.find((e) => e.id === stageId)!;
    const nextStage = course.stages[activeStageCount + 1];
    function onPress() {
        // store

        // complete the stage in the array
        storeDispatcher(
            courseDataActions.completeStage({
                courseId: course.id,
                stageId,
            }),
        );

        if (!nextStage) {
            //@ts-ignore
            navigator.navigate(Routes.CourseFinished.toString(), {
                courseId: course.id,
            });
            return;
        }

        //@ts-ignore
        navigator.navigate(Routes.Course.toString(), {
            courseId: course.id,
            stageId: nextStage.id,
        });
    }

    return (
        <PageScrollView>
            {stage ? (
                <>
                    <CourseNavigation
                        title={course.title}
                        subTitle={
                            course.stages.find((e) => e.id === stageId)
                                ?.title ?? 'test'
                        }
                        stages={course.stages}
                        courseId={course.id}
                        currentStageId={stageId}
                    />
                    <Progress.Bar
                        progress={(activeStageCount + 1) / course.stages.length}
                        width={null}
                        style={styles.progressBar}
                    />
                    <View style={styles.courseTitle}>
                        <Text>
                            <TextTranslated text={course.title} />
                        </Text>
                    </View>
                    <StageRenderer
                        key={stage.id}
                        courseId={course.id}
                        stage={stage}
                    />
                    <Button
                        buttonText="Next"
                        onPress={onPress}
                        colorGradientScheme={buttonColorSchemes.primary}
                    />
                </>
            ) : (
                <View style={styles.courseTitle}>
                    <Text>
                        <TextTranslated text="Course not found!" />
                    </Text>
                </View>
            )}
        </PageScrollView>
    );
}