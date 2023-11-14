import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { InteractableView } from '../../components/general/views/InteractableView';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
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
        },
    });

    function handlePress() {
        //@ts-ignore
        navigation.navigate(Routes.Course.toString(), {
            courseId,
            stageId: id,
        });
    }

    return (
        <InteractableView onPress={handlePress} style={styles.card}>
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
        </InteractableView>
    );
};
