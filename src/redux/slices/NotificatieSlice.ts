import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType, Notification } from '../../components/alerts/Notification';

export interface NotificationSlice {
    notifications: NotificationType[];
}

const initialState: NotificationSlice = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      addNotification: (state, action: PayloadAction<NotificationType>) => {
        if(state.notifications.length > 0) action.payload.id = state.notifications[state.notifications.length-1].id+1;
        state.notifications.push(action.payload);
        console.log(state);
        
        // Auto-remove the notification after 3 seconds
        // setTimeout(() => {
        //   const notificationIdToRemove = action.payload.id;
        //   state.notifications = state.notifications.filter(
        //     (notification) => notification.id !== notificationIdToRemove
        //   );
        // }, 3000);
      },
    },
  });

  export const NotificationActions = notificationSlice.actions;