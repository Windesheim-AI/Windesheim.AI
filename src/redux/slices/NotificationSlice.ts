import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../components/alerts/Notification';

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
      },
      removeNotification: (state, action: PayloadAction<number>) => {
        state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
      },
    },
  });

  export const NotificationActions = notificationSlice.actions;