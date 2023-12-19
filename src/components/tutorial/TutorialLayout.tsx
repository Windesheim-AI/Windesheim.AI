import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../lib/constants/Colors';
type TutorialLayoutProps = {
    children: React.ReactNode;
};

export const TutorialLayout = ({ children }: TutorialLayoutProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.bg3,
        },
    });

    return (
        <View style={styles.container}>
            <View>{children}</View>
        </View>
    );
};

export default TutorialLayout;
