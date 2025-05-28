import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { SettingsButton } from '../../src/components/general/buttons/SettingButton';
import { DisclaimerCard } from '../../src/components/general/card/DisclaimerCard';
import { Introduction } from '../../src/components/general/card/Introduction';
import { PageScrollView } from '../../src/components/general/views/PageScrollView';
import { useColorConfig, useCurrentTheme } from '../../src/lib/constants/Colors';

export const HomeScreen = () => {
    const currentTheme = useCurrentTheme();
    const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingLeft: 10,
            backgroundColor: colors.background,
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
            width: '100%',
            textAlign: 'center',
        },
        flexGrow: {
            flexGrow: 1,
        },
    });
    return (
        <>
            <View style={styles.headerContainer}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={require('../src/assets/images/Icon/favicon.png')}
                    style={styles.logo}
                />
                <Text style={[styles.logoText, { color: logoTextColor }]}>
                    WINDESHEIM.AI
                </Text>
                <View style={styles.flexGrow} />
                <SettingsButton />
            </View>
            <PageScrollView>
                <Introduction />
                <DisclaimerCard />
            </PageScrollView>
        </>
    );
};
