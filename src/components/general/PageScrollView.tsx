import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WhScrollView } from './WhScrollView';
import { useColorConfig } from '../../constants/Colors';

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
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            padding: 20,
        },
        header: {
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