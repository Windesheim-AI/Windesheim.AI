import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as courseTestData from '../../assets/courses/test.json';
import { Button } from '../../components/general/buttons/Button';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import { stateColorSchemes, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Routes } from '../../routes/routes';
import { Course } from '../../types/Course';
import { useAnimatedValue } from '../../lib/utility/animate';

export default function CourseFinished() {
    const colors = useColorConfig();
    //@ts-ignore
    const course: Course = courseTestData; //later replaced dby a fetch.

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

    // Usage in your component
    const [spinValue, animateSpinValue] = useAnimatedValue(0);

    useEffect(() => {
        const spinAnimation = animateSpinValue(
            1,
            2500,
        ) as unknown as Animated.CompositeAnimation;
        return () => spinAnimation.stop();
    }, [animateSpinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <PageView>
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <FontAwesome5Icon
                        name="react"
                        style={styles.icon}
                        size={200}
                        color={colors.text}
                    />
                </Animated.View>

                <TextTranslated
                    style={styles.courseTitle}
                    text="Course finished!"
                />
                <TextTranslated
                    style={styles.courseSubTitle}
                    text={course.title}
                />

                <Button
                    buttonText="Go back to courses"
                    screenName={Routes.Courses}
                    colorGradientScheme={stateColorSchemes.success}
                    testId="go-back-to-courses-button"
                />
            </View>
            <ConfettiCannon
                count={40}
                origin={{ x: -10, y: 50 }}
                explosionSpeed={500}
                fallSpeed={2000}
                fadeOut
            />
        </PageView>
    );
}
