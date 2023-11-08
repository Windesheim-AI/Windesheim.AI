import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import WTRHtmlDisplay from '../../components/WTR/html/WTRHtmlDisplay';
import { PageView } from '../../components/general/PageView';
import { WhScrollView } from '../../components/general/WhScrollView';
import { TextTranslated } from '../../components/text/TextTranslated';
import { useColorConfig } from '../../constants/Colors';
import { useFetchWTRPage } from '../../lib/fetcher/WTRPageFetcher';
import { Routes } from '../../routes/routes';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { useAppDispatch } from '../../redux/Hooks';

export type WTRSContentScreenProps = {
    page: string;
};

export const WTRContentScreen = () => {
    const storeDispatcher = useAppDispatch();
    const navigator = useNavigation();
    const route = useRoute();
    const params = route.params as WTRSContentScreenProps;
    const page = params?.page?.toString();
    const colors = useColorConfig();
    const { content, hasContent, isLoading } = useFetchWTRPage(page);

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

    useEffect(() => {
        if (!page) {
            //@ts-ignore
            navigator.navigate(Routes.WindesheimTechRadar);
        }
    }, [navigator, page]);

    useEffect(() => {
        storeDispatcher(setLoading(isLoading));
    }, [isLoading, storeDispatcher]);

    if (!hasContent) {
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
