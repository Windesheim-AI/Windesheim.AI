import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

import { CustomButton } from '../components/buttons/Button';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';

export const WTRScreen = () => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
        },
        site: {
            flex: 1,
        },
    });

    return Platform.OS === 'web' ? (
        <View style={styles.container}>
            <iframe
                className="windesheim-tech-radar-frame"
                height="100%"
                sandbox=""
                src="https://windesheim.tech"
                width="100%"
            />
            <CustomButton
                buttonText="HOME"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName="Home"
                icon="link"
            />
        </View>
    ) : (
        <View style={styles.container}>
            <WebView
                source={{ uri: 'https://windesheim.tech' }}
                style={styles.site}
            />
            <CustomButton
                buttonText="Go!"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName="Home"
                icon="link"
            />
        </View>
    );
};
