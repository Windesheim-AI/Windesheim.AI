import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface NewsItemProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.newsItem}>
                <Text style={styles.newsText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    newsItem: {
        width: 130,
        height: 170,
        marginRight: 10,
        backgroundColor: '#e1e1e1',
        padding: 10,
        borderRadius: 8,
    },
    newsText: {
        fontWeight: 'bold',
    },
});

export default NewsItem;
