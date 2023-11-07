/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

//@ts-ignore
import Ai from '../../assets/images/WTR/Themes/ai.jpg';
//@ts-ignore
import Cloud from '../../assets/images/WTR/Themes/cloud.jpg';
//@ts-ignore
import Ftti from '../../assets/images/WTR/Themes/ftti.jpg';
//@ts-ignore
import Green from '../../assets/images/WTR/Themes/green-it.jpg';
//@ts-ignore
import Nexuit from '../../assets/images/WTR/Themes/nextui.jpg';
//@ts-ignore
import Programming from '../../assets/images/WTR/Themes/programming.jpg';
//@ts-ignore
import Quantum from '../../assets/images/WTR/Themes/quantum.jpg';
//@ts-ignore
import Trust from '../../assets/images/WTR/Themes/trust.jpg';
//@ts-ignore
import Work from '../../assets/images/WTR/Themes/work.jpeg';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';
import HorizontalScroll from '../general/HorizontalScroll';
import { TextTranslated } from '../text/TextTranslated';

const themes = [
    {
        name: 'Artificial Intelligence',
        slug: 'artificial-intelligence',
        image: Ai,
    },
    { name: 'Building Trust', slug: 'building-trust', image: Trust },
    { name: 'Cloud Everywhere', slug: 'cloud-everywhere', image: Cloud },
    {
        name: 'Transaction to interaction',
        slug: 'transaction-interaction',
        image: Ftti,
    },
    {
        name: 'Future of programming',
        slug: 'programming',
        image: Programming,
    },
    { name: 'Future of Work', slug: 'future-of-work', image: Work },
    { name: 'Green IT', slug: 'green-it', image: Green },
    { name: 'Next UI', slug: 'next-ui', image: Nexuit },
    {
        name: 'Quantum computing',
        slug: 'quantum-computing',
        image: Quantum,
    },
];

export const Themes = () => {
    const colors = useColorConfig();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        heading: {
            color: colors.text,
            fontSize: 24,
            fontWeight: 'bold',
            margin: 10,
        },
        themeItem: {
            width: 120,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginRight: 10,
            overflow: 'hidden',
        },
        themeItemText: {
            color: colors.text,
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            flexWrap: 'wrap',
        },
        opacityLayer: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.opacityLayer,
        },
    });

    const navigate = (provider: string) => () => {
        //@ts-ignore
        navigation.navigate(Routes.WindesheimTechRadar, {
            page: provider,
        });
    };

    return (
        <View>
            <Text style={styles.heading}>
                <TextTranslated text="Themes" />
            </Text>
            <HorizontalScroll>
                {themes.map((theme) => (
                    <Pressable key={theme.slug} onPress={navigate(theme.slug)}>
                        <ImageBackground
                            source={theme.image}
                            style={styles.themeItem}
                        >
                            <View style={styles.opacityLayer}>
                                <Text style={styles.themeItemText}>
                                    <TextTranslated text={theme.name} />
                                </Text>
                            </View>
                        </ImageBackground>
                    </Pressable>
                ))}
            </HorizontalScroll>
        </View>
    );
};
