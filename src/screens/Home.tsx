import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Button } from '../components/buttons/Button';
import NewsItem from '../components/buttons/NewsItem';
import { HorizontalScroll } from '../components/general/HorizontalScroll';
import { PageScrollView } from '../components/general/PageScrollView';
import { buttonColorSchemes } from '../constants/Colors';
import { Routes } from '../routes/routes';

import { Linking } from 'react-native';

const colors = {
    gray: 'gray',
    black: 'black',
    // 다른 색상들도 필요한 경우 여기에 추가할 수 있습니다.
};

const styles = StyleSheet.create({
    descriptionText: {
        fontSize: 15,
        fontWeight: 'normal',
        marginBottom: 10,
        color: colors.gray,
    },
    newsHeaderText: {
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: colors.black,
    },
});

export const HomeScreen = () => {

    const handleNewsItemClick = (newsId: number) => {
        switch (newsId) {
            case 1:
                // 첫 번째 아이템을 클릭했을 때의 URL
                const url = 'https://www.artificialintelligence-news.com/';
                // Linking API를 사용하여 해당 URL로 이동
                Linking.openURL(url)
                    .then((supported) => {
                        if (!supported) {
                            console.error('URL을 열 수 없습니다:', url);
                        } else {
                            return Linking.openURL(url);
                        }
                    })
                    .catch((err) => console.error('에러 발생:', err));
                break;
            // 다른 뉴스 아이템에 대한 처리를 추가할 수 있습니다.
            default:
                console.log(`News item ${newsId} clicked`);
                break;
        }
    };
    

    return (
        <PageScrollView title="Home">
            {/* description */}
            <Text style={styles.descriptionText}>
                &ldquo;Artificial intelligence is the key to innovating the
                future and transforming our lives&rdquo;
            </Text>

            {/* "News" */}
            <Text style={styles.newsHeaderText}>News</Text>

            {/* HorizontalScroll */}
            <HorizontalScroll>
                {/* Newa Item */}
                <NewsItem
                    title="News 1"
                    onPress={() => handleNewsItemClick(1)}
                />
                <NewsItem
                    title="News 2"
                    onPress={() => handleNewsItemClick(2)}
                />
                <NewsItem
                    title="News 3"
                    onPress={() => handleNewsItemClick(3)}
                />
                <NewsItem
                    title="News 4"
                    onPress={() => handleNewsItemClick(4)}
                />
            </HorizontalScroll>

            {/* Button */}
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />
        </PageScrollView>
    );
};
