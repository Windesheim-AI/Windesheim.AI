import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

import { CustomButton } from '../components/buttons/Button';
import { useColorConfig } from '../constants/Colors';

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
        <CustomButton />
    ) : (
        <View style={styles.container}>
            <CustomButton onPress={undefined} />
        </View>
    );
};
