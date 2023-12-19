import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../lib/constants/Colors';

type PhoneFrameProps = {
    children: React.ReactNode;
};

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            height: '80%',
            marginVertical: '5%',
            alignItems: 'center',
        },
        phone: {
            position: 'relative',
            height: '100%',
            borderColor: colors.phoneframe,
        },
        notchContainer: {
            position: 'absolute',
            left: '35%',
            right: '35%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30%',
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.black,
            zIndex: 1,
        },
        cameraCircle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.phoneframe,
            position: 'absolute',
            top: 18,
            left: '75%',
        },
        notch: {
            width: '20%',
            height: '4.25%',
            marginHorizontal: 'auto',
            backgroundColor: colors.black,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        phoneImage: {
            flex: 1,
            borderWidth: 18,
            borderColor: colors.black,
            borderRadius: 30,
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.phone}>
                <View style={styles.notchContainer}>
                    <View style={styles.cameraCircle} />
                    <View style={styles.notch} />
                </View>
                <View style={styles.phoneImage}>{children}</View>
            </View>
        </View>
    );
};

export default PhoneFrame;
