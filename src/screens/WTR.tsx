import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useColorConfig } from '../constants/Colors';

import { RenderHTML } from 'react-native-render-html';
import { WhScrollView } from '../components/general/WhScrollView';

export const WTRScreen = () => {
    const [content, setContent] = useState('');
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
        },
        site: {
            flex: 1,
        },
    });

    const tagsStyles = {
        h1: {
            color: 'red',
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        p: {
            color: 'blue',
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 10,
        },
        'wp-block-heading img': {
            height: 50,
        },
    };

    const classStyles = {
        'floating-sidebar': {
            display: 'none',
        },
    };

    const parseCssToInline = (html: string, css: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const elements = doc.querySelectorAll('[class], img'); // Include 'img' to target elements directly

        elements.forEach((element) => {
            const classNames = element.getAttribute('class');
            if (classNames) {
                const classNameList = classNames.split(' ');
                let inlineStyles = '';

                classNameList.forEach((className) => {
                    const regex = new RegExp(
                        `\\.${className}\\s*{([\\s\\S]*?)}`,
                        'g',
                    );
                    let match;

                    while ((match = regex.exec(css))) {
                        const styleRules = match[1];
                        if (styleRules) {
                            inlineStyles += styleRules;
                        }
                    }
                });

                if (inlineStyles) {
                    element.setAttribute('style', inlineStyles);
                } else {
                    //apply the component styles like img:{} to the element
                    const regex = new RegExp(
                        `\\.${element.nodeName}\\s*{([\\s\\S]*?)}`,
                        'g',
                    );
                    let match;

                    while ((match = regex.exec(css))) {
                        console.log(match);

                        const styleRules = match[1];
                        if (styleRules) {
                            inlineStyles += styleRules;
                        }
                    }
                    if (inlineStyles) {
                        element.setAttribute('style', inlineStyles);
                    }
                }
            }
        });

        return doc.documentElement.outerHTML;
    };

    useEffect(() => {
        // get data from wordpress
        const URL = 'https://windesheim.tech/';
        const PAGE = 'google';
        const FULL_URL = URL + '/wp-json/wp/v2/pages?slug=' + PAGE;
        fetch(FULL_URL)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json[0].content.rendered);
                //use the json.content.rendered
                // setContent(json[0].content.rendered);
                console.log(json);

                // using the juice library to inline the css
                console.log('test');
                const html = json[0].content.rendered;
                // const inlined = juice.inlineContent(html, css);
                // console.log(inlined);
                setContent(html);
                // console.log(cssContent);
                const cssStyles =
                    '.floating-sidebar { display: none; } img { display: none; }';

                const htmlWithInlineStyles = parseCssToInline(html, cssStyles);
                setContent(htmlWithInlineStyles);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <WhScrollView>
            <View style={styles.container}>
                {/* <HTML
                    source={{ html: content }}
                    tagsStyles={tagsStyles}
                    classesStyles={classStyles}
                /> */}

                <RenderHTML source={{ html: content }} />
            </View>
        </WhScrollView>
    );
};
