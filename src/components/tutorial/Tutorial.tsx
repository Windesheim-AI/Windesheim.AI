/* eslint-disable react/jsx-max-depth */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { tutorialData } from '../../constants/TutorialData';
import { useAppSelector, useAppDispatch } from '../../redux/Hooks';
import { nextStep, setCompleted } from '../../redux/slices/TutorialSlice';
import { TextTranslated } from '../text/TextTranslated';

export const Tutorial = () => {
    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();
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
        const nextStepRoute = tutorialData[tutorialStep]?.NextPage;
        if (nextStepRoute) {
            navigation.navigate(nextStepRoute as never);
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
        },
        modalText: {
            color: colors.text,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
        },
        subText: {
            color: colors.text,
            fontSize: 14,
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
        },
        skipButton: {
            backgroundColor: colors.warning,
        },
        nextButton: {
            backgroundColor: colors.primary,
        },
        finishButton: {
            backgroundColor: colors.danger,
        },
        buttonText: {
            color: colors.textLight,
            fontSize: 16,
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
                        <Text style={styles.modalText}>
                            <TextTranslated
                                text={tutorialData[tutorialStep].Title}
                            />
                        </Text>
                        <Text style={styles.subText}>
                            <TextTranslated
                                text={tutorialData[tutorialStep].Subtext}
                            />
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                testID="tutorial-skip-button"
                                style={[styles.button, styles.skipButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                    storeDispatcher(setCompleted(true));
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    <TextTranslated text="Skip" />
                                </Text>
                            </Pressable>
                            {tutorialStep === tutorialData.length - 1 ? (
                                <Pressable
                                    testID="tutorial-finish-button"
                                    style={[styles.button, styles.finishButton]}
                                    onPress={() => {
                                        // Handle logic for finishing the tutorial
                                        setModalVisible(false);
                                        storeDispatcher(setCompleted(true));
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        <TextTranslated text="Finish" />
                                    </Text>
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
                                        <TextTranslated text="Next" />
                                        {' - '}
                                        {tutorialStep + 1}/{tutorialData.length}
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
