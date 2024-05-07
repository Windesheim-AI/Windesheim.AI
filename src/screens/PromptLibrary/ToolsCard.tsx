import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { TextTranslated } from '../../components/general/text/TextTranslated';
import { useColorConfig, shadow } from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';

export const ToolsCard = () => {
    const colors = useColorConfig();
    const fonts = useFonts();

    const ChatText =
        'ChatGPT is an artificial intelligence (AI) chatbot that can create humanlike conversational dialogues. The language model can respond to questions and compose various written content.';
    const DallEText =
        'DALL-E 3 is a neural network that generates images from textual descriptions. The AI model can create images based on written prompts, such as "a green apple';

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 20,
            padding: 15,
            backgroundColor: colors.listItemBg,
            borderRadius: 15,
            borderColor: colors.borderColor,
            ...shadow,
        },
        textRow: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginRight: 45,
            width: '70%',
        },
        textList: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        title: {
            ...fonts.h1,
            color: colors.disclaimerText,
        },
        toolsTitle: {
            ...fonts.h4,
            fontWeight: 'bold',
            textAlign: 'justify',
            marginTop: 16,
            marginLeft: 10,
            color: colors.titleDefault,
        },
        text: {
            ...fonts.small,
            textAlign: 'justify',
            color: colors.text,
            marginLeft: 10,
        },
        image: {
            width: 100,
            height: 100,
            marginTop: 15,
            borderRadius: 20,
        },
    });

    return (
        <View style={styles.container}>
            <TextTranslated style={styles.title} text="Useful prompts" />
            <View style={styles.textRow}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={require('../../assets/images/Icon/chatgpt.png')}
                    style={styles.image}
                />
                <View style={styles.textList}>
                    <TextTranslated style={styles.toolsTitle} text="ChatGPT" />
                    <TextTranslated style={styles.text} text={ChatText} />
                </View>
            </View>
            <View style={styles.textRow}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={require('../../assets/images/Icon/dall-e.png')}
                    style={styles.image}
                />
                <View style={styles.textList}>
                    <TextTranslated style={styles.toolsTitle} text="Dall-E 3" />
                    <TextTranslated style={styles.text} text={DallEText} />
                </View>
            </View>
        </View>
    );
};
