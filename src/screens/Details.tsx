import * as React from 'react';
import * as react_native_1 from 'react-native';

export const DetailsScreen = () => {
    return React.createElement(
        react_native_1.View,
        { style: styles.container },
        React.createElement(react_native_1.Text, null, 'Hallo tab 2!'),
        React.createElement(react_native_1.StatusBar, { style: 'auto' }),
    );
};

const backgroundColorDefault = '#fff';
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColorDefault,
        flex: 1,
        justifyContent: 'center',
    },
});
