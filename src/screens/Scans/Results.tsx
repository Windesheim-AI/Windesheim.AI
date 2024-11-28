import React from 'react';
import { Translation } from 'react-i18next';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { InteractiveView } from '../../components/general/views/InteractiveView';
import { LoadingScreen } from '../../components/loadingscreen/LoadingScreen';
import {
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { useDataFetcher, fetchJsonData } from '../../lib/fetcher/DataFetcher';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { getEnvValue } from '../../lib/utility/env/env';
import { EnvOptions } from '../../lib/utility/env/env.values';
import { Routes } from '../../routes/routes';

interface ScanResult {
    result_id: number;
    scan_id: string;
    scan_name: string;
    scan_type: string;
    scores: {
        id: string;
        categoryName: string;
        score: string;
    }[];
}

const Results = ({ data }) => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigator = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const {
        data: scanResult,
        error,
        isLoading,
    } = useDataFetcher<ScanResult>(fetchJsonData, {
        url: `${getEnvValue(EnvOptions.WordPressDataURL)}/wp-json/wins/v1/result/1`,
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
        payload: {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    });

    const chartData = React.useMemo(
        () => ({
            labels:
                scanResult?.scores?.map((score) => score.categoryName) ?? [],
            data:
                scanResult?.scores?.map((score) => parseInt(score.score)) ?? [],
        }),
        [scanResult],
    );

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <Text style={fonts.default}>
                Error loading data: {error.message}
            </Text>
        );
    }

    if (!scanResult) {
        return <Text style={fonts.default}>No data available</Text>;
    }

    const maxValue = 5; // Maximum value for the chart
    const chartSize = 200; // Size of the chart
    const padding = 80; // Increased padding for better label visibility
    const labelOffset = 20; // Additional offset for labels
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
        overallScoreContainer: {
            flex: 1,
            backgroundColor: colors.background,
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
            paddingTop: windowHeight * 0.00,
            alignItems: 'center',
        },
        button: {
            backgroundColor: colors.previousButton,
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
            ...colorStateConfig.highContrastBorder,
        },
        header: {
            backgroundColor: '#f8fafc',
            padding: 20,
            textAlign: 'center',
            width: '100%',
            borderRadius: 8,
        },
        headerText: {
            color: 'black',
            fontSize: 24,
            fontWeight: '600',
        },
        content: {
            paddingTop: 10,
        },
        scoreContainer: {
            backgroundColor: '#f8fafc',
            borderRadius: 8,
            marginBottom: 24,
            padding: 32,
            textAlign: 'center',
            alignItems: 'center',
        },
        scoreCircle: {
            backgroundColor: '#ffffff',
            display: 'flex',
            padding: 20,
            borderRadius: 50,
            width: 100,
            height: 100,
            marginBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scoreText: {
            margin: 0,
            fontSize: 15,
            fontWeight: 'bold',
            color: '#2563eb',
            lineHeight: 100,
        },
        scoreLabel: {
            margin: 0,
            color: '#1e293b',
            fontSize: 18,
            fontWeight: 'bold',
        },
        
    });

    return (
        <View style={styles.container}>
            <View style={styles.overallScoreContainer}>
                <View style={styles.header}>
                    <TextTranslated style={styles.headerText} text='Results for Maturity Scan'></TextTranslated>
                </View>
                <View style={styles.content}>
                    <View style={styles.scoreContainer}>
                        <Text style={fonts.default}>Overall Score</Text>
                        <View style={styles.scoreCircle}>
                            <Text style={styles.scoreText}>{Math.round(4.3 * 10) / 10}/5</Text>
                        </View>
                        <Text style={styles.scoreLabel}>Very Good</Text>
                    </View>
                </View>
            </View>



            <View style={styles.chartContainer}>
                <Svg
                    width={chartSize + padding * 2}
                    height={chartSize + padding * 2}
                >
                    {Array.from({ length: maxValue }, (_, i) => {
                        const value = i + 1;
                        return (
                            <SvgText
                                key={`level-${value}`}
                                x={center}
                                y={center - (radius * value) / maxValue}
                                fontSize="10"
                                fill={colors.text}
                                textAnchor="end"
                                alignmentBaseline="middle"
                            >
                                {value}
                            </SvgText>
                        );
                    })}
                    {gridPoints.map((points, index) => (
                        <Polygon
                            key={index}
                            points={points}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                            fill="none"
                        />
                    ))}
                    {chartData.labels.map((label, index) => {
                        const angle =
                            (Math.PI * 2 * index) / chartData.data.length;
                        const x = center + radius * Math.sin(angle);
                        const y = center - radius * Math.cos(angle);
                        return (
                            <Line
                                key={`axis-line-${index}`}
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke={colors.primary}
                                strokeWidth="0.5"
                            />
                        );
                    })}
                    <Polygon
                        points={points}
                        fill="rgba(0, 128, 255, 0.5)"
                        stroke={colors.primary}
                        strokeWidth="1"
                    />
                    {chartData.labels.map((label, index) => {
                        const angle =
                            (Math.PI * 2 * index) / chartData.data.length;
                        const labelRadius = radius + labelOffset;

                        // Calculate base position
                        const x = center + labelRadius * Math.sin(angle);
                        const y = center - labelRadius * Math.cos(angle);

                        // Split label into multiple lines if too long
                        const words = label.split(' ');
                        const lines = [];
                        let currentLine = '';

                        words.forEach((word) => {
                            if (currentLine.length + word.length > 15) {
                                lines.push(currentLine);
                                currentLine = word;
                            } else {
                                currentLine += (currentLine ? ' ' : '') + word;
                            }
                        });
                        lines.push(currentLine);

                        // Calculate vertical offset based on number of lines
                        const totalHeight = lines.length * 12;
                        const startY = y - totalHeight / 2 + 6; // Center the text block

                        return lines.map((line, lineIndex) => (
                            <SvgText
                                key={`${index}-${lineIndex}`}
                                x={x}
                                y={startY + lineIndex * 12}
                                fontSize="10"
                                fill={colors.text}
                                textAnchor={
                                    Math.abs(Math.sin(angle)) < 0.1
                                        ? 'middle'
                                        : Math.sin(angle) > 0
                                          ? 'start'
                                          : 'end'
                                }
                                alignmentBaseline="middle"
                            >
                                {line}
                            </SvgText>
                        ));
                    })}
                </Svg>
            </View>
            <InteractiveView
                style={styles.button}
                onPress={() => navigator.navigate(Routes.Home.toString())}
            >
                <TextTranslated style={fonts.default} text="Back to Homepage" />
            </InteractiveView>
        </View>
    );
};

export { Results };
