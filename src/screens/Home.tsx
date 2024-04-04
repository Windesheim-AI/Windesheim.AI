/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef } from 'react';
import {
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';

import { PageScrollView } from '../components/general/views/PageScrollView';

const cards = [
    { id: '1', title: 'Card 1', color: 'red' },
    { id: '2', title: 'Card 2', color: 'blue' },
    { id: '3', title: 'Card 3', color: 'green' },
    { id: '4', title: 'Card 4', color: 'yellow' },
];

export const HomeScreen = () => {
    const flatListRef = useRef<FlatList | null>(null);
    const renderItem = ({ item: { title, color }, index: number }) => {
        return (
            <TouchableOpacity
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                style={{ ...styles.card, backgroundColor: color }}
            >
                <Text>{title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <PageScrollView>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    data={cards}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </PageScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: 300,
        height: 300,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});