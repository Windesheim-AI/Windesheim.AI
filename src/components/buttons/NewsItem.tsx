import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

type NewsItemProps = {
    title: string;
    url: string;
};

export const newsItemStyles = StyleSheet.create({
    webViewContainer: {
        width: 120,
        height: 150,
        marginRight: 10,
        padding: 10,
        borderRadius: 8,
    },
    newsText: {
        fontWeight: 'bold',
    },
});

export const newsData = [
    {
        title: 'News 1',
        url: 'https://www.news1.com/',
    },
    {
        title: 'News 2',
        url: 'https://www.news2.com/',
    },
    {
        title: 'News 3',
        url: 'https://www.news3.com/',
    },
    {
        title: 'News 4',
        url: 'https://www.news4.com/',
    },
];

const NewsItem: React.FC<NewsItemProps> = ({ title, url }) => {
    return (
        <TouchableOpacity>
            <View style={newsItemStyles.webViewContainer}>
                <Text style={newsItemStyles.newsText}>{title}</Text>
                <WebView
                    source={{ uri: url }}
                    style={newsItemStyles.webViewContainer}
                />
            </View>
        </TouchableOpacity>
    );
};

export default NewsItem;
