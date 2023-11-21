import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
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
import useSingleCourse from '../../lib/fetcher/useSingleCourse';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { useAppDispatch } from '../../redux/Hooks';
import { courseDataActions } from '../../redux/slices/CourseDataSlice';
import { Routes } from '../../routes/routes';
import { useMapSingleCourseToData } from '../../util/data/mapSingleCourseToData';

type CoursePageProps = {
    courseId: string;
    stageId: string;
};

export default function Stage() {
    //@ts-ignore
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

    // this meaning there is not data, while loading has finished.
    if (!data && !isLoading) {
        return (
            <DataWrapper error={error} isLoading={isLoading}>
                <TextTranslated text="Course not found!" />
            </DataWrapper>
        );
    }

    const activeStageCount =
        course?.stageData.findIndex((e) => e.id === stageId) ?? 0;

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

    const stage = course.stageData.find((e) => e.id === stageId);
    const nextStage = course.stageData[activeStageCount + 1];
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

        //@ts-ignore
        navigator.navigate(Routes.Stage.toString(), {
            courseId: course.courseId,
            stageId: nextStage.id,
        });
    }

    return (
        <DataWrapper error={error} isLoading={isLoading}>
            <PageScrollView>
                {stage ? (
                    <>
                        <CourseNavigation
                            title={course.title}
                            subTitle={stage.title}
                            stages={course.stageData}
                            courseId={course.courseId}
                            currentStageId={stageId}
                        />
                        <Progress.Bar
                            progress={
                                (activeStageCount + 1) / course.stageData.length
                            }
                            width={null}
                            style={styles.progressBar}
                        />
                        <TextTranslated
                            style={styles.courseTitle}
                            text={course.title}
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
        </DataWrapper>
    );
}
