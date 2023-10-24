import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';

type NewsItemProps = {
    title: string;
    url: string;
};

const grayColor = '#e1e1e1';

const NewsItem: React.FC<NewsItemProps> = ({ title, url }) => {
    const handlePress = () => {
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              Linking.openURL(url);
            } else {
              throw new Error('URL is not supported');
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
      };

    return (
        <TouchableOpacity onPress={handlePress}>
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
