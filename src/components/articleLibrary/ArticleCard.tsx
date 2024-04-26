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
            ? '#FFFFFF'
            : '#000000'
        : isHighContrast
          ? '#000000'
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
            borderRadius: 12,
            padding: 10,
            marginBottom: 16,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
            paddingRight: 20,
        },
        headContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },
        image: {
            borderRadius: 15,
            height: 75,
            width: 75,
            resizeMode: 'cover',
            marginRight: 5,
            marginBottom: 4,
        },
        titleText: {
            width: '80%',
            ...fonts.h2,
            color: colors.titleDefault,
        },
        descriptionText: {
            ...fonts.description,
            flexWrap: 'wrap',
            fontSize: 10,
            flexShrink: 1,
            marginBottom: 4,
            marginTop: 4,
            marginRight: 5,
        },
        tagContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: -3,
            marginBottom: 4,
        },
        tag: {
            marginHorizontal: 4,
            marginTop: 4,
            paddingHorizontal: 6,
            paddingVertical: 2,
            backgroundColor: colors.completedProgressBar,
            borderRadius: 5,
            overflow: 'hidden',
        },
        tagText: {
            ...fonts.description,
            fontSize: 12,
            fontWeight: 'bold',
            color: tagTextColor,
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    let articleImageSource: ImageSourcePropType = require('../../assets/images/bgImages/robot.png');
    if (
        article.imageLink !== undefined &&
        article.imageLink !== null &&
        article.imageLink.length > 0 &&
        article.imageLink !== '' &&
        article.imageLink !== ' ' &&
        article.imageLink !== 'null' &&
        article.imageLink !== '0'
    ) {
        articleImageSource = {
            uri: article.imageLink,
        };
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
            <View style={styles.headContainer}>
                <Image source={articleImageSource} style={styles.image} />
                <TextTranslated style={styles.titleText} text={article.title} />
            </View>
            <TextTranslated
                style={styles.descriptionText}
                text={article.description}
                numberOfLines={3}
            />
            <View style={styles.tagContainer}>
                {article.categoryArray.map((tagText) => (
                    <View style={styles.tag} key={tagText}>
                        <TextTranslated style={styles.tagText} text={tagText} />
                    </View>
                ))}
            </View>
        </InteractiveView>
    );
}
