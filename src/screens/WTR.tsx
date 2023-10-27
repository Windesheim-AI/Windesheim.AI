/* eslint-disable @typescript-eslint/no-implicit-any */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useColorConfig } from '../constants/Colors';

import HTML, { RenderHTML } from 'react-native-render-html';
import { WhScrollView } from '../components/general/WhScrollView';
import { useRoute } from '@react-navigation/native';

export type WTRScreenProps = {
    page: string;
};

export const WTRScreen = () => {
    const route = useRoute();
    const params = route.params as WTRScreenProps;
    const defaultPage = 'windesheim-technology-radar';
    const page = params?.page?.toString() ?? defaultPage;

    const [content, setContent] = useState('');
    const [loaded, setLoaded] = useState(false);
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        site: {
            flex: 1,
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
        const FULL_URL = URL + '/wp-json/wp/v2/pages?slug=' + page;
        console.log(FULL_URL);

        fetch(FULL_URL)
            .then((response) => response.json())
            .then((json) => {
                const html = json[0].content.rendered;
                setContent(html);
                setLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                const FULL_URL =
                    URL + '/wp-json/wp/v2/pages?slug=' + defaultPage;
                fetch(FULL_URL)
                    .then((response) => response.json())
                    .then((json) => {
                        const html = json[0].content.rendered;
                        setContent(html);
                        setLoaded(true);
                    })
                    .catch((error) => {
                        console.error(error);
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
            console.error(error);
        }
    }

    const domVisitors = {
        onElement: onElement,
    };

    if (!loaded)
        return (
            <View style={styles.container}>
                <Text>Loading content</Text>
            </View>
        );

    return (
        <WhScrollView>
            <View style={styles.container}>
                <RenderHTML
                    source={{ html: content }}
                    tagsStyles={tagsStyles}
                    classesStyles={classStyles}
                    domVisitors={domVisitors}
                    contentWidth={100}
                />
            </View>
        </WhScrollView>
    );
};
