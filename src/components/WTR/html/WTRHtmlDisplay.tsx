import React, { useMemo } from 'react';
import { RenderHTML } from 'react-native-render-html';
import { DomVisitorCallbacks } from '@native-html/transient-render-engine';
import { ColorSchemeType } from '../../../constants/Colors';

function onElement(element: any) {
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
        }
    } catch (error) {
        console.error(error);
    }
}

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

export type WTRHtmlDisplayProps = {
    html: string;
    colors: ColorSchemeType;
};

/**
 * This component is used to display the HTML content of the WTR pages.
 * It is memoized by react to prevent costly re-renders.
 * See: https://stackoverflow.com/questions/68966120
 */
const WTRHtmlDisplay = React.memo(({ html, colors }: WTRHtmlDisplayProps) => {
    const domVisitors: DomVisitorCallbacks = {
        onElement,
    };

    const tagsStyles = useMemo(() => {
        return {
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
    }, [colors.text]);

    return (
        <RenderHTML
            source={{ html }}
            //@ts-ignore
            tagsStyles={tagsStyles}
            //@ts-ignore
            classesStyles={classStyles}
            domVisitors={domVisitors}
            contentWidth={100}
            ignoredDomTags={['iframe', 'amp-img', 'font', 'color']}
        />
    );
});

export default WTRHtmlDisplay;
