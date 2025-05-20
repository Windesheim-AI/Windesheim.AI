/* eslint-disable indent */
import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, Text } from 'react-native';

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
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 20,
            padding: 20,
            backgroundColor: '#FFFF',
            borderRadius: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
        },
        image: {
            width: 100,
            height: 100,
            backgroundColor: '#D0D0D0',
            borderRadius: 20,
        },
        content: {
            flex: 1,
            marginRight: 16,
            justifyContent: 'center',
        },
        titleText: {
            ...fonts.h2,
            fontSize: 15,
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

    let articleImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (
        article.imageLink &&
        article.imageLink.trim() !== '' &&
        article.imageLink !== 'null' &&
        article.imageLink !== '0'
    ) {
        articleImageSource = { uri: article.imageLink };
    }

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
            <Image source={articleImageSource} style={styles.image} />
        </InteractiveView>
    );
}
