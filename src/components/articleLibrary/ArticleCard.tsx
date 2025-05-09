/* eslint-disable indent */
import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
    useCurrentHighContrastMode,
    useCurrentTheme,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { openBrowserPopup } from '../../lib/utility/browserPopup';
import { Article } from '../../types/Article';
import { TextTranslated } from '../general/text/TextTranslated';
import { InteractiveView } from '../general/views/InteractiveView';

type Props = {
    article: Article;
};

function getTagTextColor(theme: string, isHighContrast: boolean) {
    return theme === 'light'
        ? isHighContrast
            ? '#000000'
            : '#000000'
        : isHighContrast
          ? '#FFFFFF'
          : '#FFFFFF';
}

export function ArticleCard({ article }: Props) {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const theme = useCurrentTheme();
    const isHighContrast = useCurrentHighContrastMode();
    const tagTextColor = getTagTextColor(theme, isHighContrast);

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 24,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
        },
        image: {
            width: '100%',
            height: 180,
            resizeMode: 'cover',
        },
        content: {
            padding: 16,
        },
        titleText: {
            ...fonts.h2,
            fontSize: 18,
            fontWeight: '600',
            color: colors.titleDefault,
            marginBottom: 12,
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
        },
        tag: {
            backgroundColor: colors.completedProgressBar,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            marginRight: 8,
            marginBottom: 8,
            ...colorStateConfig.highContrastBorder,
        },
        tagText: {
            ...fonts.description,
            fontSize: 12,
            fontWeight: '500',
            color: tagTextColor,
        },
    });

    // Determine image source
    let articleImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (
        article.imageLink &&
        article.imageLink.trim() !== '' &&
        article.imageLink !== 'null' &&
        article.imageLink !== '0'
    ) {
        articleImageSource = { uri: article.imageLink };
    }

    // Split categories
    article.categoryArray = article.category.split(', ');

    return (
        <InteractiveView
            style={styles.card}
            testID="article-card"
            onPress={() => {
                HapticFeedback(HapticForces.Light);
                openBrowserPopup(article.link);
            }}
        >
            <Image source={articleImageSource} style={styles.image} />
            <View style={styles.content}>
                <TextTranslated style={styles.titleText} text={article.title} />
                <View style={styles.tagContainer}>
                    {article.categoryArray.map((tagText) => (
                        <View style={styles.tag} key={tagText}>
                            <TextTranslated style={styles.tagText} text={tagText} />
                        </View>
                    ))}
                </View>
            </View>
        </InteractiveView>
    );
}
