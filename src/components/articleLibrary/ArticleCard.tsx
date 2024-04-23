import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';

import {
    shadow,
    useColorConfig,
    useColorStateConfig,
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

export function ArticleCard({ article }: Props) {
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.listItemBg,
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            ...shadow,
            ...colorStateConfig.highContrastBorder,
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
        },
        tagContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },
        tagText: {
            marginHorizontal: 4,
            marginTop: 4,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 10,
            backgroundColor: colors.completedProgressBar,
            ...fonts.description,
            fontSize: 12,
            fontWeight: 'bold',
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
                    <TextTranslated
                        style={styles.tagText}
                        key={tagText}
                        text={tagText}
                    />
                ))}
            </View>
        </InteractiveView>
    );
}
