import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { tutorialData } from '../../constants/TutorialData';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/Hooks';
import { nextStep, setCompleted } from '../../redux/slices/TutorialSlice';

export const Tutorial = () => {
    const layoutState = useAppSelector((state: RootState) => state.layout);
    const loadingState = useAppSelector((state: RootState) => state.loading);

    const [modalVisible, setModalVisible] = useState(false);
    const colors = useColorConfig();
    const navigation = useNavigation();
    const tutorialStep = useAppSelector(
        (state: RootState) => state.tutorial.currentStep,
    );
    const tutorialCompleted = useAppSelector(
        (state: RootState) => state.tutorial.tutorialCompleted,
    );
    const dispatch = useAppDispatch();

    // Check if the splash screen is still visible
    useEffect(() => {
        if (
            !layoutState.isSplashVisible &&
            !tutorialCompleted &&
            !loadingState.isLoading
        ) {
            // If the splash screen is not visible, show the modal
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }, [
        layoutState.isSplashVisible,
        tutorialCompleted,
        loadingState.isLoading,
    ]);

    const handleNext = () => {
        dispatch(nextStep());
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
        // eslint-disable-next-line react-native/no-color-literals
        modalBackground: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
            color: colors.text,
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
                            {tutorialData[tutorialStep].Title}
                        </Text>
                        <Text style={styles.subText}>
                            {tutorialData[tutorialStep].Subtext}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                testID="tutorial-skip-button"
                                style={[styles.button, styles.skipButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                    dispatch(setCompleted(true));
                                }}
                            >
                                <Text style={styles.buttonText}>Skip</Text>
                            </Pressable>
                            {tutorialStep === tutorialData.length - 1 ? (
                                <Pressable
                                    testID="tutorial-finish-button"
                                    style={[styles.button, styles.finishButton]}
                                    onPress={() => {
                                        // Handle logic for finishing the tutorial
                                        setModalVisible(false);
                                        dispatch(setCompleted(true));
                                    }}
                                >
                                    <Text style={styles.buttonText}>
                                        Finish
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
                                        Next {tutorialStep + 1} /{' '}
                                        {tutorialData.length}
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
