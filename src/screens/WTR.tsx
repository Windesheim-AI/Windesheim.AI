import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useColorConfig } from '../constants/Colors';

import HTML from 'react-native-render-html';
import { WhScrollView } from '../components/general/WhScrollView';

export const WTRScreen = () => {
    const [content, setContent] = useState('');
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
            //display: 'none',
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
        // get data from wordpress
        const URL = 'https://windesheim.tech';
        const PAGE = 'google';
        const FULL_URL = URL + '/wp-json/wp/v2/pages?slug=' + PAGE;
        fetch(FULL_URL)
            .then((response) => response.json())
            .then((json) => {
                const html = json[0].content.rendered;
                setContent(html);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function onElement(element : any) {
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
        // if h3 and had a image as child, remove the h3
        if (element.tagName === 'h3') {
            console.log(element.children);
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
    }

    const domVisitors = {
        onElement: onElement,
    };

    return (
        <WhScrollView>
            <View style={styles.container}>
                <HTML
                    source={{ html: content }}
                    tagsStyles={tagsStyles}
                    classesStyles={classStyles}
                    domVisitors={domVisitors}
                />
            </View>
        </WhScrollView>
    );
};
