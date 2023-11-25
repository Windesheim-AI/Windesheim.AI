import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import animationSource from '../../../assets/json/500_man.json';
import { getEnvValue } from '../../../lib/utility/env/env';
import { EnvOptions } from '../../../lib/utility/env/env.values';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const colors = {
    white: 'white',
    blue: 'blue',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        textAlign: 'center',
        backgroundColor: colors.white,
    },
    title: {
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: windowWidth * 0.1,
    },
    text: {
        marginVertical: windowWidth * 0.04,
        fontSize: windowWidth * 0.05,
        padding: 8,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * 0.3,
        height: windowHeight * 0.08,
        backgroundColor: colors.blue,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: windowWidth * 0.05,
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    animationContainer: {
        width: windowWidth * 0.8,
        height: windowWidth * 0.8,
    },
});

interface Props {
    error: Error;
    resetError: () => void;
}

const ErrorFallback: React.FC<Props> = ({ error, resetError }: Props) => {
    return (
        <View style={styles.container} testID="error-fallback-container">
            <View style={styles.animationContainer}>
                {Platform.OS !== 'web' ? (
                    <LottieView
                        source={animationSource}
                        autoPlay
                        style={styles.animationContainer}
                    />
                ) : null}
            </View>
            <Text style={styles.title}>Something happened!</Text>
            <Text style={styles.text}>
                {getEnvValue(EnvOptions.AppDebug) === 'true'
                    ? error.toString()
                    : ''}
            </Text>
            <View style={styles.textContainer}>
                <TouchableOpacity
                    style={[styles.button, { transform: [{ scale: 1 }] }]}
                    onPress={() => {
                        resetError();
                    }}
                >
                    <Text style={styles.buttonText}>Try again</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ErrorFallback;
