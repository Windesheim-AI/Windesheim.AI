/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, ViewStyle, Image, View } from 'react-native';

import arrowLeft from '../../assets/images/Icon/go_back_arrow.png';
import { EditAiFamiliarityCard } from '../../components/BackgroundCollect/EditAiFamiliarityCard';
import { EditInterestedKeywordCard } from '../../components/BackgroundCollect/EditInterestedKeywordCard';
import { EditPositionCard } from '../../components/BackgroundCollect/EditPositionCard';
import { PageScrollView } from '../../components/general/views/PageScrollView';
import { useCurrentTheme } from '../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
export const BackgroundInfo = () => {
    const navigation = useNavigation();
    const currentTheme = useCurrentTheme();
    const goBack = () => {
        HapticFeedback(HapticForces.Light);
        navigation.goBack();
    };

    const buttonStyle: ViewStyle = {
        position: 'absolute',
        top: 0,
        right: 10,
    };
    const iconStyle = {
        width: 37,
        height: 37,
        tintColor: currentTheme === 'dark' ? '#FFFFFF' : 'black',
    };
    const spacerStyle: ViewStyle = {
        height: 10,
    };
    return (
        <PageScrollView title="Background">
            <View style={spacerStyle} />
            <TouchableOpacity onPress={goBack} style={buttonStyle}>
                <Image source={arrowLeft} style={iconStyle} />
            </TouchableOpacity>
            <EditPositionCard />
            <EditInterestedKeywordCard />
            <EditAiFamiliarityCard />
        </PageScrollView>
    );
};
