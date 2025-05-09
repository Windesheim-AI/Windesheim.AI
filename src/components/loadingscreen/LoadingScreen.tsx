import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const LoadingScreen = () => {
    const styles = StyleSheet.create({
        fullScreenContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white', // adjust based on your theme if needed
            zIndex: 999,
        },
        loadingImage: {
            width: 120,
            height: 120,
            resizeMode: 'contain',
        },
    });

    return (
        <View style={styles.fullScreenContainer}>
            <Image
                source={require('../../assets/images/Icon/loading.gif')}
                style={styles.loadingImage}
                testID="loadingGif"
            />
        </View>
    );
};

export default LoadingScreen;
