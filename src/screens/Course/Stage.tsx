import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { DataWrapper } from '../../components/base/DataWrapper';
import { CourseNavigation } from '../../components/course/CourseNavigation';
import StageRenderer from '../../components/course/StageRenderer';
import { Button } from '../../components/general/buttons/Button';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import {
    shadow,
    stateColorSchemes,
    useColorConfig,
} from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useMapSingleCourseToData } from '../../lib/repositories/courses/mapSingleCourseToData';
import useSingleCourse from '../../lib/repositories/courses/useSingleCourse';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { useAppDispatch } from '../../redux/Hooks';
import { courseDataActions } from '../../redux/slices/CourseDataSlice';
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
    const params = route.params as CoursePageProps;
    const storeDispatcher = useAppDispatch();

    const stageId = params.stageId;
    const courseId = params.courseId;

    const { data, isLoading, error } = useSingleCourse(courseId);
    const course = useMapSingleCourseToData(data);

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
        container: {
            paddingBottom: 30,
            height: '100%',
            backgroundColor: colors.background,
        },
    });

    // this meaning there is not data, while loading has finished.
    if ((!data && !isLoading) || !course.stageData) {
        return (
            <View style={styles.container}>
                <PageScrollView>
                    <TextTranslated text="Course not found!" />
                </PageScrollView>
            </View>
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

    return (
        <DataWrapper error={error} isLoading={isLoading}>
            <View style={styles.container}>
                <PageScrollView>
                    {stage ? (
                        <>
                            <CourseNavigation
                                title={course.title ?? ''}
                                subTitle={stage.title}
                                stages={course.stageData}
                                courseId={course.courseId}
                                currentStageId={stageId}
                            />
                            <Progress.Bar
                                progress={
                                    (activeStageCount + 1) /
                                    course.stageData.length
                                }
                                width={null}
                                style={styles.progressBar}
                            />
                            <TextTranslated
                                style={styles.courseTitle}
                                text={course.title ?? ''}
                            />

                            <StageRenderer
                                key={stage.id}
                                courseId={course.courseId}
                                stage={stage}
                            />
                            <Button
                                buttonText="Next"
                                onPress={onPress}
                                colorGradientScheme={stateColorSchemes.primary}
                                testId={`next-stage-${stage.id}-button`}
                            />
                        </>
                    ) : (
                        <TextTranslated
                            style={styles.courseTitle}
                            text="Course not found!"
                        />
                    )}
                </PageScrollView>
            </View>
        </DataWrapper>
    );
}
