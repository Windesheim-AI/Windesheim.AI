import React, { useEffect, useRef } from 'react';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { useDispatch } from 'react-redux';
import { NotificationActions } from '../../redux/slices/NotificatieSlice';
import { Animated, Text, StyleSheet, Dimensions, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ColorGradientScheme, useColorConfig } from '../../constants/Colors';


export type NotificationType = {
    id: number;
    screenName?: string;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    height?: number;
    icon?: string;
};

export const Notification = ({
    id,
    message,
    colorGradientScheme,
    width,
    height,
    icon,
}: NotificationType) => {
    const [fontsLoaded, fontError] = useFonts({
        Inter_500Medium,
    });

    const dispatch = useDispatch();
    const colors = useColorConfig();

    const slideAnim = useRef(new Animated.Value(-80)).current; // Initialize off-screen
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1
    const heightAnim = useRef(new Animated.Value(50)).current; // Initial value for height: 50

    useEffect(() => {
        const timer = setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(heightAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }),
          ]).start(() => {
            dispatch(NotificationActions.removeNotification(id));
          });
        }, 3000);
    
        return () => clearTimeout(timer); // this will clear the timeout if the component is unmounted before the timeout finishes
      }, [dispatch, id]);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0, // Slide in (0 = fully visible)
            duration: 500,
            useNativeDriver: true,
        }).start();
    });

    if (!fontsLoaded || fontError) {
        return null;
    }

    const defaultWidth = Dimensions.get('window').width;
    const alertWidth = width ? width : defaultWidth * 0.97;
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
        alert: {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#f2f2f2',
            borderRadius: 15,
            flexDirection: 'row',
            height: alertHeight,
            margin: 10,
            width: alertWidth,
            overflow: 'hidden',
            transform: [{ translateY: slideAnim }]
        },
        textContainer: {
            position: 'absolute',
            flex: 1,
            alignContent: 'center',
            alignSelf: 'center',
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
        
        <Animated.View style={[styles.alert, {opacity: fadeAnim, height: heightAnim}]}>

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

        </Animated.View>
        
        )
};
