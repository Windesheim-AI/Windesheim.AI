import React, { useEffect, useState } from 'react';
import { View, Image, Text, Modal, StyleSheet } from 'react-native';
import { useAppSelector } from '../lib/redux/Hooks';
import { SettingsButton } from '../components/general/buttons/SettingButton';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { Introduction } from '../components/general/card/Introduction';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';
import { RootState } from '../lib/redux/Hooks';

export const HomeScreen = () => {
    const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
    const tutorialCompleted = useAppSelector(
        (state: RootState) => state.tutorial.tutorialCompleted,
    );

    useEffect(() => {
        if (tutorialCompleted) {
            if (!localStorage.getItem('disclaimerShown')) {
                setIsDisclaimerVisible(true);
                localStorage.setItem('disclaimerShown', 'true');
            }
        } else {
            setIsDisclaimerVisible(false);
        }
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(10px)', // This line adds the blur effect
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
