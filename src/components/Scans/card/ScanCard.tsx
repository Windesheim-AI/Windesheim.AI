/* eslint-disable react-native/no-color-literals */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
    useColorConfig,
    useColorStateConfig,
} from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { Card } from '../../general/base/Card';
import { IconLine } from '../../general/base/IconLine';
import { TextTranslated } from '../../general/text/TextTranslated';
import { InteractiveView } from '../../general/views/InteractiveView';

type Props = {
    name: string | undefined;
    description?: string;
    difficulty: string | undefined;
    imageUrl?: string;
    onPress: () => void;
};

export function ScanCard({
    name,
    description = '',
    difficulty = '',
    imageUrl = '',
    onPress,
}: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();
    const stateColors = useColorStateConfig();

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
        cardImage: { width: '100%', height: 'auto' },
    });

    return (
        <InteractiveView onPress={onPress} testID="scan-card">
            <Card style={styles.card}>
                <View>
                    <img
                        src={
                            imageUrl
                                ? imageUrl
                                : 'https://placehold.co/200X100/EEE/31343C'
                        }
                        alt="Scan Image"
                        style={styles.cardImage}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <TextTranslated style={styles.title} text={name} />

                    {description ? (
                        <TextTranslated
                            style={styles.description}
                            text={description}
                        />
                    ) : null}

                    {difficulty ? (
                        <TextTranslated
                            style={styles.description}
                            text={'Complexiteit: ' + difficulty + '/5'}
                        />
                    ) : null}
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>
                        <IconLine
                            text="Read more"
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
