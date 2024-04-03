import { openBrowserAsync } from 'expo-web-browser';
import { Linking } from 'react-native';

/**
 * Opens a browser popup on the device.
 * @param url The URL to open in the browser.
 */
/* eslint-disable no-void */
export const openBrowserPopup = (url: string) => {
    try {
        void openBrowserAsync(url, { showInRecents: true });
    } catch (e) {
        void Linking.openURL(url);
    }
};
