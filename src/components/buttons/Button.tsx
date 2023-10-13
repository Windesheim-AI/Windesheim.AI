/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';


export const CustomButton = ({ onPress, buttonText = "Press Me" }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <View style={styles.bg1} />
            <View style={styles.bg2} />
            <Text style={styles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const width = 100;
const buttomWidth = width * 3;
const height = 4 * width;

const styles = StyleSheet.create({
    button: {
        borderRadius: 40,
        backgroundColor: 'green',
        // from left to rigth items
        flexDirection: 'row',
        maxHeight: 90,
        overflow: 'hidden',
        width: buttomWidth,
        // center
        alignItems: 'center',
    },
    bg1: {
        width,
        height,
        left: -30,
        top: -30,
        transform: [{ rotate: '20deg' }],
        backgroundColor: 'red',
    },
    bg2: {
        width,
        height,
        left: -30,
        top: -30,
        transform: [{ rotate: '20deg' }],
        backgroundColor: 'blue',
        marginRight: -30
    }, 
});
