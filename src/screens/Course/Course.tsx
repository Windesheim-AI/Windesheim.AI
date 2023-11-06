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
import { Stage } from '../../types/Stage';

export default function CoursePage() {
    //@ts-ignore
    const course: Course = j;
    const activeStageId = '1';
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

    const stage = course.stages.find((e) => e.id === activeStageId) as Stage;

    return (
        <PageView>
            <CourseNavigation
                title={course.title}
                subTitle={
                    course.stages.find((e) => e.id === activeStageId)?.title ??
                    'test'
                }
            />

            <Progress.Bar
                progress={course.stages.length / Number.parseInt(activeStageId)}
                width={null}
                style={styles.progressBar}
            />
            <View style={styles.courseTitle}>
                <TextTranslated text={course.title} />
            </View>

            <StageRenderer key={stage.id} stage={stage} />
            {/*
            <View style={fonts.description}>
                <TextTranslated text={course.text} />
            </View>

            <AIGeneratedOutput
                prompt={course.prompt}
                text={course.generatedText}
            />

            <View style={styles.button}>
                <Button
                    buttonText={course.buttonText}
                    colorGradientScheme={course.colorGradientScheme}
                    screenName={course.screenName}
                />
            </View> */}
        </PageView>
    );
}
