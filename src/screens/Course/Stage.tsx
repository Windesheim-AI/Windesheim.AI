import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { CourseNavigation } from '../../components/course/CourseNavigation';
import StageRenderer from '../../components/course/StageRenderer';
import { PlainButton } from '../../components/general/base/PlainButton';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
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
            ...colorStateConfig.highContrastBorder,
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
        spacing: {
            height: 7,
        },
    });

    function navigateBackToCourses() {
        navigator.navigate(Routes.Quizzes.toString());
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <PageView title="An error occurred while loading the data">
                <GoBackButton
                    buttonText="Go back"
                    onPress={() => navigateBackToCourses()}
                />
            </PageView>
        );
    }

    if (!data || !course?.stageData) {
        return (
            <PageView title="Course not found!">
                <GoBackButton
                    buttonText="Go back"
                    onPress={() => navigateBackToCourses()}
                />
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
            navigator.navigate(Routes.Quizzes.toString());
            return;
        }

        navigator.navigate(Routes.CourseStage, {
            courseId: course.courseId,
            stageId: previousStage.id,
        });
    }

    return (
        <PageScrollView>
            <View style={styles.container}>
                {stage ? (
                    <>
                        <Progress.Bar
                            progress={
                                (activeStageCount + 1) / course.stageData.length
                            }
                            width={null}
                            color={colors.completedProgressBar}
                            style={styles.progressBar}
                        />
                        <CourseNavigation
                            title={course.title ?? ''}
                            subTitle={stage.title}
                            stages={course.stageData}
                            courseId={course.courseId}
                            currentStageId={stageId}
                        />
                        <View style={styles.spacing} />
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
                                backgroundColor={colors.previousButton}
                            />
                            <PlainButton
                                text="Next"
                                backgroundColor={colors.previousButton}
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
        </PageScrollView>
    );
}
