import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Dimensions,
} from 'react-native';
import { useColorConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes/routes';

import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';

const Results = () => {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const handleViewDetails = () => {
        HapticFeedback(HapticForces.Light);
        try {
            navigation.navigate(Routes.Scans as never);
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    const chartData = {
        labels: [
            'Strategy',
            'Culture',
            'Organisation',
            'Processes',
            'Technology',
            'Customers & partners',
        ],
        data: [3, 4, 2, 1, 3, 4],
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: windowWidth * 0.05,
            backgroundColor: colors.background,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: windowHeight * 0.03,
        },
        logo: {
            width: windowWidth * 0.12,
            height: windowWidth * 0.12,
            maxWidth: 50,
            maxHeight: 50,
        },
        menuIcon: {
            padding: 10,
        },
        title: {
            ...fonts.h1,
            color: colors.titleDefault,
            marginBottom: windowHeight * 0.02,
        },
        description: {
            ...fonts.default,
            color: colors.descriptionDefault,
            marginBottom: windowHeight * 0.03,
        },
        chartContainer: {
            alignItems: 'center',
            marginBottom: windowHeight * 0.03,
            height: Math.min(windowHeight * 0.4, 400),
        },
        button: {
            backgroundColor: colors.primary,
            paddingVertical: windowHeight * 0.015,
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: windowHeight * 0.03,
        },
        buttonText: {
            ...fonts.button,
            color: colors.buttonText,
        },
        footer: {
            ...fonts.subtext,
            textAlign: 'center',
            color: colors.subtext,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.menuIcon}>
                    <Text style={{ color: colors.text }}>Menu</Text>
                </Pressable>
            </View>
            <Text style={styles.title}>Results</Text>
            <Text style={styles.description}>
                Here are your results, bibabububabadada
            </Text>
        </View>
    );
};

export { Results };
