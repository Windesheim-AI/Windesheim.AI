import React, { useEffect, useState, useRef } from 'react';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { Animated, Text, StyleSheet, Dimensions, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ColorGradientScheme, useColorConfig } from '../../constants/Colors';

export type StatusAlertProps = {
    type: string;
    screenName?: string;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    height?: number;
    icon?: string;
    isVisible: boolean;
};

export const StatusAlert = ({
    type,
    message,
    colorGradientScheme,
    width,
    height,
    icon,
    isVisible,
}: StatusAlertProps) => {
    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium,
    });

    const colors = useColorConfig();

    //const slideAnim = useRef(new Animated.Value(0)).current; // Animation for sliding in
    //const expandAnim = useRef(new Animated.Value(0)).current; // Animation for expanding
    //const fadeAnim = useRef(new Animated.Value(0)).current; // Animation for fading in/out
    const slideAnim = useRef(new Animated.Value(-100)).current; // Initialize off-screen

    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 0, // Slide in (0 = fully visible)
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -100, // Slide out (-100 = off-screen)
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    if (!fontsLoaded || fontError) {
        return null;
    }

    const defaultWidth = Dimensions.get('window').width;
    const alertWidth = width ? width : defaultWidth * 0.9;
    const defaultHeight = 60;
    const alertHeight = height ? height : defaultHeight;
    const barWidth = alertWidth * 0.03;
    const barHeight = alertHeight * 1.4;
    
    const styles = StyleSheet.create({
        bg1: {
            backgroundColor: colorGradientScheme[0],
            height: barHeight,
            left: '-1.5%',
            position: 'absolute',
            transform: [{ rotate: '15deg' }],
            width: barWidth * 2,
        },
        bg2: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            position: 'absolute',
            left: '1%',
            transform: [{ rotate: '15deg' }],
            width: barWidth,
        },
        bg3: {
            backgroundColor: colorGradientScheme[2],
            height: barHeight,
            position: 'absolute',
            left: '3%',
            transform: [{ rotate: '15deg' }],
            width: (barWidth / 1) * 0.85,
        },
        bg4: {
            backgroundColor: colorGradientScheme[0],
            height: barHeight,
            position: 'absolute',
            right: '-1.5%',
            transform: [{ rotate: '15deg' }],
            width: barWidth * 2,
        },
        bg5: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            position: 'absolute',
            right: '1%',
            transform: [{ rotate: '15deg' }],
            width: barWidth,
        },
        bg6: {
            backgroundColor: colorGradientScheme[2],
            height: barHeight,
            position: 'absolute',
            right: '3%',
            transform: [{ rotate: '15deg' }],
            width: (barWidth / 1) * 0.85,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999, // Ensure it's displayed on top of other content
            transform: [{ translateY: slideAnim }],
        },
        alert: {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#f2f2f2',
            //transform: [{ translateY: slideAnim }], // Apply translateY based on slideAnim value,
            borderRadius: 15,
            flexDirection: 'row',
            height: alertHeight,
            margin: 10,
            width: alertWidth,
            overflow: 'hidden',
        },
        textContainer: {
            position: 'absolute',
            flex: 1,
            alignContent: 'center',
            alignSelf: 'center',
            //backgroundColor: 'blue',
            paddingRight: alertWidth * 0.03,
            paddingLeft: alertWidth * 0.03,
            left: 50,
        },
        text: {
            color: colors.text,
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            fontWeight: 'bold',
        },
        iconContainer: {
            position: 'absolute',
            flex: 1,
            alignContent: 'center',
            left: 10,
            top: 10
        },
        icon: {
            color: colors.text,
            fontSize: 18,
            fontWeight: 'bold',
        }, 
    });

    return (
        <Animated.View style={styles.overlay}>
        <View style={styles.alert}>

            <View style={styles.bg1} />
            <View style={styles.bg2} />
            <View style={styles.bg3} />
            <View style={styles.bg4} />
            <View style={styles.bg5} />
            <View style={styles.bg6} />

            <View style={styles.iconContainer}>
                {icon ? <FontAwesome5 name={icon} style={styles.icon} /> : null}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {message}
                </Text>
            </View>

        </View>
        </Animated.View>
    );
};
