import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WhScrollView } from './WhScrollView';
import { useColorConfig } from '../../constants/Colors';
import { RootState, useAppSelector } from '../../redux/Store';

type PageScrollViewProps = {
    children: React.ReactNode;
    title: string;
    description?: string;
};

export const PageScrollView = ({
    children,
    title,
    description,
}: PageScrollViewProps) => {
    const themeState = useAppSelector((state: RootState) => state.theme);
    const colors = useColorConfig(themeState.theme);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        header: {
            color: colors.titleDefault,
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        description: {
            color: colors.descriptionDefault,
            fontSize: 16,
            textAlign: 'center',
        },
    });

    return (
        <WhScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>{title}</Text>
                {description ? (
                    <Text style={styles.description}>{description}</Text>
                ) : null}

                {children}
            </View>
        </WhScrollView>
    );
};
