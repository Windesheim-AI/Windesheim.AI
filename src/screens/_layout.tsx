import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Background } from '../components/Background';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const styles = StyleSheet.create({
        container: {
            borderRadius: 15,
            flex: 1,
            margin: 20,
            marginTop: 40,
            overflow: 'hidden',
        },
        innerContainer: {
            height: '100%',
        },
    });

    return (
        <>
            <Background />
            <View style={styles.container}>
                <View style={styles.innerContainer}>{children}</View>
            </View>
        </>
    );
};
