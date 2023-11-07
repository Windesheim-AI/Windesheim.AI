/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-ignore eslint-disable
// @ts-ignore
import { EXPO_PUBLIC_GTR_API_KEY } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RenderHTML } from 'react-native-render-html';

import { WhScrollView } from '../../components/general/WhScrollView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';
import { useFetchWTRPage } from '../../lib/fetcher/WTRPageFetcher';
import { TranslateContext } from '../../lib/translation/Translator';
import { translatorFactory } from '../../lib/translation/translators/TranslatorFactory';
import { defaultLanguageCode } from '../../constants/Languages';
import { RootState, useAppSelector } from '../../redux/Hooks';

export type WTRSContentScreenProps = {
    page: string;
};

export const WTRContentScreen = () => {
    const languageState = useAppSelector((state: RootState) => state.language);
    const navigator = useNavigation();
    const route = useRoute();
    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();
    const colors = useColorConfig();
    const defaultPage = 'windesheim-technology-radar';
    const { content, loaded } = useFetchWTRPage(page, defaultPage);

    useEffect(() => {
        if (!page) {
            //@ts-ignore
            navigator.navigate(Routes.WindesheimTechRadar);
        }
    }, [navigator, page]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        text: {
            color: colors.text,
        },
    });

    const tagsStyles = {
        h2: {
            display: 'none',
        },
        h3: {
            display: 'inline-block',
        },
        h4: {
            marginBottom: 0,
        },
        p: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 10,
            marginTop: 0,
        },
        a: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 10,
            color: colors.text,
            textDecorationLine: 'none',
        },
        body: {
            color: colors.text,
        },
        figure: {
            display: 'none',
        },
    };

    const classStyles = {
        'floating-sidebar': {
            display: 'none',
        },
        hideBigMedia: {
            display: 'none',
        },
        'feedzy-rss': {
            display: 'none',
        },
    };

    async function onElement(element: any) {
        try {
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children[i];
                if (
                    (element.tagName === 'a' && child.tagName === 'img') ||
                    (element.tagName === 'h3' && child.tagName === 'img')
                ) {
                    child.attribs.style =
                        'height: 45px; width: 45px; display: inline;';
                    element.attribs.style =
                        'width: 100%; display: flex; align-items: center; margin-bottom: 0px;';
                    if (element.tagName === 'a') {
                        element.attribs.href = '';
                    }
                    return;
                }
                //i need all text on the page to be translated
                if (child.type === 'text') {
                    const translator = translatorFactory.create({
                        to: languageState.langCode,
                        from: 'nl',
                        apiKey: EXPO_PUBLIC_GTR_API_KEY,
                    });

                    child.data = await translator.translate(child.data);
                    element.children[i] = child;
                    console.log(child.data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const domVisitors = {
        onElement,
    };

    if (!loaded)
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    <TextTranslated text="Loading content" />
                </Text>
            </View>
        );

    return (
        <WhScrollView>
            <View style={styles.container}>
                <RenderHTML
                    source={{ html: content }}
                    //@ts-ignore
                    tagsStyles={tagsStyles}
                    //@ts-ignore
                    classesStyles={classStyles}
                    domVisitors={domVisitors}
                    contentWidth={100}
                    ignoredDomTags={['iframe', 'amp-img']}
                />
            </View>
        </WhScrollView>
    );
};
