// @ts-ignore
import { EXPO_PUBLIC_GTR_API_KEY } from '@env';
import { useContext, useEffect, useMemo, useState } from 'react';

import { TranslateContext } from '../../lib/translation/Translator';
import React from 'react';
import { defaultSystemFonts, RenderHTML } from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { useColorConfig } from '../../constants/Colors';
import { translatorFactory } from '../../lib/translation/translators/TranslatorFactory';
import { useAppSelector } from '../../redux/Hooks';

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

const systemFonts = ['space-mono', ...defaultSystemFonts];

type HtmlTranslatedProps = {
    source: string;
};

const HtmlTranslated = React.memo(({ source }: HtmlTranslatedProps) => {
    const { width } = useWindowDimensions();
    const colors = useColorConfig();
    const language = useAppSelector((state) => state.language.langCode);
    const handleTranslate = useContext(TranslateContext);
    const [updatedHtml, setUpdatedHtml] = useState(source);

    const tagsStyles = useMemo(() => {
        return {
            h1: {
                display: 'inline-block',
            },
            h2: {
                display: 'inline-block',
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
            img: {
                overflow: 'hidden',
                width: '100%',
                objectFit: 'center',
                alignSelf: 'center',
                resizeMode: 'contain',
            },
            figure: {
                display: 'block',
            },
        };
    }, [colors.text]);

    useEffect(() => {
        const html = source;

        // Extract all strings from HTML using regex
        const extractedStrings: string[] = [];
        const regex = /<[^>]*>([^<]*)<\/[^>]*>/g; // Simple regex to extract text content within HTML tags

        let match;
        while ((match = regex.exec(html)) !== null) {
            const text = match[1].trim();
            if (text) {
                extractedStrings.push(text);
            }
        }

        const translator = translatorFactory.create({
            to: language,
            from: 'nl',
            apiKey: EXPO_PUBLIC_GTR_API_KEY,
        });

        // Replace original strings with translated strings
        let translatedHtml = html;
        extractedStrings.forEach(async (str, index) => {
            const result = await translator.translate('Hello');
            if (!result) return;

            translatedHtml = translatedHtml.replace(
                extractedStrings[index],
                result,
            );

            console.log('result', result);
            setUpdatedHtml(translatedHtml);
        });
    }, [source, handleTranslate]);

    return (
        <RenderHTML
            source={{ html: updatedHtml }}
            contentWidth={width}
            //@ts-ignore
            tagsStyles={tagsStyles}
            //@ts-ignore
            classesStyles={classStyles}
            systemFonts={systemFonts}
            ignoredDomTags={['iframe', 'script']}
            enableExperimentalMarginCollapsing
        />
    );
});

HtmlTranslated.displayName = 'HtmlTranslated';

export default HtmlTranslated;
