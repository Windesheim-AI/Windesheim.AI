import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type NewsItemProps = {
    title: string;
    onPress: () => void;
};

const grayColor = '#e1e1e1';

const NewsItem: React.FC<NewsItemProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.newsItem, { backgroundColor: grayColor }]}>
                <Text style={styles.newsText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    newsItem: {
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

export default NewsItem;
