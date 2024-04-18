import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Quizzes() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Courses + Quizzes</Text>
            <Text style={styles.placeholderText}>NO CONTENT FOR NOW!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 18,
        textAlign: 'center',
    },
});
