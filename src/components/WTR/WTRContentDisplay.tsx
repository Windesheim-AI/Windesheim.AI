import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import WTRHtmlDisplay from '../../components/WTR/html/WTRHtmlDisplay';
import { useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { useFetchWTRPage } from '../../lib/fetcher/WTRPageFetcher';
import { useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { TextTranslated } from '../general/text/TextTranslated';
import { PageView } from '../general/views/PageView';
import { WhScrollView } from '../general/views/WhScrollView';
import LoadingScreen from '../loadingscreen/LoadingScreen';

export type WTRSContentDisplayProps = {
    page: string;
};

export const WTRContentDisplay = ({ page }: WTRSContentDisplayProps) => {
    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();
    const fonts = useFonts();
    const { content, hasContent, isLoading } = useFetchWTRPage(page);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        text: {
            color: colors.text,
            ...fonts.description,
        },
    });

    useEffect(() => {
        storeDispatcher(setLoading(isLoading));
    }, [isLoading, storeDispatcher]);

    if (!hasContent) {
        if (isLoading) {
            return <LoadingScreen />;
        }

        return (
            <PageView title="Page not found">
                <TextTranslated
                    style={styles.text}
                    text={
                        "We're sorry, but we couldn't find the page you were looking for."
                    }
                />
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
