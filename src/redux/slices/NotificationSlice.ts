import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';

import { NotificationType } from '../../components/alerts/Notification';
import {
    stateColorSchemes,
    ColorGradientScheme,
    ColorTypes,
    colorIconMapping,
} from '../../constants/Colors';
import { useAppDispatch } from '../Hooks';

export type AddNotificationAction = {
    id: number;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    height?: number;
    icon?: string;
};

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
        addNotification: (
            state,
            action: PayloadAction<AddNotificationAction>,
        ) => {
            const id =
                state.notifications.length > 0
                    ? state.notifications[state.notifications.length - 1].id + 1
                    : 1;
            state.notifications.push({
                ...action.payload,
                id,
            });
        },
        addNotificationOnce: (
            state,
            action: PayloadAction<AddNotificationAction>,
        ) => {
            const existingNotification = state.notifications.find(
                (notification) => {
                    return notification.id === action.payload.id;
                },
            );

            if (existingNotification) {
                return;
            }

            state.notifications.push(action.payload);
        },
        removeNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload,
            );
        },
        clearNotification: (state) => {
            state.notifications = [];
        },
    },
});

export const NotificationActions = notificationSlice.actions;

export const useNotificationOnce = (
    id: number,
    message: string,
    colorType?: ColorTypes,
) => {
    const storeDispatcher = useAppDispatch();

    useEffect(() => {
        storeDispatcher(
            NotificationActions.addNotificationOnce({
                id,
                message,
                colorGradientScheme: colorType
                    ? stateColorSchemes[colorType]
                    : stateColorSchemes.primary,
                icon: colorType ? colorIconMapping[colorType] : 'info',
            } as AddNotificationAction),
        );
    });
};