import * as React from 'react';

import { Button } from '../components/buttons/Button';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes } from '../constants/Colors';
import { Routes } from '../routes/routes';
import { PageScrollView } from '../components/general/PageScrollView';
import { HorizontalScroll} from '../components/general/HorizontalScroll';
import { StyleSheet, Text, View } from 'react-native';
import NewsItem from '../components/buttons/NewsItem';



export const HomeScreen = () => {
    const handleNewsItemClick = (newsId: number) => {
        // 뉴스 항목을 눌렀을 때 처리할 로직을 작성합니다.
        // 예: navigation.navigate('NewsDetail', { newsId });
    };

    return (
        <PageScrollView
            title="Home"
        >
            {/* description */}
            <Text style={{ fontSize: 15, fontWeight: 'normal', color: 'gray' ,marginBottom:10 }}>
                "Artificial intelligence is the key to innovating the future and transforming our lives"
            </Text>

            {/* "News" */}
            <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black',marginTop: 10,marginBottom:10 }}>
                News
            </Text>

            {/* HorizontalScroll */}
            <HorizontalScroll>
                {/* Newa Item */}
                <NewsItem title="News 1" onPress={() => handleNewsItemClick(1)} />
                <NewsItem title="News 2" onPress={() => handleNewsItemClick(2)} />
                <NewsItem title="News 3" onPress={() => handleNewsItemClick(3)} />
                <NewsItem title="News 4" onPress={() => handleNewsItemClick(4)} />
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
