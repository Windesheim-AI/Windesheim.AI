/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-ignore eslint-disable
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RenderHTML } from 'react-native-render-html';

import { WhScrollView } from '../../components/general/WhScrollView';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../../components/text/TextTranslated';

export type WTRSContentScreenProps = {
    page: string;
};

export const WTRContentScreen = () => {
    const navigator = useNavigation();
    const route = useRoute();
    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();
    useEffect(() => {
        if (!page) {
            //@ts-ignore
            navigator.navigate(Routes.WindesheimTechRadar);
        }
    }, [navigator, page]);

    const [content, setContent] = useState('');
    const [loaded, setLoaded] = useState(false);
    const colors = useColorConfig();
    const defaultPage = 'windesheim-technology-radar';

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        text : {
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

    useEffect(() => {
        // get data from WordPress
        const URL = 'https://windesheim.tech';
        let FullUrl = URL + '/wp-json/wp/v2/pages?slug=' + page;
        fetch(FullUrl)
            .then((response) => response.json())
            .then((json) => {
                const html = json[0].content.rendered;
                setContent(html);
                setLoaded(true);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error);
                FullUrl = URL + '/wp-json/wp/v2/pages?slug=' + defaultPage;
                fetch(FullUrl)
                    .then((response) => response.json())
                    .then((json) => {
                        const html = json[0].content.rendered;
                        setContent(html);
                        setLoaded(true);
                    })
                    .catch((error2) => {
                        // eslint-disable-next-line no-console
                        console.error(error2);
                    });
            });
    }, [page]);

    function onElement(element: any) {
        try {
            // if the element is a link, remove the href attribute
            if (element.tagName === 'a') {
                element.attribs.href = '';
                for (let i = 0; i < element.children.length; i++) {
                    if (element.children[i].tagName === 'img') {
                        element.children[i].attribs.style =
                            'height: 45px; width: 45px;display: inline;';
                        element.attribs.style =
                            'width: 100%; display: flex; align-items: center;margin-bottom: 0px;';
                        return;
                    }
                }
                return;
            }
            // if h3 and had a image as child
            if (element.tagName === 'h3') {
                for (let i = 0; i < element.children.length; i++) {
                    if (element.children[i].tagName === 'img') {
                        element.children[i].attribs.style =
                            'height: 45px; width: 45px;display: inline;';
                        element.attribs.style =
                            'width: 100%; display: flex; align-items: center;margin-bottom: 0px;';
                        return;
                    }
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
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
                />
            </View>
        </WhScrollView>
    );
};
