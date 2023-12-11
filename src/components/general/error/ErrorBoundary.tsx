import Constants from 'expo-constants';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { isEnvSettingEnabled } from '../../../lib/utility/env/env';
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
        transform: 'scale(1)',
    },
    buttonText: {
        fontSize: windowWidth * 0.05,
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

interface Props {
    error: Error;
    resetError: () => void;
}

const ErrorFallback: React.FC<Props> = ({ error, resetError }: Props) => {
    return (
        <View style={styles.container} testID="error-fallback-container">
            <Text style={styles.title}>Something happened!</Text>
            <Text style={styles.text}>
                {isEnvSettingEnabled(EnvOptions.AppDebug)
                    ? error.toString()
                    : ''}
            </Text>
            <View style={styles.textContainer}>
                <Pressable style={styles.button} onPress={() => resetError()}>
                    <Text style={styles.buttonText}>Try again</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ErrorFallback;
