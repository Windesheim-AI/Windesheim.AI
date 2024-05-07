/* eslint-disable react-native/no-raw-text */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ViewStyle,
    Image,
} from 'react-native';
import { Chip } from 'react-native-paper';

import arrowLeft from '../../assets/images/Icon/go_back_arrow.png';
import { Card } from '../../components/general/base/Card';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import {
    useColorConfig,
    useCurrentTheme,
    shadow,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
export type PromptPageProps = {
    promptId: string;
};
export const MockTutorial = () => {
    const fonts = useFonts();
    const colors = useColorConfig();
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();
    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigation.goBack();
    };

    const styles = StyleSheet.create({
        title: {
            ...fonts.h1,
            marginBottom: 10,
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: -5,
            marginBottom: 10,
        },
        chipText: {
            ...fonts.chipText,
        },
        toolTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colors.toolTag,
            borderColor: colors.toolTag,
            color: colors.tagText,
        },
        sectorTag: {
            marginRight: 5,
            marginBottom: 5,
            backgroundColor: colors.sectorTag,
            borderColor: colors.sectorTag,
            color: colors.tagText,
            ...shadow,
        },
        promptPatternTag: {
            marginRight: 5,
            marginBottom: 20,
            backgroundColor: colors.patternTag,
            borderColor: colors.patternTag,
            color: colors.tagText,
            ...shadow,
        },
        cardDescription: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: colors.text,
        },
        subtitle: {
            ...fonts.h2,
            marginBottom: 10,
        },
    });
    const buttonStyle: ViewStyle = {
        position: 'absolute',
        top: 0,
        right: 10,
    };
    const iconStyle = {
        width: 37,
        height: 37,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
    };
    const titleSpacer = {
        height: 10,
    };
    return (
        <PageScrollView>
            <TextTranslated style={styles.title} text="Ontwikkel persona" />
            <View style={titleSpacer} />
            <TouchableOpacity onPress={goBack} style={buttonStyle}>
                <Image source={arrowLeft} style={iconStyle} />
            </TouchableOpacity>
            <View style={styles.tagContainer}>
                <Chip
                    style={styles.toolTag}
                    textStyle={styles.chipText}
                    icon="wrench"
                    theme={{ colors: { primary: 'black' } }}
                >
                    ChatGPT
                </Chip>
                <Chip
                    style={styles.sectorTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colors.tagText,
                    }}
                    icon="briefcase"
                    theme={{ colors: { primary: 'black' } }}
                >
                    Education
                </Chip>
                <Chip
                    style={styles.promptPatternTag}
                    mode="outlined"
                    textStyle={{
                        ...styles.chipText,
                        color: colors.tagText,
                    }}
                    icon="clipboard"
                    theme={{ colors: { primary: 'black' } }}
                >
                    Persona Pattern
                </Chip>
                <Card>
                    <TextTranslated
                        style={styles.subtitle}
                        text="Description"
                    />
                    <Text style={styles.cardDescription}>
                        Creëer fictieve profielen van leerlingen of studenten
                        als ijkpersonen voor je onderwijs, bekend als personas,
                        om zo je leerlingen of studenten beter te begrijpen en
                        tegemoet te komen aan hun behoeften en achtergronden.
                    </Text>
                </Card>
                <Card>
                    <TextTranslated style={styles.subtitle} text="Prompt" />
                    <Text style={styles.cardDescription}>
                        Ik wil datje (AANTAL) personas creëert voor mijn
                        onderwijspraktijk. De context van mijn onderwijs is
                        [CONTEXT]. De duur van mijn onderwijs is [DUUR]. De
                        doelgroep bestaat uit [DOELGROEP]. Werk de personas uit
                        in een tabel, met de volgende kolommen: naam,
                        omschrijving, soort(typisch of atypisch), behoeften,
                        motivatie(type motivatie omschrijving) en doelen.
                    </Text>
                </Card>
            </View>
        </PageScrollView>
    );
};
