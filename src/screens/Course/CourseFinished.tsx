import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { DataWrapper } from '../../components/general/base/DataWrapper';
import { Button } from '../../components/general/buttons/Button';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import { useColorConfig, useColorStateConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import useSingleCourse from '../../lib/repositories/courses/useSingleCourse';
import { useAnimatedValue } from '../../lib/utility/animate';
import { useAppSelector } from '../../redux/Hooks';
import { Routes } from '../../routes/routes';

type CourseFinishedRouteParams = {
    courseId: string | undefined;
};

export default function CourseFinished() {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const route = useRoute();
    const fonts = useFonts();

    const params = route.params as CourseFinishedRouteParams;
    const { data, error, isLoading } = useSingleCourse(params.courseId); //later replaced dby a fetch.
    const course = data;

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
    const [spinValue, _] = useAnimatedValue(0);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animationState = useAppSelector((state) => state.animation);
    // Call startAnimation when the component mounts
    useEffect(() => {
        if (!animationState.isEnabled) {
            return;
        }

        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2500,
                useNativeDriver: true,
            }),
        ).start();
    }, [animationState.isEnabled, spinValue]);

    return (
        <DataWrapper error={error} isLoading={isLoading}>
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
                        text={course?.title}
                    />

                    <Button
                        buttonText="Go back to courses"
                        screenName={Routes.Courses}
                        colorGradientScheme={colorStateConfig.colors.success}
                        textColorScheme={colorStateConfig.text?.success}
                        testId="go-back-to-courses-button"
                    />
                </View>
                {animationState.isEnabled ? (
                    <ConfettiCannon
                        count={40}
                        origin={{ x: -10, y: 50 }}
                        explosionSpeed={500}
                        fallSpeed={2000}
                        fadeOut
                    />
                ) : null}
            </PageView>
        </DataWrapper>
    );
}
