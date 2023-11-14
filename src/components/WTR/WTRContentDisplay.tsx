import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import WTRHtmlDisplay from '../../components/WTR/html/WTRHtmlDisplay';
import { useColorConfig } from '../../constants/Colors';
import { useFetchWTRPage } from '../../lib/fetcher/WTRPageFetcher';
import { useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { PageView } from '../general/views/PageView';
import { WhScrollView } from '../general/views/WhScrollView';
import { TextTranslated } from '../general/text/TextTranslated';

export type WTRSContentDisplayProps = {
    page: string;
};

export const WTRContentDisplay = ({ page }: WTRSContentDisplayProps) => {
    const storeDispatcher = useAppDispatch();
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
