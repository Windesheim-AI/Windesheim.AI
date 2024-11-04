import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { TechProviders } from '../components/WTR/TechProviders';
import { Themes } from '../components/WTR/Themes';
import { TitleSimple } from '../components/general/text/TitleSimple';
import { PageScrollView } from '../components/general/views/PageScrollView';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';

export const WTRScreen = () => {
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingLeft: 10,
            paddingBottom: 10,
            backgroundColor: colors.background,
            marginBottom: 25,
            borderBottomWidth: 1, 
            borderBottomColor: 'gray',
            height: 50,
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
        <PageScrollView>
            <TitleSimple
                titleText="Windesheim Tech Radar"
                explainationText="The Windesheim Tech Radar is linked to the windesheim.tech website. The Tech Radar is a useful tool to see which technologies (tech providers) and trends (themes) exist and how they relate to each other."
            />
            <TechProviders />
            <Themes />
        </PageScrollView>
    );
};
