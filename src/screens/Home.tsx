import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { Introduction } from '../components/general/card/Introduction';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { useAppSelector, RootState } from '../lib/redux/Hooks';

export const HomeScreen = () => {
    const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
    const tutorialCompleted = useAppSelector(
        (state: RootState) => state.tutorial.tutorialCompleted,
    );

    useEffect(() => {
        const checkDisclaimerShown = async () => {
            if (tutorialCompleted) {
                const disclaimerShown =
                    await AsyncStorage.getItem('disclaimerShown');
                if (!disclaimerShown) {
                    setIsDisclaimerVisible(true);
                    await AsyncStorage.setItem('disclaimerShown', 'true');
                }
            }
        };
        void checkDisclaimerShown();
    }, [tutorialCompleted]);

    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingLeft: 10,
            backgroundColor: colors.background,
        },

        logoText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
        },
        flexGrow: {
            flexGrow: 1,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: colors.black,
            opacity: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        alertContainer: {
            padding: 20,
            borderRadius: 10,
        },
    });

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={[styles.logoText, { color: logoTextColor }]}>
                    WINDESHEIM.AI
                </Text>
                <View style={styles.flexGrow} />
            </View>
            <PageScrollView>
                <Introduction />
            </PageScrollView>

            {/* Disclaimer Alert Modal */}
            <Modal
                transparent
                visible={isDisclaimerVisible}
                animationType="fade"
                onRequestClose={() => setIsDisclaimerVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.alertContainer}>
                        <DisclaimerCard
                            onClose={() => setIsDisclaimerVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};
