import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/Store';
import {NotificationType, Notification} from './Notification';


export const NotificationList = () => {
  const notifications = useAppSelector((state) => state.notification);
  const [notificationList, setNotificationList] = useState<NotificationType[]>([]);


  useEffect(() => {
      setNotificationList(notifications.notifications);
  }, [notifications]);

  return (
    <View style={styles.notificationContainer}>
      {notificationList.map((notification, index) => (
        <Notification key={index} {...notification} />
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