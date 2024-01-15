import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { NotificationType, Notification } from './Notification';
import { useAppSelector } from '../../../lib/redux/Hooks';

export const NotificationList = () => {
    const notifications = useAppSelector((state) => state.notification);
    const [notificationList, setNotificationList] = useState<
        NotificationType[]
    >([]);

    useEffect(() => {
        setNotificationList(notifications.notifications);
    }, [notifications]);

    return (
        <View style={styles.notificationContainer}>
            {notificationList.map((notification) => (
                <Notification key={notification.id} {...notification} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        position: 'absolute',
        top: '3%',
        right: 0,
        left: 0,
        zIndex: 999,
    },
});

export default NotificationList;
