import * as React from 'react';
import { StyleSheet, Text ,Linking} from 'react-native';

import { Button } from '../components/buttons/Button';
import NewsItem from '../components/buttons/NewsItem';
import { HorizontalScroll } from '../components/general/HorizontalScroll';
import { PageScrollView } from '../components/general/PageScrollView';
import { buttonColorSchemes } from '../constants/Colors';
import { Routes } from '../routes/routes';

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
    const handleNewsItemClick = (newsId : number) => {
        let url;
        // 뉴스 아이템에 따라 URL 결정
        switch (newsId) {
            case 1:
                url = 'https://www.artificialintelligence-news.com/';
                break;
            case 2:
                url = 'https://www.artificialintelligence-news.com/';
                break;
            case 3:
                url = 'https://www.artificialintelligence-news.com/';
                break;
            case 4:
                url = 'https://www.artificialintelligence-news.com/';
                break;
            default:
                // newsId가 어떤 case와도 맞지 않으면 기본 URL을 엽니다
                url = 'https://www.artificialintelligence-news.com/';
        }
        
        // 기기의 기본 브라우저에서 URL 열기
        Linking.openURL(url).catch((err) => console.error('에러 발생', err));
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
