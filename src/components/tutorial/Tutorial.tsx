import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { tutorialSteps } from './TutorialSteps';
import {
    uppershadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppSelector, useAppDispatch } from '../../lib/redux/Hooks';
import {
    nextStep,
    setCompleted,
    previousStep,
} from '../../lib/redux/slices/TutorialSlice';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import ProgressBar from '../general/base/ProgressBar';
import { StepButton } from '../general/buttons/StepButton';
import { TextTranslated } from '../general/text/TextTranslated';

export const Tutorial = () => {
    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const layoutState = useAppSelector((state) => state.layout);
    const animationState = useAppSelector((state) => state.animation);
    const loadingState = useAppSelector((state) => state.loading);
    const tutorialStep = useAppSelector((state) => state.tutorial.currentStep);
    const tutorialCompleted = useAppSelector(
        (state) => state.tutorial.tutorialCompleted,
    );

    useEffect(() => {
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
        HapticFeedback(HapticForces.Light);
        if (previousStepRoute) {
            navigation.navigate(previousStepRoute as never);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        modalContent: {
            backgroundColor: colors.background,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%', // Set a maximum width for the modal content
            height: 'auto',
            ...colorStateConfig.highContrastBorder,
            ...uppershadow,
        },
        description: {
            flexDirection: 'row',
        },
        modalText: {
            ...fonts.h1,
            color: colors.text,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        subText: {
            ...fonts.button,
            color: colors.text,
            marginBottom: 20,
            marginLeft: 10,
            textAlign: 'center',
        },
        progressBar: {
            margin: 20,
            ...colorStateConfig.highContrastBorder,
        },
    });

    return (
        <View style={styles.container}>
            <Modal
                animationType={animationState.isEnabled ? 'slide' : 'none'}
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                {/* Description Box*/}
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <TextTranslated
                            style={styles.modalText}
                            text={tutorialSteps[tutorialStep].Title}
                        />
                        <View style={styles.description}>
                            <TextTranslated
                                style={styles.subText}
                                text={tutorialSteps[tutorialStep].Subtext}
                            />
                        </View>

                        <StepButton
                            onPreviousPress={() => {
                                if (tutorialStep > 0) {
                                    handlePrevious();
                                }
                            }}
                            onSkipPress={() => {
                                HapticFeedback(HapticForces.Light);
                                storeDispatcher(setCompleted(true));
                            }}
                            onNextPress={() => {
                                if (tutorialStep < tutorialSteps.length - 1) {
                                    handleNext();
                                    return;
                                }
                                // Handle logic for finishing the tutorial
                                storeDispatcher(setCompleted(true));
                            }}
                        />
                        {/* progressBar */}
                        <View style={styles.progressBar}>
                            <ProgressBar
                                width={0.9}
                                height={10}
                                progress={tutorialStep * 0.2}
                                testId="myProgressBar"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
