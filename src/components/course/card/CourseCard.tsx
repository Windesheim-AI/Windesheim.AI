import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Bar } from 'react-native-progress';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
    useCurrentTheme,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { Card } from '../../general/base/Card';
import { IconLine } from '../../general/base/IconLine';
import { CheckMarkFlag } from '../../general/base/checkFlagMark';
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

type Props = {
    title: string | undefined;
    completedTasks: number;
    totalTasks: number;
    onPress: () => void;
};

export function CourseCard({
    title,
    completedTasks,
    totalTasks,
    onPress,
}: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();
    const stateColors = useColorStateConfig();
    const theme = useCurrentTheme();
    const isCompleted = completedTasks === totalTasks;
    const iconColor = theme === 'dark' ? '#FFFFFF' : '#000000';
    const styles = StyleSheet.create({
        card: {
            padding: 0,
            flexDirection: 'row',
            ...stateColors.highContrastBorder,
        },
        titleSide: {
            width: '70%',
        },
        infoSide: {
            padding: 10,
            width: '30%',
            backgroundColor: colors.subCard,
            height: 'auto',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        },
        image: {
            width: '100%',
            height: 180,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        title: {
            ...fonts.courseTitle,
            flexWrap: 'wrap',
        },
        titleContainer: {
            height: 'auto',
            margin: 10,
        },
        progressBar: {
            height: 7,
            backgroundColor: colors.progressbarBg,
            marginBottom: 5,
            marginTop: 5,
            borderRadius: 10,
            ...shadow,
        },
        progressBarContainer: {
            flexDirection: 'row',
            marginRight: 30,
            ...stateColors.highContrastBorder,
        },
        courseNIndiciator: {
            ...fonts.description,
            marginLeft: 5,
        },
        infoMarginContainer: {
            marginTop: 'auto',
            alignItems: 'flex-start',
            marginBottom: 0,
            marginRight: 11,
            paddingLeft: -10,
            paddingRight: -10,
        },
        button: {
            backgroundColor: colors.bg3,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            ...shadow,
            ...fonts.stageTime,
            ...stateColors.highContrastBorder,
        },
    });

    return (
        <InteractiveView onPress={onPress} testID="course-card">
            <Card style={styles.card}>
                <View style={styles.titleSide}>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        source={require('../../../assets/images/bgImages/robot.png')}
                        style={styles.image}
                    />
                    <View style={styles.titleContainer}>
                        <TextTranslated style={styles.title} text={title} />
                        <View style={styles.progressBarContainer}>
                            <Bar
                                progress={completedTasks / totalTasks}
                                color={colors.completedProgressBar}
                                borderRadius={10}
                                style={styles.progressBar}
                            />
                            <TextTranslated
                                style={styles.courseNIndiciator}
                                text={`${completedTasks}/${totalTasks}`}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.infoSide}>
                    {/* star icon */}
                    <View style={styles.infoMarginContainer}>
                        <View style={styles.button}>
                            <IconLine
                                text="Start"
                                iconName="play"
                                iconColor={iconColor}
                                textStyle={{ color: colors.text }}
                                iconPosition="left"
                                size={20}
                            />
                        </View>
                    </View>
                </View>

                {isCompleted ? <CheckMarkFlag /> : null}
            </Card>
        </InteractiveView>
    );
}
