/* eslint-disable indent */
import React, { useState } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Image,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import { Bar } from 'react-native-progress';

import {
    position,
    keywords,
    aiFamiliarity,
} from '../../components/Bgcollect/DataList';
import { Button } from '../../components/general/buttons/Button';
import { ListButton } from '../../components/general/buttons/ListButton';
import { PageView } from '../../components/general/views/PageView';
import {
    shadow,
    useColorConfig,
    useCurrentTheme,
} from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import {
    setPosition,
    setInterestedKeyword,
    setHowMuchFamiliar,
    setIsFirstTimeUser,
} from '../../redux/slices/BgCollectSlice';
import { Router } from '../../routes';

const FirstCollect = () => {
    const storeDispatch = useAppDispatch();

    const isFirstTimeUser = useAppSelector(
        (state) => state.bgCollect,
    ).isFirstTimeUser;

    const [showBackgroundInput, setShowBackgroundInput] =
        useState<boolean>(false);

    const handleBackgroundInput = () => {
        setShowBackgroundInput(true);
    };

    const handleToggleFirstTimeUser = () => {
        storeDispatch(setIsFirstTimeUser(!isFirstTimeUser));
    };

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const questions = [
        'What is your position?',
        'What is your interested keyword?',
        'How much do you familiar for AI?',
    ];

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handleValueSelection = (value: string) => {
        if (currentQuestion === 0) {
            storeDispatch(setPosition(String(value)));
        } else if (currentQuestion === 1) {
            storeDispatch(setInterestedKeyword(String(value)));
        } else if (currentQuestion === 2) {
            storeDispatch(setHowMuchFamiliar(String(value)));
        }

        if (currentQuestion < questions.length - 1) {
            handleNextQuestion();
        } else {
            storeDispatch(setIsFirstTimeUser(false));
            setCurrentQuestion(questions.length);
        }
    };
    const totalQuestions = questions.length;
    const progress = currentQuestion / totalQuestions;

    const theme = useCurrentTheme();
    const colors = useColorConfig();
    const fonts = useFonts();
    const windowDimensions = useWindowDimensions();
    const batwidth = windowDimensions.width * 0.8;
    const buttonwidth = windowDimensions.width * 0.2;

    const styles = StyleSheet.create({
        welcomeContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        title: {
            ...fonts.h1,
            color: colors.text,
            fontWeight: 'bold',
        },
        modalText: {
            ...fonts.h3,
            color: colors.text,
        },
        centerImage: {
            width: windowDimensions.width * 0.6,
            height: windowDimensions.height * 0.3,
            resizeMode: 'contain',
            ...shadow,
        },
        container: {
            backgroundColor: colors.background,
            maxHeight: windowDimensions.height * 0.3,
            maxWidth: windowDimensions.width * 0.8,
            marginTop: windowDimensions.height * 0.05,
        },
        progressBar: {
            ...shadow,
            marginTop: windowDimensions.height * 0.05,
        },
    });

    if (!isFirstTimeUser) {
        if (!showBackgroundInput) {
            return (
                <PageView title="">
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.title}>Welcome to WingAI!</Text>
                        <Image
                            testID="winglogo"
                            source={
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                theme === 'light'
                                    ? require('../../assets/images/Icon/wing_yellow.png')
                                    : require('../../assets/images/Icon/wing_blue.png')
                            }
                            style={styles.centerImage}
                        />
                        <Text style={styles.modalText}>
                            Tell me your background!
                        </Text>
                        <Text style={styles.modalText}>
                            We provide you with customized training.
                        </Text>
                        <View>
                            <Button
                                width={buttonwidth}
                                buttonText="Okay"
                                onPress={handleBackgroundInput}
                                colorGradientScheme={[
                                    colors.bg1,
                                    colors.bg2,
                                    colors.bg3,
                                ]}
                                textColorScheme={colors.text}
                                icon="check-circle"
                            />
                            <Button
                                width={buttonwidth}
                                testId="FirstCollect-skip-button"
                                buttonText="Skip"
                                onPress={handleToggleFirstTimeUser}
                                colorGradientScheme={[
                                    colors.bg1,
                                    colors.bg2,
                                    colors.bg3,
                                ]}
                                textColorScheme={colors.text}
                                icon="forward"
                            />
                        </View>
                    </View>
                </PageView>
            );
        } else if (currentQuestion < questions.length) {
            return (
                <PageView title="">
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.title}>Background Collect!!</Text>
                        <Image
                            testID="winglogo"
                            source={
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                theme === 'light'
                                    ? require('../../assets/images/Icon/wing_yellow.png')
                                    : require('../../assets/images/Icon/wing_blue.png')
                            }
                            style={styles.centerImage}
                        />
                        <Text style={styles.modalText}>
                            {questions[currentQuestion]}
                        </Text>

                        <ScrollView style={styles.container}>
                            <FlatList
                                data={
                                    currentQuestion === 0
                                        ? position
                                        : currentQuestion === 1
                                        ? keywords
                                        : aiFamiliarity
                                }
                                renderItem={({ item }) => (
                                    <ListButton
                                        onPress={() =>
                                            handleValueSelection(
                                                item.name || item.id,
                                            )
                                        }
                                        buttonText={item.name || item.id}
                                        width={buttonwidth}
                                        testId="listButton"
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </ScrollView>
                        <View style={styles.progressBar}>
                            <Bar
                                width={batwidth}
                                height={7}
                                borderRadius={10}
                                color={colors.bg3}
                                unfilledColor={colors.listItemBg}
                                progress={progress}
                            />
                        </View>
                    </View>
                </PageView>
            );
        } else {
            return (
                <PageView title="">
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.title}>Thank you!</Text>
                        <Image
                            testID="winglogo"
                            source={
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                theme === 'light'
                                    ? require('../../assets/images/Icon/wing_yellow.png')
                                    : require('../../assets/images/Icon/wing_blue.png')
                            }
                            style={styles.centerImage}
                        />
                        <Text style={styles.modalText}>Start the app</Text>
                        <View>
                            <Button
                                buttonText="Start"
                                onPress={handleToggleFirstTimeUser}
                                colorGradientScheme={[
                                    colors.bg1,
                                    colors.bg2,
                                    colors.bg3,
                                ]}
                                textColorScheme={colors.text}
                                icon="check-circle"
                            />
                        </View>
                    </View>
                </PageView>
            );
        }
    } else {
        return <Router />;
    }
};

export default FirstCollect;
