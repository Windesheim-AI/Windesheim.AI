import { NotificationType } from '../../../../src/components/general/alerts/Notification';
import {
    NotificationActions,
    notificationSlice,
} from '../../../../src/lib/redux/slices/NotificationSlice';

describe('NotificationSlice', () => {
    it('should have the correct initial state', () => {
        const initialState = notificationSlice.reducer(undefined, {
            type: undefined,
        });
        expect(initialState).toEqual({ notifications: [] });
    });

    it('should handle adding a notification', () => {
        const initialState = { notifications: [] };
        const notification = {
            id: 1,
            message: 'message added',
            colorGradientScheme: ['#FFF', '#CCC', '#333'],
            icon: 'exclamation-circle',
        } as NotificationType;

        const nextState = notificationSlice.reducer(
            initialState,
            NotificationActions.addNotification(notification),
        );

        expect(nextState.notifications).toEqual([notification]);
    });

    it('can add a notification once', () => {
        const initialState = { notifications: [] };
        const notification = {
            id: 1,
            message: 'message added',
            colorGradientScheme: ['#FFF', '#CCC', '#333'],
            icon: 'exclamation-circle',
        } as NotificationType;

        let nextState = notificationSlice.reducer(
            initialState,
            NotificationActions.addNotificationOnce(notification),
        );
        expect(nextState.notifications).toEqual([notification]);
        nextState = notificationSlice.reducer(
            initialState,
            NotificationActions.addNotificationOnce(notification),
        );

        expect(nextState.notifications).toEqual([notification]);
    });

    it('does not add a notification anymore when it is already added', () => {
        const initialState = {
            notifications: [
                {
                    id: 1,
                    message: 'message added',
                    colorGradientScheme: ['#FFF', '#CCC', '#333'],
                    icon: 'exclamation-circle',
                } as NotificationType,
            ],
        };
        const newNotification = {
            id: 1,
            message: 'message added 2',
            colorGradientScheme: ['#FFF', '#CCC', '#333'],
            icon: 'exclamation-circle',
        } as NotificationType;

        const nextState = notificationSlice.reducer(
            initialState,
            NotificationActions.addNotificationOnce(newNotification),
        );
        expect(nextState.notifications).toEqual(initialState.notifications);
        expect(nextState.notifications).not.toEqual([newNotification]);
    });

    it('should handle removing a notification', () => {
        const initialState = {
            notifications: [
                {
                    id: 1,
                    message: 'message added',
                    colorGradientScheme: ['#FFF', '#CCC', '#333'],
                    icon: 'exclamation-circle',
                } as NotificationType,
            ],
        };

        const nextState = notificationSlice.reducer(
            initialState,
            NotificationActions.removeNotification(1),
        );

        expect(nextState.notifications).toEqual([]);
    });

    it('should handle removing all notifications', () => {
        const initialState = {
            notifications: [
                {
                    id: 1,
                    message: 'message added',
                    colorGradientScheme: ['#FFF', '#CCC', '#333'],
                    icon: 'exclamation-circle',
                } as NotificationType,
            ],
        };

        const nextState = notificationSlice.reducer(
            initialState,
            NotificationActions.clearNotifications(),
        );

        expect(nextState.notifications).toEqual([]);
    });
});
