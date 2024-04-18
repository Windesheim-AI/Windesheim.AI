import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
    Animated,
    Text,
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';

import {
    ColorGradientScheme,
    shadow,
    useColorConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { useAppDispatch } from '../../../lib/redux/Hooks';
import { NotificationActions } from '../../../lib/redux/slices/NotificationSlice';
import { useAnimatedValue } from '../../../lib/utility/animate';

export type NotificationType = {
    id: number;
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
    const dispatch = useAppDispatch();
    const windowDimensions = useWindowDimensions();
    const colors = useColorConfig();
    const fonts = useFonts();

    const [slideAnim, _] = useAnimatedValue(-80);
    let slideAnimValue = -80;
    slideAnim.addListener(({ value }) => {
        slideAnimValue = value;
    });

    const [fadeAnim, animateFade] = useAnimatedValue(1);
    const [scaleYAnim, animateScaleY] = useAnimatedValue(1);
    let scaleYAnimValue = 1;
    scaleYAnim.addListener(({ value }) => {
        scaleYAnimValue = value;
    });

    const [translateYAnim, animateTranslateY] = useAnimatedValue(-50);
    let translateYAnimValue = -50;
    translateYAnim.addListener(({ value }) => {
        translateYAnimValue = value;
    });

    useEffect(() => {
        Animated.parallel([
            animateFade(1, 500),
            animateTranslateY(0, 500),
        ]).start();

        const timer = setTimeout(() => {
            Animated.parallel([
                animateFade(0, 500),
                animateScaleY(0, 500),
            ]).start(() => {
                dispatch(NotificationActions.removeNotification(id));
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch, animateFade, animateScaleY, animateTranslateY, id]);

    const defaultWidth = windowDimensions.width;
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
            transform: 'rotate(15deg)',
            width: barWidth * 2,
        },
        bg2: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            position: 'absolute',
            left: '1%',
            transform: 'rotate(15deg)',
            width: barWidth,
        },
        bg3: {
            backgroundColor: colorGradientScheme[2],
            height: barHeight,
            position: 'absolute',
            left: '3%',
            transform: 'rotate(15deg)',
            width: barWidth * 0.85,
        },
        bg4: {
            backgroundColor: colorGradientScheme[0],
            height: barHeight,
            position: 'absolute',
            right: '-1.5%',
            transform: 'rotate(15deg)',
            width: barWidth * 2,
        },
        bg5: {
            backgroundColor: colorGradientScheme[1],
            height: barHeight,
            position: 'absolute',
            right: '1%',
            transform: 'rotate(15deg)',
            width: barWidth,
        },
        bg6: {
            backgroundColor: colorGradientScheme[2],
            height: barHeight,
            position: 'absolute',
            right: '3%',
            transform: 'rotate(15deg)',
            width: barWidth * 0.85,
        },
        alert: {
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: colors.listItemBg,
            borderRadius: 15,
            flexDirection: 'row',
            height: alertHeight,
            margin: 10,
            width: alertWidth,
            overflow: 'hidden',
            transform: `translateY(${slideAnimValue})`,
            ...shadow,
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
        iconContainer: {
            position: 'absolute',
            flex: 1,
            alignContent: 'center',
            left: 10,
            top: 10,
        },
        icon: {
            ...fonts.icon,
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    return (
        //Two view containers are needed to make the animation work (on phone).
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: `translateY(${translateYAnimValue})`,
            }}
        >
            <Animated.View
                style={[
                    styles.alert,
                    {
                        opacity: fadeAnim,
                        transform: `scaleY(${scaleYAnimValue})`,
                    },
                ]}
            >
                <View style={styles.bg1} />
                <View style={styles.bg2} />
                <View style={styles.bg3} />
                <View style={styles.bg4} />
                <View style={styles.bg5} />
                <View style={styles.bg6} />

                <View style={styles.iconContainer}>
                    {icon ? (
                        <FontAwesome5 name={icon} style={styles.icon} />
                    ) : null}
                </View>
                <View style={styles.textContainer}>
                    <Text style={fonts.alert}>{message}</Text>
                </View>
            </Animated.View>
        </Animated.View>
    );
};
