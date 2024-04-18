import React from 'react';
import {
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    SafeAreaView,
    Platform,
    Image,
    View,
} from 'react-native';

//import { Fonts } from '../../lib/constants/Fonts';
import { PageScrollView } from '../general/views/PageScrollView';
interface Card {
    title: string;
    description: string;
    image: string;
}

interface SlidingProps {
    cards: Card[];
}

export const Sliding = ({ cards }: SlidingProps) => {
    const renderItem = ({
        item: { title, description, image },
    }: {
        item: Card;
    }) => {
        return (
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.cardText}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <PageScrollView>
                <FlatList
                    horizontal
                    pagingEnabled
                    data={cards}
                    renderItem={renderItem}
                />
            </PageScrollView>
        </SafeAreaView>
    );
};

const CARD_BACKGROUND_COLOR = '#f2f2f2';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        width: 250,
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: CARD_BACKGROUND_COLOR,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    cardText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        fontFamily: 'Courier New',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
});
