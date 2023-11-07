import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as j from '../../assets/courses/test.json';
import { Button } from '../../components/buttons/Button';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { buttonColorSchemes, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Course } from '../../types/Course';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type CourseFinishedProps = {
    courseId: string;
};

export default function CourseFinished() {
    const route = useRoute();
    const colors = useColorConfig();
    const params = route.params as CourseFinishedProps;
    //@ts-ignore
    const course: Course = j; //later replaced dby a fetch.

    const fonts = useFonts();
    const styles = StyleSheet.create({
        courseTitle: {
            ...fonts.h1,
        },
        courseSubTitle: {
            ...fonts.courseTitle,
            marginBottom: 30,
        },
        container: {
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
        },
        icon: {
            marginBottom: 10,
        },
    });
    return (
        <PageView>
            <View style={styles.container}>
                <FontAwesome5Icon
                    name="react"
                    style={styles.icon}
                    size={200}
                    color={colors.text}
                />
                <View style={styles.courseTitle}>
                    <TextTranslated text="Course finished!" />
                </View>
                <View style={styles.courseSubTitle}>
                    <TextTranslated text={course.title} />
                </View>
                <Button
                    buttonText="Home"
                    screenName="Home"
                    colorGradientScheme={buttonColorSchemes.success}
                />
            </View>
        </PageView>
    );
}
