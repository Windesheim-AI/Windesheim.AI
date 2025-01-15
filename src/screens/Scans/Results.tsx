/* eslint-disable no-void */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-color-literals */

import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import Svg, {
    Polygon,
    Line,
    Text as SvgText,
    TextAnchor,
} from 'react-native-svg';

import { TextTranslated } from '../../components/general/text/TextTranslated';
import { InteractiveView } from '../../components/general/views/InteractiveView';
import { LoadingScreen } from '../../components/loadingscreen/LoadingScreen';
import {
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import {
    persistentStorageRead,
    persistentStorageRemove,
} from '../../lib/utility/persistentStorage';
import { postScan, ScanResult } from '../../lib/utility/postScan';
import { Routes } from '../../routes/routes';

type CategoryAnswers = {
    categoryId: number;
    answers: number[];
};

interface FormData {
    name: string;
    phoneNumber: string;
    email: string;
    showAdditionalFields: boolean;
    company: string;
    companySize: string;
    location: string;
}

const Results = () => {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigator = useNavigation();
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [scanResult, setScanResult] = React.useState<ScanResult | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = await new Promise<FormData>(
                    (resolve, reject) => {
                        void persistentStorageRead('formData', (value) => {
                            // eslint-disable-next-line no-else/no-else
                            if (value) resolve(JSON.parse(value) as FormData);
                            else reject(new Error('No form data found'));
                        });
                    },
                );

                const answersData = await new Promise<CategoryAnswers[]>(
                    (resolve, reject) => {
                        void persistentStorageRead('answers', (value) => {
                            // eslint-disable-next-line no-else/no-else, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                            if (value) resolve(JSON.parse(value).categories);
                            else reject(new Error('No answers data found'));
                        });
                    },
                );

                const selectedCategories = await new Promise<number[]>(
                    (resolve, reject) => {
                        void persistentStorageRead(
                            'selectedCategories',
                            (value) => {
                                // eslint-disable-next-line no-else/no-else
                                if (value)
                                    resolve(JSON.parse(value) as number[]);
                                else
                                    reject(
                                        new Error(
                                            'No selected categories found',
                                        ),
                                    );
                            },
                        );
                    },
                );

                const scanId = await new Promise<number>((resolve, reject) => {
                    void persistentStorageRead('scanId', (value) => {
                        // eslint-disable-next-line no-else/no-else
                        if (value) resolve(JSON.parse(value) as number);
                        else reject(new Error('No scan ID found'));
                    });
                });

                const data = {
                    scanId,
                    mailTo: formData.email,
                    companyDetails: {
                        size: parseInt(formData.companySize, 10),
                        location: formData.location,
                    },
                    weightedCategoryIds: selectedCategories,
                    categories: answersData,
                };

                const result = await postScan(data);
                setScanResult(result);

                // Clear relevant persistent storages
                void persistentStorageRemove('formData');
                void persistentStorageRemove('answers');
                void persistentStorageRemove('selectedCategories');
                void persistentStorageRemove('scanId');
            } catch (err) {
                // Coming here means that stuff is missing.
                // This means that the user has not completed the scan.
                // Clear any traces of the scan and redirect to the scan page.
                void persistentStorageRemove('formData');
                void persistentStorageRemove('answers');
                void persistentStorageRemove('selectedCategories');
                void persistentStorageRemove('scanId');

                navigator.navigate(Routes.Scans.toString());
            } finally {
                setIsLoading(false);
            }
        };

        void fetchData();
    }, [navigator]);

    const chartData = React.useMemo(
        () => ({
            labels:
                scanResult?.scores?.map((score) => score.categoryName) ?? [],
            data:
                scanResult?.scores?.map((score) => parseInt(score.score, 10)) ??
                [],
        }),
        [scanResult],
    );

    if (isLoading) return <LoadingScreen />;

    if (!scanResult)
        return <Text style={fonts.default}>No data available</Text>;

    const result =
        scanResult.scores.reduce(
            (acc, score) => acc + parseInt(score.score, 10),
            0,
        ) / scanResult.scores.length;

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
        chartContainer: {
            paddingTop: windowHeight * 0.0,
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
            color: colors.black,
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
            backgroundColor: colors.white,
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
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2563eb',
            lineHeight: 60,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.overallScoreContainer}>
                <View style={styles.header}>
                    <TextTranslated
                        style={styles.headerText}
                        text="Results for Maturity Scan"
                    />
                </View>
                <View style={styles.content}>
                    <View style={styles.scoreContainer}>
                        <Text style={fonts.default}>Overall Score</Text>
                        <View style={styles.scoreCircle}>
                            <Text style={styles.scoreText}>
                                {/* Round the result to 1 decimal */}
                                {Math.round(result * 10) / 10}/5
                            </Text>
                        </View>
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
                                return;
                            }

                            currentLine += (currentLine ? ' ' : '') + word;
                        });
                        lines.push(currentLine);

                        // Calculate vertical offset based on number of lines
                        const totalHeight = lines.length * 12;
                        const startY = y - totalHeight / 2 + 6; // Center the text block

                        let textAnchor: TextAnchor = 'middle';
                        if (Math.abs(Math.sin(angle)) >= 0.1) {
                            textAnchor = Math.sin(angle) > 0 ? 'start' : 'end';
                        }

                        return lines.map((line, lineIndex) => (
                            <SvgText
                                key={`${index}-${lineIndex}`}
                                x={x}
                                y={startY + lineIndex * 12}
                                fontSize="10"
                                fill={colors.text}
                                textAnchor={textAnchor}
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
