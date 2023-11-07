/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-ignore eslint-disable
// @ts-ignore
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { WhScrollView } from '../../components/general/WhScrollView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';
import { useFetchWTRPage } from '../../lib/fetcher/WTRPageFetcher';
import WTRHtmlDisplay from '../../components/WTR/html/WTRHtmlDisplay';
import { PageView } from '../../components/general/PageView';

export type WTRSContentScreenProps = {
    page: string;
};

export const WTRContentScreen = () => {
    const navigator = useNavigation();
    const route = useRoute();
    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();
    const colors = useColorConfig();
    const defaultPage = 'windesheim-technology-radar';
    const { content } = useFetchWTRPage(page, defaultPage);

    useEffect(() => {
        if (!page) {
            //@ts-ignore
            navigator.navigate(Routes.WindesheimTechRadar);
        }
    }, [navigator, page]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        text: {
            color: colors.text,
        },
    });

    if (content.length < 1) {
        return (
            <PageView title="Page not found">
                <Text style={styles.text}>
                    <TextTranslated
                        text={
                            "We're sorry, but we couldn't find the page you were looking for."
                        }
                    />
                </Text>
            </PageView>
        );
    }

    return (
        <WhScrollView>
            <View style={styles.container}>
                <WTRHtmlDisplay html={content} colors={colors} />
            </View>
        </WhScrollView>
    );
};
