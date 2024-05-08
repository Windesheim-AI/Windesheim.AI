import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { promptsTutorialSteps } from './PromptsTutorialSteps';
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
} from '../../lib/redux/slices/PromptsTutorialSlice';
import ProgressBar from '../general/base/ProgressBar';
import { StepButton } from '../general/buttons/StepButton';
import { TextTranslated } from '../general/text/TextTranslated';

export const PromptsTutorial = () => {
    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const tutorialStep = useAppSelector(
        (state) => state.promptsTutorial.currentStep,
    );
    const tutorialCompleted = useAppSelector(
        (state) => state.promptsTutorial.tutorialCompleted,
    );

    useEffect(() => {
        setModalVisible(!tutorialCompleted);
    }, [tutorialCompleted]);

    const handleNext = () => {
        storeDispatcher(nextStep());
        const nextStepRoute = promptsTutorialSteps[tutorialStep]?.NextPage;
        HapticFeedback(HapticForces.Light);
        if (nextStepRoute) {
            navigation.navigate(nextStepRoute as never);
        }
    };

    const handlePrevious = () => {
        storeDispatcher(previousStep());
        const previousStepRoute =
            promptsTutorialSteps[tutorialStep]?.PreviousPage;
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
            maxWidth: '100%',
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
                animationType="slide"
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
                            text={promptsTutorialSteps[tutorialStep].Title}
                        />
                        <View style={styles.description}>
                            <TextTranslated
                                style={styles.subText}
                                text={
                                    promptsTutorialSteps[tutorialStep].Subtext
                                }
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
                                if (
                                    tutorialStep <
                                    promptsTutorialSteps.length - 1
                                ) {
                                    handleNext();
                                }
                                if (
                                    tutorialStep ===
                                    promptsTutorialSteps.length - 1
                                ) {
                                    storeDispatcher(setCompleted(true));
                                }
                            }}
                        />
                        <View style={styles.progressBar}>
                            <ProgressBar
                                width={0.9}
                                height={10}
                                progress={
                                    tutorialStep /
                                    (promptsTutorialSteps.length - 1)
                                }
                                testId="myProgressBar"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
