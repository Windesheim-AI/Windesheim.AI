import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from 'react-native';

const colors = {
    gray: 'gray',
    black: 'black',
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
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const newsData = [
    {
        id: 1,
        title: '1',
        content: '뉴스내용',
        url: 'https://www.example.com/news1',
    },
    {
        id: 2,
        title: '2',
        content: '뉴스내용',
        url: 'https://www.example.com/news2',
    },
];

const NewsList = () => {
    const handleNewsItemClick = (url: string) => {
        // eslint-disable-next-line no-void
        void Linking.openURL(url);
    };
    return (
        <View testID="newslist" style={styles.newsItemContainer}>
            {newsData.map((item) => (
                <TouchableOpacity
                    testID="newsitem"
                    key={item.id}
                    style={styles.newsItem}
                    onPress={() => handleNewsItemClick(item.url)}
                >
                    <Text style={styles.newsItemText}>{item.title}</Text>
                    <Text style={styles.newsItemText}>{item.content}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default NewsList;
