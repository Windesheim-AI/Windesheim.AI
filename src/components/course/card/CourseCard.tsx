import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Bar } from 'react-native-progress';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { usePreparedTranslator } from '../../../lib/translations/hooks';
import { Card } from '../../general/base/Card';
import { IconLine } from '../../general/base/IconLine';
import { CheckMarkFlag } from '../../general/base/checkFlagMark';
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

type Props = {
    title: string | undefined;
    completedTasks: number;
    totalTasks: number;
    level: string;
    likes: number;
    onPress: () => void;
};

export function CourseCard({
    title,
    completedTasks,
    totalTasks,
    level,
    likes,
    onPress,
}: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();
    const stateColors = useColorStateConfig();
    const isCompleted = completedTasks === totalTasks;

    const styles = StyleSheet.create({
        card: {
            padding: 0,
            flexDirection: 'row',
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
            height: 100,
            borderTopLeftRadius: 10,
        },
        title: {
            ...fonts.courseTitle,
            // warp title
            flexWrap: 'wrap',
        },
        titleContainer: {
            height: 'auto',
            margin: 10,
        },
        progressBar: {
            height: 7,
            borderColor: colors.listItemBg,
            backgroundColor: colors.subCard,
            marginTop: 5,
            borderRadius: 10,
            ...shadow,
        },
        progressBarContainer: {
            flexDirection: 'row',
            marginRight: 30,
        },
        courseNIndiciator: {
            ...fonts.description,
            marginLeft: 5,
        },
        infoMarginContainer: {
            marginTop: 'auto',
            alignItems: 'flex-start',
            marginBottom: 10,
            marginRight: 10,
        },
        iconLines: {
            marginBottom: 10,
            display: 'none',
        },
        button: {
            backgroundColor: colors.bg3,
            borderRadius: 10,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 14,
            paddingRight: 14,
            marginTop: 10,
            ...shadow,
            ...fonts.stageTime,
        },
    });

    const t = usePreparedTranslator();

    return (
        <InteractiveView onPress={onPress}>
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
                                color={stateColors.colors.secondary[1]}
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
                        <IconLine
                            text={`${t('Level')} ${level}`}
                            iconName="star"
                            iconColor={stateColors.colors.secondary[1]}
                            textStyle={{ color: colors.text }}
                            iconPosition="left"
                            size={20}
                            style={styles.iconLines}
                        />
                        <IconLine
                            text={likes.toString()}
                            iconName="heart"
                            iconColor={stateColors.colors.danger[0]}
                            textStyle={{ color: colors.text }}
                            iconPosition="left"
                            size={20}
                            style={styles.iconLines}
                        />
                        <View style={styles.button}>
                            <IconLine
                                text="Start"
                                iconName="play"
                                iconColor={colors.white}
                                textStyle={{ color: colors.white }}
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
