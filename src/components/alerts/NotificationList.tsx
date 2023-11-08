import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../redux/Store';
import {NotificationType} from './Notification';


export const NotificationList = () => {
  //const notifications = useSelector((state) => state.notifications.notifications);
  const notifications = useAppSelector((state) => state.notification);
  const [notificationList, setNotificationList] = useState<NotificationType[]>([]);

  useEffect(() => {
      setNotificationList(notifications.notifications);
  }, [notifications]);

  return (
    <View style={styles.notificationContainer}>
      {notificationList.map((notification) => (
        <View key={notification.id} style={styles.notification}>
          <Text>{notification.message}</Text>
        </View>
      ))}


    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  notification: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
  },
});

export default NotificationList;