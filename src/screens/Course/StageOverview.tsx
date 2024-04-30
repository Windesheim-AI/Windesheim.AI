/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ViewStyle,
    Image,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import arrowLeft from '../../assets/images/Icon/go_back_arrow.png';
import { StageCard } from '../../components/course/card/StageCard';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import LoadingScreen from '../../components/loadingscreen/LoadingScreen';
import {
    useColorConfig,
    useColorStateConfig,
    useCurrentTheme,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useMapSingleCourseToData } from '../../lib/repositories/courses/mapSingleCourseToData';
import useSingleCourse from '../../lib/repositories/courses/useSingleCourse';
import { usePreparedTranslator } from '../../lib/translations/hooks';
import { estimateTime } from '../../lib/utility/estimateTime';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Stage } from '../../types/Stage';
type StageOverviewPageProps = {
    courseId: string;
    stageId: string;
};

export type StageItemProps = {
    stage: Stage;
};

export default function StageOverview() {
    const fonts = useFonts();
    const windowDimensions = useWindowDimensions();
    const t = usePreparedTranslator();
    const stateColors = useColorStateConfig();
    const colors = useColorConfig();
    const route = useRoute();
    const navigator = useNavigation();
    const params = route.params as StageOverviewPageProps;
    const courseId = params.courseId;
    const navigation = useNavigation();

    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigation.goBack();
    };
    const { data, isLoading, error } = useSingleCourse(courseId);
    const course = useMapSingleCourseToData(data);
    const currentTheme = useCurrentTheme();
    const containerHeight = windowDimensions.height * 0.54;
    const buttonStyle: ViewStyle = {
        position: 'absolute',
        top: -5,
        right: 10,
    };
    const iconStyle = {
        width: 37,
        height: 37,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
        backgroundColor: colors.arrowContainer,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
    };
    const styles = StyleSheet.create({
        container: {
            margin: -20,
        },
        courseStageContainer: {
            marginTop: 10,
            height: containerHeight,
        },
        content: {
            margin: 10,
        },
        title: {
            ...fonts.h1,
            fontSize: 34,
            marginBottom: 10,
        },
        courseBackgroundImage: {
            height: 140,
            marginLeft: 10,
            marginRight: 10,
        },
        courseCardContainer: {
            margin: 4,
            marginBottom: 80,
        },
        infoBar: {
            marginTop: 10,
            flexDirection: 'row',
            display: 'none', // ENABLE THIS WHEN THE DATA IS AVAILABLE
        },
        icons: {
            marginLeft: 10,
        },
        stageBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 10,
        },
        timeBar: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
        },
        courseBackgroundContainer: {
            borderTopRadius: 15,
            overflow: 'hidden',
        },
        courseTitle: {
            ...fonts.courseTitle,
            marginRight: 10,
        },
    });

    function navigateBackToCourses() {
        HapticFeedback(HapticForces.Light);
        navigator.navigate(Routes.Quizzes.toString());
    }

    function calculateTotalTime() {
        let totalTime = 0;
        course?.stageData?.forEach((stage) => {
            totalTime += estimateTime(stage.blocks);
        });
        return totalTime;
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <PageView title="An error occurred while loading the data">
                <GoBackButton
                    buttonText="Go back"
                    onPress={() => navigator.goBack()}
                />
            </PageView>
        );
    }

    if (!data || !course?.stageData) {
        return (
            <PageView>
                <View style={styles.container}>
                    <TextTranslated style={fonts.h1} text="Course not found" />
                    <GoBackButton
                        buttonText="Courses"
                        onPress={navigateBackToCourses}
                    />
                </View>
            </PageView>
        );
    }

    return (
        <PageView>
            <View style={styles.container}>
                <View style={styles.courseBackgroundContainer}>
                    <ImageBackground
                        source={require('../../assets/images/bgImages/generative-intelligence-01-1.png')}
                        style={styles.courseBackgroundImage}
                    />
                </View>
                <TouchableOpacity onPress={goBack} style={buttonStyle}>
                    <Image source={arrowLeft} style={iconStyle} />
                </TouchableOpacity>
                <View style={styles.content}>
                    <TextTranslated style={styles.title} text={course?.title} />
                    <View style={styles.infoBar}>
                        <FontAwesome5Icon
                            name="star"
                            size={20}
                            color={stateColors.colors.secondary[1]}
                        />
                        <TextTranslated
                            style={[fonts.level, styles.icons]}
                            text="Level 1"
                        />
                        <FontAwesome5Icon
                            name="heart"
                            size={20}
                            style={styles.icons}
                            color={stateColors.colors.danger[1]}
                        />
                        <TextTranslated
                            style={[fonts.level, styles.icons]}
                            text="Popularity: 1"
                        />
                    </View>

                    <TextTranslated
                        style={fonts.description}
                        text={course?.description}
                    />

                    <View style={styles.stageBar}>
                        <TextTranslated
                            style={fonts.courseTitle}
                            text={`${course?.stageData?.length} ${t('Stages')}`}
                        />
                        <View style={styles.timeBar}>
                            <FontAwesome5Icon
                                name="clock"
                                size={20}
                                color={colors.titleDefault}
                            />
                            <TextTranslated
                                style={[fonts.courseTitle, styles.courseTitle]}
                                text={` ${calculateTotalTime()} min`}
                            />
                        </View>
                    </View>

                    {/* map the stages of the course */}
                    <View style={styles.courseStageContainer}>
                        <ScrollView>
                            <View style={styles.courseCardContainer}>
                                {course?.stageData?.map((stage, count) => {
                                    return (
                                        <StageCard
                                            key={stage.id}
                                            stageTitle={stage.title}
                                            stageIndex={count}
                                            stageDescription={stage.blocks}
                                            courseId={course.courseId}
                                            stageId={stage.id}
                                            isCompleted={
                                                stage.isCompletedByUser
                                            }
                                        />
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </PageView>
    );
}
