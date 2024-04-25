import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { Introduction } from '../components/general/card/Introduction';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useCurrentTheme } from '../lib/constants/Colors';

export const HomeScreen = () => {
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    return (
        <PageScrollView>
            <View style={styles.headerContainer}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={require('../assets/images/Icon/favicon.png')}
                    style={styles.logo}
                />
                <Text style={[styles.logoText, { color: logoTextColor }]}>
                    WINDESHEIM.AI
                </Text>
                <View style={styles.flexGrow} />
                <SettingsButton />
            </View>
            <Introduction />
            <DisclaimerCard />
        </PageScrollView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        width: 37,
        height: 37,
        resizeMode: 'contain',
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -105 }],
    },
    flexGrow: {
        flexGrow: 1,
    },
});
