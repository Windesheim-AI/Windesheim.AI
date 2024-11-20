import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Dimensions,
} from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';
import { useColorConfig } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { Routes } from '../../routes/routes';

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
            'Strategy, Leadership, and Planning',
            'Technology and Processes',
            'Data Management and Ethics',
            'Skills, Workforce, and AI Knowledge',
            'Innovation and Change Management',
            'Risk & Compliance',
        ],
        data: [3, 4, 2, 1, 3, 4],
    };

    const maxValue = 5; // Maximum value for the chart
    const chartSize = 200; // Size of the chart
    const padding = 20; // Padding around the chart
    const center = (chartSize + padding * 2) / 2;
    const radius = chartSize / 2;

    // Calculate the points for the polygon
    const points = chartData.data
        .map((value, index) => {
            const angle = (Math.PI * 2 * index) / chartData.data.length;
            const x = center + radius * (value / maxValue) * Math.sin(angle);
            const y = center - radius * (value / maxValue) * Math.cos(angle);
            return `${x},${y}`;
        })
        .join(' ');

    // Calculate the points for the grid
    const gridPoints = Array.from({ length: maxValue }, (_, i) => {
        const value = i + 1;
        return chartData.data
            .map((_, index) => {
                const angle = (Math.PI * 2 * index) / chartData.data.length;
                const x =
                    center + radius * (value / maxValue) * Math.sin(angle);
                const y =
                    center - radius * (value / maxValue) * Math.cos(angle);
                return `${x},${y}`;
            })
            .join(' ');
    });

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
            ...fonts.default,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.menuIcon}>
                    <Text>Menu</Text>
                </Pressable>
            </View>
            <Text style={styles.title}>Results</Text>
            <Text style={styles.description}>Here are your results</Text>
            <View style={styles.chartContainer}>
                <Svg
                    width={chartSize + padding * 2}
                    height={chartSize + padding * 2}
                >
                    {gridPoints.map((points, index) => (
                        <Polygon
                            key={index}
                            points={points}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                            fill="none"
                        />
                    ))}
                    <Polygon
                        points={points}
                        fill="rgba(0, 128, 255, 0.5)"
                        stroke={colors.primary}
                        strokeWidth="1"
                    />
                    {chartData.labels.map((label, index) => {
                        const angle =
                            (Math.PI * 2 * index) / chartData.data.length;
                        const x =
                            center + (radius + padding / 2) * Math.sin(angle);
                        const y =
                            center - (radius + padding / 2) * Math.cos(angle);
                        return (
                            <SvgText
                                key={index}
                                x={x}
                                y={y}
                                fontSize="10"
                                fill={colors.text}
                                textAnchor="middle"
                            >
                                {label}
                            </SvgText>
                        );
                    })}
                </Svg>
            </View>
            <Pressable style={styles.button} onPress={handleViewDetails}>
                <Text style={styles.buttonText}>View Details</Text>
            </Pressable>
            <Text style={styles.footer}>Footer text</Text>
        </View>
    );
};

export { Results };
