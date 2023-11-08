import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

import NewsList from '../components/Data/NewsList';
import { Button } from '../components/buttons/Button';
import HorizontalScroll from '../components/general/HorizontalScroll';
import { PageView } from '../components/general/PageView';
import { buttonColorSchemes, useColorConfig } from '../constants/Colors';
import { Routes } from '../routes/routes';
import { useAppDispatch } from '../redux/Store';
import { NotificationActions } from '../redux/slices/NotificatieSlice';
import { Notification, NotificationType } from '../components/alerts/Notification';

export const HomeScreen = () => {
    const colors = useColorConfig();
    const storeDispatcher = useAppDispatch();
    const styles = StyleSheet.create({
        newsHeaderText: {
            fontSize: 23,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
            color: colors.text,
        },
    });

    

    const addNewNotification = () => {

        const notification = {
            id: 1,
            //type: "success",
            screenName: 'WTR',
            message: 'message added',
            colorGradientScheme: buttonColorSchemes.success,
            icon: 'circle-exclamation',
            isVisible: false,
        } as NotificationType

        storeDispatcher(NotificationActions.addNotification(notification));
    };

    return (
        <PageView
            title="Home"
            description="Artificial intelligence is the key to innovating the
                future and transforming our lives"
        >
            {/* "News" */}
            <Text style={styles.newsHeaderText}>News</Text>

            {/* HorizontalScroll */}
            <HorizontalScroll>
                <NewsList />
            </HorizontalScroll>

            {/* Button */}
            <Button
                buttonText="Windesheim Tech Radar"
                colorGradientScheme={buttonColorSchemes.primary}
                screenName={Routes.WindesheimTechRadar}
                width={100}
            />

            <Button buttonText='add message' onPress={addNewNotification} colorGradientScheme={buttonColorSchemes.success} screenName='WTR' width={100} />
        </PageView>
    );
};
