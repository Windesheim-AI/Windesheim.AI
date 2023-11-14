import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, Text } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import WordAnimation from './WordAnimation';
import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

interface Props {
    text: string;
    prompt: string;
}

export default function AIGeneratedOutput({ text, prompt }: Props) {
    const colors = useColorConfig();
    const fonts = useFonts();
    const [modalVisible, setModalVisible] = useState(false);
    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            ...shadow,
            padding: 20,
            borderRadius: 15,
        },
        icon: {
            marginRight: 10,
        },
        title: {
            ...fonts.h4,
            flexDirection: 'row',
            fontWeight: 400,
            textAlignVertical: 'center',
            alignItems: 'center', // added property
            marginBottom: 7,
        },
        seePrompt: {
            ...fonts.accent,
            marginLeft: 20,
            textDecorationLine: 'underline',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.modalBackground,
        },
        modalContent: {
            backgroundColor: colors.listItemBg,
            padding: 20,
            borderRadius: 15,
            alignItems: 'center',
            margin: 20,
        },
        modalText: {
            ...fonts.h4,
            marginBottom: 20,
        },
        modalCloseButton: {
            ...fonts.accent,
            marginTop: 20,
        },
    });

    return (
        <View style={styles.card}>
            <View style={styles.title}>
                {/* education hat */}
                <FontAwesome5Icon
                    name="project-diagram"
                    size={15}
                    style={styles.icon}
                    color={colors.text}
                />
                <TextTranslated text="AI Generated Output" />
                <Pressable onPress={() => setModalVisible(true)}>
                    <TextTranslated
                        style={styles.seePrompt}
                        text="(See Prompt)"
                    />
                </Pressable>
            </View>
            <View style={fonts.description}>
                <WordAnimation text={text} speed={1.3} />
            </View>
            <Modal
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{prompt}</Text>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <TextTranslated
                                style={styles.modalCloseButton}
                                text="Close"
                            />
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
