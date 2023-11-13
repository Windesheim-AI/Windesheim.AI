import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as courseTestData from '../../assets/courses/test.json';
import { Button } from '../../components/buttons/Button';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { buttonColorSchemes, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Course } from '../../types/Course';

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

    const spinValue = useRef(new Animated.Value(0)).current;

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }),
    ).start();

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
