import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

import * as j from '../../assets/courses/test.json';
import { CourseNavigation } from '../../components/course/CourseNavigation';
import StageRenderer from '../../components/course/StageRenderer';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Course } from '../../types/Course';

type CoursePageProps = {
    courseId: string;
    stageId: string;
};

export default function CoursePage() {
    //@ts-ignore
    const course: Course = j; //later replaced dby a fetch.
    const route = useRoute();
    const params = route.params as CoursePageProps;

    const stageId = params.stageId;
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

    return (
        <PageView>
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
                        <TextTranslated text={course.title} />
                    </View>
                    <StageRenderer
                        key={stage.id}
                        courseId={course.id}
                        stage={stage}
                    />
                </>
            ) : (
                // eslint-disable-next-line react-native/no-raw-text
                <h1>Course not found!</h1>
            )}
        </PageView>
    );
}
