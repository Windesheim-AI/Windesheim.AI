# Redux Slice Documentation: `notifications`

## Overview

The `notifications` slice in Redux manages the state related to notifications within the application. Notifications are messages that provide information or feedback to the user. This slice defines actions to add, remove, and clear notifications.

## State Structure

The initial state of the `notifications` slice consists of an array of `NotificationType` objects.

```typescript
interface NotificationType {
    id: number;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    height?: number;
    icon?: string;
}

interface NotificationSlice {
    notifications: NotificationType[];
}
```

-   `id`: A unique identifier for each notification.
-   `message`: The content of the notification message.
-   `colorGradientScheme`: Specifies the color scheme for the notification.
-   `width` (optional): Width of the notification.
-   `height` (optional): Height of the notification.
-   `icon` (optional): Icon associated with the notification.

## Actions

### `addNotification`

Adds a new notification to the state. If the `id` is not provided, it is automatically generated.

```typescript
NotificationActions.addNotification({
    id: number;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    height?: number;
    icon?: string;
});
```

### `addNotificationOnce`

Adds a notification only if a notification with the same `id` does not already exist in the state.

```typescript
NotificationActions.addNotificationOnce({
    id: number;
    message: string;
    colorGradientScheme: ColorGradientScheme;
    width?: number;
    height?: number;
    icon?: string;
});
```

### `removeNotification`

Removes a notification from the state based on its `id`.

```typescript
NotificationActions.removeNotification(id: number);
```

### `clearNotification`

Clears all notifications from the state.

```typescript
NotificationActions.clearNotification();
```

## Usage

### Example

```typescript
import { useAppDispatch } from '../Hooks';
import {
    NotificationActions,
    useNotificationOnce,
} from 'path/to/notifications';

// ...

const MyComponent = () => {
    const dispatch = useAppDispatch();

    // Add a notification
    dispatch(
        NotificationActions.addNotification({
            id: 1,
            message: 'Notification message',
            colorGradientScheme: stateColorSchemes.primary,
            icon: 'info',
        }),
    );

    // Add a notification once (won't be added if a notification with the same id already exists)
    useNotificationOnce(2, 'Unique Notification', ColorTypes.Success);

    // Remove a notification
    dispatch(NotificationActions.removeNotification(1));

    // Clear all notifications
    dispatch(NotificationActions.clearNotification());

    // ...
};
```

## Custom Hook: `useNotificationOnce`

A custom hook `useNotificationOnce` is provided for convenient usage in functional components. It automatically dispatches the `addNotificationOnce` action based on the specified parameters.

```typescript
useNotificationOnce(id: number, message: string, colorType?: ColorTypes);
```

-   `id`: Unique identifier for the notification.
-   `message`: Content of the notification message.
-   `colorType` (optional): Type of color scheme for the notification. If not provided, the primary color scheme is used.

This hook uses the `useEffect` hook to automatically dispatch the action when the component mounts.

**Example:**

```typescript
useNotificationOnce(1, 'This is a one-time notification', ColorTypes.Warning);
```

---

_Note: Make sure to import necessary types and constants (`ColorGradientScheme`, `ColorTypes`, `stateColorSchemes`, `colorIconMapping`, `NotificationType`, etc.) from relevant files and libraries._
