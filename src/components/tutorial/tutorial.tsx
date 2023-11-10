import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/Hooks';
import { nextStep } from '../../redux/slices/TutorialSlice';
import { Routes } from '../../routes/routes';

export const Tutorial = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const colors = useColorConfig();
    const navigation = useNavigation();
    const tutorialStep = useAppSelector(
        (state: RootState) => state.tutorial.currentStep,
    );
    const dispatch = useAppDispatch();
    const tutorialSteps = [
        {
            Title: '',
            Subtext: `Welcome to the WingAI app! This tutorial will
            explain all of the features in the app and where you
            can find certain elements. You can also skip this
            tutorial if you don't find it necessary.`,
            NextPage: Routes.Settings,
        },
        {
            Title: 'Example Title',
            Subtext: 'This is step 2',
            NextPage: '',
        },
        {
            Title: 'Example Title',
            Subtext: 'This is step 3',
            NextPage: '',
        },
    ];

    const handleNext = () => {
        dispatch(nextStep());
        const nextStepRoute = tutorialSteps[tutorialStep]?.NextPage;
        if (nextStepRoute) {
            setModalVisible(false);
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        },
        modalText: {
            color: colors.text,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        subText: {
            color: colors.text,
            fontSize: 14,
            marginBottom: 20,
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
                            App Guided Tutorial
                        </Text>
                        <Text style={styles.subText}>
                            {tutorialSteps[tutorialStep].Subtext}
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.skipButton]}
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.buttonText}>Skip</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.nextButton]}
                                onPress={() => {
                                    handleNext();
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    Next {tutorialStep} /
                                    {tutorialSteps.length - 1}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Rest of the app */}
        </View>
    );
};
