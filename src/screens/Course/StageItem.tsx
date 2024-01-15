import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextTranslated } from '../../components/general/text/TextTranslated';
import { IntractableView } from '../../components/general/views/IntractableView';
import {
    shadow,
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { StageDataMapped } from '../../types/Stage';

export const StageItem = ({
    title,
    id,
    isCompletedByUser,
    courseId,
}: StageDataMapped & { courseId: string }) => {
    const fonts = useFonts();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        courseTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 10,
        },
        title: {
            ...fonts.h3,
            marginLeft: 10,
            color: colors.text,
        },

        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            marginBottom: 16,
            paddingLeft: 10,
            ...shadow,
            elevation: 5,
            ...colorStateConfig.highContrastBorder,
        },
    });

    function handlePress() {
        HapticFeedback(HapticForces.Light);
        navigation.navigate(Routes.CourseStage, {
            courseId,
            stageId: id,
        });
    }

    return (
        <IntractableView
            onPress={handlePress}
            style={styles.card}
            testID={`stage-card-${id}`}
        >
            <View style={styles.courseTitle}>
                {isCompletedByUser ? (
                    <MaterialCommunityIcons
                        name="check-circle"
                        size={24}
                        color={colors.success}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="checkbox-blank-circle-outline"
                        size={24}
                        color={colors.text}
                    />
                )}
                <TextTranslated style={styles.title} text={title} />
            </View>
        </IntractableView>
    );
};
