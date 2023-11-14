import { NotificationType } from '../../../../src/components/alerts/Notification';
import {
    NotificationActions,
    notificationSlice,
} from '../../../../src/redux/slices/NotificationSlice';

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
});
