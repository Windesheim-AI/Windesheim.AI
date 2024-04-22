import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { SettingsButton } from '../components/general/buttons/SettingButton';
import { DisclaimerCard } from '../components/general/card/DisclaimerCard';
import { Introduction } from '../components/general/card/Introduction';
import { PageScrollView } from '../components/general/views/PageScrollView';

export const HomeScreen = () => {
    return (
        <PageScrollView>
            <View style={styles.headerContainer}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    source={require('../assets/images/Icon/favicon.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>WINDESHEIM.AI</Text>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 35,
    },
    logo: {
        width: 37,
        height: 37,
        resizeMode: 'contain',
    },
    flexGrow: {
        flexGrow: 1,
    },
});
