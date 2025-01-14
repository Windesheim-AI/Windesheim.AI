import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistentStorageWrite = async (
    key: string,
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => void = () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: (e: unknown) => void = () => {},
) => {
    console.log('persistentStorageWrite', key, value);

    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        onError(e);

        return;
    }

    onSuccess();
};

export const persistentStorageRead = async (
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: (value: string | null) => void = () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onError: (e: unknown) => void = () => {},
) => {
    console.log('persistentStorageRead', key);

    let value: string | null;

    try {
        value = await AsyncStorage.getItem(key);
    } catch (e) {
        onError(e);

        return;
    }

    onSuccess(value);
};
