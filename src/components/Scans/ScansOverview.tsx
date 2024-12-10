import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { useFonts } from '../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useMapMultipleScansToData } from '../../lib/repositories/scans/mapMultipleScansToData';
import useAllScans from '../../lib/repositories/scans/useAllScans';
import { getRandomLimitedItemsFromArray } from '../../lib/utility/data';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { ScanDataMapped } from '../../types/Scan';
import { ScanCard } from '../Scans/card/ScanCard';
import { TextTranslated } from '../general/text/TextTranslated';

type Props = {
    limit?: number;
};

export function ScansOverview({ limit }: Props) {
    const fonts = useFonts();
    const { data, isLoading, error } = useAllScans();
    const scans = useMapMultipleScansToData(data);
    const navigator = useNavigation();
    const isLimited = limit !== undefined && limit > 0;
    const selectedScans = isLimited
        ? getRandomLimitedItemsFromArray(scans, limit)
        : scans;

    function onPress(scanId: string) {
        HapticFeedback(HapticForces.Light);
        navigator.navigate(Routes.ScansOverview.toString(), {
            scanId,
        });
    }

    if (isLoading) {
        return <TextTranslated style={fonts.default} text="Loading..." />;
    }

    if (error) {
        return (
            <TextTranslated
                style={fonts.h1}
                text="An error occurred while loading the data"
            />
        );
    }

    return (
        <FlatList
            testID="test-container"
            data={selectedScans}
            renderItem={({ item }) => (
                <View
                    style={styles.courseCardContainer}
                    testID={`course-card-${item.scanId}`}
                >
                    <ScanCard
                        key={item.scanId}
                        name={item.name ?? ''}
                        description={item.description ?? ''}
                        difficulty={item.difficulty ?? ''}
                        imageUrl={item.imageUrl ?? ''}
                        onPress={() => onPress(item.scanId)}
                    />
                </View>
            )}
            keyExtractor={(item: ScanDataMapped) => item.scanId}
        />
    );
}

const styles = StyleSheet.create({
    courseCardContainer: {
        marginBottom: 20, // Space between each ScanCard
        paddingHorizontal: 16, // Optional: Padding on the sides for consistent alignment
    },
});
