import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { estimateTimeToRead } from '../../../lib/utility/estimateTime';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { Routes } from '../../../routes/routes';
import { CourseStageBlock } from '../../../types/CourseStageBlock';
import { CheckMarkFlag } from '../../general/base/checkFlagMark';
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

export type StageCardProps = {
    stageTitle: string;
    stageIndex: number;
    stageDescription: CourseStageBlock[];
    style?: ViewStyle;
    isCompleted?: boolean;
    courseId: string;
    stageId: string;
};

export function StageCard({
    stageIndex,
    stageTitle,
    stageDescription,
    isCompleted,
    style,
    courseId,
    stageId,
}: StageCardProps) {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        time: {
            ...fonts.stageTime,
            color: colors.accentTitle,
        },
        title: {
            ...fonts.cardStageTitle,
            marginTop: 4,
            color: colors.titleDefault,
        },
        contentContainer: {
            marginLeft: 16,
            flexWrap: 'wrap',
            flex: 1,
        },
        image: {
            borderRadius: 15,
            height: 64,
            width: 64,
            resizeMode: 'cover',
        },
        topComponent: {
            paddingTop: 2,
        },
    });

    function handlePress() {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.CourseStage, {
            courseId,
            stageId,
        });
    }

    return (
        <View style={styles.topComponent}>
            <InteractiveView
                style={[styles.card, style]}
                onPress={handlePress}
                testID={`stage-card-${stageId}`}
            >
                <View style={styles.container}>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        source={require('../../../assets/images/bgImages/robot.png')}
                        style={styles.image}
                    />
                    <View style={styles.contentContainer}>
                        <TextTranslated
                            style={styles.time}
                            text={estimateTimeToRead(stageDescription)}
                        />
                        <TextTranslated
                            style={styles.title}
                            text={`${stageIndex} - ${stageTitle}`}
                        />
                    </View>
                </View>
            </InteractiveView>
            {!isCompleted ? <CheckMarkFlag /> : null}
        </View>
    );
}
