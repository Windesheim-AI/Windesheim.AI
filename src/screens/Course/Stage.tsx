import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { CourseNavigation } from '../../components/course/CourseNavigation';
import StageRenderer from '../../components/course/StageRenderer';
import { DataWrapper } from '../../components/general/base/DataWrapper';
import { PlainButton } from '../../components/general/base/PlainButton';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PageView } from '../../components/general/views/PageView';
import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useAppDispatch } from '../../lib/redux/Hooks';
import { courseDataActions } from '../../lib/redux/slices/CourseDataSlice';
import { useMapSingleCourseToData } from '../../lib/repositories/courses/mapSingleCourseToData';
import useSingleCourse from '../../lib/repositories/courses/useSingleCourse';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

type CoursePageProps = {
    courseId: string;
    stageId: string;
};

export default function Stage() {
    const route = useRoute();
    const navigator = useNavigation();
    const fonts = useFonts();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const params = route.params as CoursePageProps;
    const storeDispatcher = useAppDispatch();

    const stageId = params.stageId;
    const courseId = params.courseId;

    const { data, isLoading, error } = useSingleCourse(courseId);
    const course = useMapSingleCourseToData(data);

    const styles = StyleSheet.create({
        progressBar: {
            marginBottom: 15,
            ...shadow,
            borderColor: colors.listItemBg,
            borderWidth: 0,
            backgroundColor: colors.progressbarBg,
        },
        courseTitle: {
            ...fonts.h1,
            marginTop: 15,
            marginBottom: 10,
        },
        container: {
            paddingBottom: 30,
        },
        buttonContainer: {
            marginTop: 30,
            flexDirection: 'row',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        button: {
            marginRight: 10,
        },
    });

    function navigateBackToCourses() {
        navigator.navigate(Routes.Courses.toString());
    }

    // this meaning there is not data, while loading has finished.
    if ((!data && !isLoading) || !course.stageData) {
        return (
            <PageView>
                <View style={styles.container}>
                    <TextTranslated
                        style={styles.courseTitle}
                        text="Course not found!"
                    />
                    <GoBackButton
                        buttonText="Courses"
                        onPress={navigateBackToCourses}
                    />
                </View>
            </PageView>
        );
    }

    const activeStageCount =
        course?.stageData.findIndex((e) => e.id === stageId) ?? 0;

    const stage = course.stageData.find((e) => e.id === stageId);
    const nextStage = course.stageData[activeStageCount + 1] ?? undefined;

    function onPress() {
        // complete the stage in the array
        storeDispatcher(
            courseDataActions.completeStage({
                courseId: course.courseId,
                stageId,
            }),
        );

        if (!nextStage) {
            navigator.navigate(Routes.CourseFinished.toString(), {
                courseId: course.courseId,
            });
            return;
        }

        navigator.navigate(Routes.CourseStage, {
            courseId: course.courseId,
            stageId: nextStage.id,
        });
    }

    function goPrevious() {
        const previousStage =
            course.stageData[activeStageCount - 1] ?? undefined;

        if (!previousStage) {
            navigator.navigate(Routes.Courses.toString());
            return;
        }

        navigator.navigate(Routes.CourseStage, {
            courseId: course.courseId,
            stageId: previousStage.id,
        });
    }

    return (
        <PageScrollView>
            <DataWrapper error={error} isLoading={isLoading}>
                <View style={styles.container}>
                    {stage ? (
                        <>
                            <Progress.Bar
                                progress={
                                    (activeStageCount + 1) /
                                    course.stageData.length
                                }
                                width={null}
                                color={colorStateConfig.colors.secondary[1]}
                                style={styles.progressBar}
                            />
                            <CourseNavigation
                                title={course.title ?? ''}
                                subTitle={stage.title}
                                stages={course.stageData}
                                courseId={course.courseId}
                                currentStageId={stageId}
                            />
                            <StageRenderer
                                key={stage.id}
                                courseId={course.courseId}
                                stage={stage}
                            />
                            <View style={styles.buttonContainer}>
                                <PlainButton
                                    text="Previous"
                                    onPress={goPrevious}
                                    style={styles.button}
                                    backgroundColor={colors.background}
                                />
                                <PlainButton
                                    text="Next"
                                    backgroundColor={
                                        colorStateConfig.colors.secondary[1]
                                    }
                                    onPress={onPress}
                                    style={styles.button}
                                />
                            </View>
                        </>
                    ) : (
                        <TextTranslated
                            style={styles.courseTitle}
                            text="Course step not found!"
                        />
                    )}
                </View>
            </DataWrapper>
        </PageScrollView>
    );
}
