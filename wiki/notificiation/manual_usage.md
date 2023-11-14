# Notification Component Documentation

The `Notification` component is a React Native component designed to display notifications with a gradient background and optional icon. The notification is animated to slide up into view, fade in, and then slide back down and fade out after a specified duration.

## Props

-   **id**: `number` - Unique identifier for the notification.
-   **message**: `string` - The message content of the notification.
-   **colorGradientScheme**: `ColorGradientScheme` - An array of three colors representing the gradient background scheme for the notification.
-   **width**: `number` (optional) - The width of the notification. If not provided, it defaults to 97% of the device's window width.
-   **height**: `number` (optional) - The height of the notification. If not provided, it defaults to 60.
-   **icon**: `string` (optional) - The name of the FontAwesome5 icon to be displayed on the left side of the notification.

## Usage

To use this component, you need to pass the required props (`id`, `message`, `colorGradientScheme`) and can optionally provide `width`, `height`, and `icon`.

```jsx
import { Notification } from './path-to-notification-component';

// Example usage
<Notification
    id={1}
    message="This is a notification message."
    colorGradientScheme={['#FFA07A', '#FF6347', '#FF4500']}
    width={300}
    height={80}
    icon="bell"
/>;
```

## Animation

The notification utilizes React Native's `Animated` API for animations. It slides up and fades in when initially displayed, and after a duration of 3 seconds, it fades out and scales down before being removed from the screen.

## Styling

The component is styled using a combination of default styles and dynamic styles based on the provided or default dimensions. The gradient background is created using six `View` components (`bg1` to `bg6`) that rotate at various angles to achieve a visually appealing effect.

The text and icon colors are determined by the color configuration obtained from the `useColorConfig` hook.

## Dependencies

-   `@expo-google-fonts/inter`: Used for loading the 'Inter_500Medium' font.
-   `react-native-vector-icons/FontAwesome5`: Used for displaying icons in the notification.

## Notes

-   Ensure that the `Inter_500Medium` font is loaded successfully before rendering the component. If the font loading fails, the component will not be rendered.

-   The notification is removed automatically after 3 seconds. The removal process involves fading out and scaling down the notification.

-   The notification uses a combination of absolute and relative positioning for proper rendering and animation. The structure involves nested `View` components to achieve the desired visual effects.

Feel free to customize the component's styles and animations based on your specific application requirements.
