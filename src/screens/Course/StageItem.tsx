import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TextTranslated } from '../../components/text/TextTranslated';
import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Routes } from '../../routes/routes';
import { Course } from '../../types/Course';
import { StageData } from '../../types/Stage';

export const StageItem = ({
    stage,
    isCompletedByUser,
    courseId,
}: StageData & { courseId: string }) => {
    const fonts = useFonts();
    const colors = useColorConfig();
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
    });

    function handlePress() {
        //@ts-ignore
        navigation.navigate(Routes.Course.toString(), {
            courseId,
            stageId: stage.id,
        });
    }

    return (
        <View onTouchEnd={handlePress}>
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
                <View style={styles.title}>
                    <TextTranslated text={stage.title} />
                </View>
            </View>
        </View>
    );
};
