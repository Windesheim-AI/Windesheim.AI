import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';

import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

const newsData = [
    {
        id: 1,
        title: '1',
        content: 'News 1',
        url: 'https://www.artificialintelligence-news.com/2023/10/24/nightshade-poisons-ai-models-fight-copyright-theft/',
    },
    {
        id: 2,
        title: '2',
        content: 'News 2',
        url: 'https://www.artificialintelligence-news.com/2023/10/19/umg-files-landmark-lawsuit-ai-developer-anthropic/',
    },
];

const NewsList = () => {
    const colors = useColorConfig();
    const fonts = useFonts();

    const handleNewsItemClick = (url: string) => {
        // eslint-disable-next-line no-void
        void Linking.openURL(url);
    };

    const styles = StyleSheet.create({
        newsItemContainer: {
            flexDirection: 'row',
            margin: 10,
            marginRight: 10,
        },
        newsItem: {
            width: 120,
            height: 150,
            backgroundColor: colors.gray,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 10,
        },
        newsItemText: {
            ...fonts.h4,
            textAlign: 'center',
        },
    });

    return (
        <View testID="newslist" style={styles.newsItemContainer}>
            {newsData.map((item) => (
                <TouchableOpacity
                    testID="newsitem"
                    key={item.id}
                    style={styles.newsItem}
                    onPress={() => handleNewsItemClick(item.url)}
                >
                    <Text style={styles.newsItemText}>
                        <TextTranslated text={item.title} />
                    </Text>
                    <Text style={styles.newsItemText}>
                        <TextTranslated text={item.content} />
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default NewsList;
