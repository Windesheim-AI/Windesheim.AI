/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/no-multi-comp */
// @ts-ignore eslint-disable
import {
    DomVisitorCallbacks,
    isDomElement,
    isDomText,
    Node,
} from '@native-html/transient-render-engine';
import React, { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import {
    defaultSystemFonts,
    domNodeToHTMLString,
    HTMLContentModel,
    HTMLElementModel,
    RenderHTML,
    useInternalRenderer,
} from 'react-native-render-html';
import { InternalRendererProps } from 'react-native-render-html/lib/typescript/shared-types';
import { CustomTagRendererRecord } from 'react-native-render-html/src/render/render-types';

import { ColorSchemeType } from '../../../constants/Colors';
import HtmlTranslated from '../../text/HtmlTranslated';
import strigifyEntities from 'stringify-entities';
import { DomNodeToHtmlReporter } from 'react-native-render-html/src/helpers/domNodeToHTMLString';

function onElement(element: any) {
    try {
        element.children.forEach((child: any) => {
            // Make sure that the page title and theme links are displayed
            // correctly. Otherwise, the images are displayed too big.
            if (
                (element.tagName === 'a' && child.tagName === 'img') ||
                (element.tagName === 'h1' && child.tagName === 'img') ||
                (element.tagName === 'h2' && child.tagName === 'img') ||
                (element.tagName === 'h3' && child.tagName === 'img')
            ) {
                child.attribs.style =
                    'height: 45px; width: 45px; display: inline;';
                element.attribs.style =
                    'width: 100%; display: flex; align-items: center; margin-bottom: 0px;';
                if (element.tagName === 'a') {
                    element.attribs.href = '';
                }
            }
        });
    } catch (error) {
        // eslint-disable-next-line no-console
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

const systemFonts = ['space-mono', ...defaultSystemFonts];

const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
        tagName: 'font',
        contentModel: HTMLContentModel.block,
    }),
    'amp-img': HTMLElementModel.fromNativeModel({
        tagName: 'img',
        category: 'embedded',
        isVoid: true,
        getReactNativeProps({ attributes }, props) {
            // see https://w3c.github.io/html-aria/#el-img
            const label = attributes['aria-label'] || attributes.alt;
            if (
                label &&
                (!props?.view || props.view.accessibilityRole !== 'none')
            ) {
                return {
                    native: {
                        accessibilityLabel: label,
                        accessibilityRole: 'image',
                    },
                };
            }
            return {
                native: {
                    accessibilityRole: 'image',
                },
            };
        },
    }).extend({
        contentModel: HTMLContentModel.block,
    }),
};

function CustomImageRenderer(props: InternalRendererProps<any>) {
    const { Renderer, rendererProps } = useInternalRenderer('img', props);

    return (
        <View testID="custom-image">
            <Renderer {...rendererProps} />
        </View>
    );
}

function renderOpeningTag(tag: string, attributes: Record<string, string>) {
    const strAttributes: string[] = [];
    Object.keys(attributes).forEach((key) => {
        strAttributes.push(
            `${key}="${strigifyEntities(`${attributes[key]}`)}"`,
        );
    });
    return `<${tag}${strAttributes.length ? ' ' : ''}${strAttributes.join(
        ' ',
    )}>`;
}

function internalDomNodeToHTMLString(
    root: Node | null,
    reporter?: DomNodeToHtmlReporter,
    depth = 0,
) {
    let html = '';
    if (isDomElement(root)) {
        const strChildren = root.children.reduce((prev, curr) => {
            const convertedNode = domNodeToHTMLString(
                curr,
                reporter,
                depth + 1,
            );
            return `${prev}${convertedNode}`;
        }, '');
        html = `${renderOpeningTag(
            root.tagName,
            root.attribs,
        )}${strChildren}</${root.tagName}>`;
    } else if (isDomText(root)) {
        html = strigifyEntities(root.data, { escapeOnly: true });
    }
    typeof reporter === 'function' && reporter(root, depth, html);
    return html;
}

function HtmlTextTranslateRenderer({ tnode }: any) {
    const html = React.useMemo(
        () => internalDomNodeToHTMLString(tnode.domNode),
        [tnode.domNode],
    );

    return <HtmlTranslated source={html} />;
}

const renderers: CustomTagRendererRecord = {
    img: CustomImageRenderer,
    'amp-img': CustomImageRenderer,
    p: HtmlTextTranslateRenderer,
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
    const { width } = useWindowDimensions();

    const domVisitors: DomVisitorCallbacks = {
        onElement,
    };

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

    return (
        <RenderHTML
            source={{ html }}
            //@ts-ignore
            tagsStyles={tagsStyles}
            //@ts-ignore
            classesStyles={classStyles}
            systemFonts={systemFonts}
            domVisitors={domVisitors}
            contentWidth={width}
            ignoredDomTags={['iframe', 'script']}
            customHTMLElementModels={customHTMLElementModels}
            renderers={renderers}
            enableExperimentalMarginCollapsing
        />
    );
});

WTRHtmlDisplay.displayName = 'WTRHtmlDisplay';

export default WTRHtmlDisplay;
