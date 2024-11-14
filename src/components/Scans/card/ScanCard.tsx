import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorConfig, useColorStateConfig, useCurrentTheme } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { Card } from '../../general/base/Card';
import { IconLine } from '../../general/base/IconLine';
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

type Props = {
    name: string | undefined;
    description?: string;
    onPress: () => void;
};

export function ScanCard({
    name,
    description = '',
    onPress,
}: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();
    const stateColors = useColorStateConfig();
    const theme = useCurrentTheme();

    const styles = StyleSheet.create({
        card: {
            padding: 0,
            flexDirection: 'column',
            ...stateColors.highContrastBorder,
        },
        contentContainer: {
            padding: 15,
        },
        title: {
            ...fonts.courseTitle,
            flexWrap: 'wrap',
            marginBottom: 5,
        },
        description: {
            ...fonts.description,
            marginBottom: 10,
        },
        separatorContainer: {
            paddingHorizontal: 0, 
            marginVertical: 10,
        },
        separator: {
            borderBottomWidth: 1,
            borderBottomColor: '#CCCCCC',
        },
        buttonContainer: {
            alignItems: 'center',
            backgroundColor: '#FFD700',
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 15,
            ...fonts.stageTime,
        },
    });

    return (
        <InteractiveView onPress={onPress} testID="course-card">
            <Card style={styles.card}>
                <View style={styles.contentContainer}>
                    <TextTranslated style={styles.title} text={name} />

                    {description ? (
                        <TextTranslated style={styles.description} text={description} />
                    ) : null}
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>
                        <IconLine
                            text="Lees meer.
                            ..
                            "
                            iconName=""
                            textStyle={{ color: colors.text }}
                            iconPosition="left"
                            size={30}
                        />
                    </View>
                </View>
            </Card>
        </InteractiveView>
    );
}
