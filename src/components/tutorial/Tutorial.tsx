import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import {
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { tutorialSteps } from '../../lib/constants/TutorialSteps';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppSelector, useAppDispatch } from '../../lib/redux/Hooks';
import {
    nextStep,
    setCompleted,
    previousStep,
} from '../../lib/redux/slices/TutorialSlice';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { TextTranslated } from '../general/text/TextTranslated';

export const Tutorial = () => {
    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const layoutState = useAppSelector((state) => state.layout);
    const loadingState = useAppSelector((state) => state.loading);
    const tutorialStep = useAppSelector((state) => state.tutorial.currentStep);
    const tutorialCompleted = useAppSelector(
        (state) => state.tutorial.tutorialCompleted,
    );

    // Check if the splash screen is still visible
    useEffect(() => {
        // If the splash screen is not visible, show the modal
        setModalVisible(
            !layoutState.isSplashVisible &&
                !tutorialCompleted &&
                !loadingState.isLoading,
        );
    }, [
        layoutState.isSplashVisible,
        tutorialCompleted,
        loadingState.isLoading,
    ]);

    const handleNext = () => {
        storeDispatcher(nextStep());
        const nextStepRoute = tutorialSteps[tutorialStep]?.NextPage;
        HapticFeedback(HapticForces.Light);
        if (nextStepRoute) {
            navigation.navigate(nextStepRoute as never);
        }
    };

    const handlePrevious = () => {
        storeDispatcher(previousStep());
        const previousStepRoute = tutorialSteps[tutorialStep]?.PreviousPage;
        if (previousStepRoute) {
            navigation.navigate(previousStepRoute as never);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalBackground: {
            flex: 1,
            backgroundColor: colors.backgroundModal,
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalContent: {
            backgroundColor: colors.background,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '80%', // Set a maximum width for the modal content
            height: 'auto',
            ...colorStateConfig.highContrastBorder,
        },
        modalText: {
            ...fonts.h1,
            color: colors.text,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
        },
        subText: {
            ...fonts.description,
            color: colors.text,
            marginBottom: 20,
            textAlign: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        button: {
            padding: 10,
            borderRadius: 5,
            width: '48%',
            ...colorStateConfig.highContrastBorder,
        },
        skipButton: {
            backgroundColor: colors.warning,
        },
        nextButton: {
            backgroundColor: colors.primary,
        },
        previousButton: {
            backgroundColor: colors.secondary,
        },
        finishButton: {
            backgroundColor: colors.danger,
        },
        buttonText: {
            ...fonts.button,
            color: colors.textLight,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <TextTranslated
                            style={styles.modalText}
                            text={tutorialSteps[tutorialStep].Title}
                        />
                        <TextTranslated
                            style={styles.subText}
                            text={tutorialSteps[tutorialStep].Subtext}
                        />
                        <View style={styles.buttonContainer}>
                            {tutorialStep === 0 ? (
                                <Pressable
                                    testID="tutorial-skip-button"
                                    style={[styles.button, styles.skipButton]}
                                    onPress={() => {
                                      HapticFeedback(HapticForces.Light);
                                      setModalVisible(false);
                                        storeDispatcher(setCompleted(true));
                                    }}
                                >
                                    <TextTranslated
                                        style={styles.buttonText}
                                        text="Skip"
                                    />
                                </Pressable>
                            ) : (
                                <Pressable
                                    testID="tutorial-previous-button"
                                    style={[
                                        styles.button,
                                        styles.previousButton,
                                    ]}
                                    onPress={() => {
                                        handlePrevious();
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        Previous
                                    </Text>
                                </Pressable>
                            )}
                            {tutorialStep === tutorialSteps.length - 1 ? (
                                <Pressable
                                    testID="tutorial-finish-button"
                                    style={[styles.button, styles.finishButton]}
                                    onPress={() => {
                                        // Handle logic for finishing the tutorial
                                        setModalVisible(false);
                                        storeDispatcher(setCompleted(true));
                                    }}
                                >
                                    <TextTranslated
                                        style={styles.buttonText}
                                        text="Finish"
                                    />
                                </Pressable>
                            ) : (
                                <Pressable
                                    testID="tutorial-next-button"
                                    style={[styles.button, styles.nextButton]}
                                    onPress={() => {
                                        handleNext();
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        <TextTranslated
                                            style={styles.buttonText}
                                            text="Next"
                                        />
                                        {'\n'}
                                        {tutorialStep + 1}
                                        {' / '}
                                        {tutorialSteps.length}
                                    </Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
