import * as React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useColorConfig } from '../../constants/Colors';

type HorizontalScrollProps = {
    children: React.ReactNode;
};

export const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
    return <ScrollView horizontal>{children}</ScrollView>;
};

type PageScrollViewProps = {
    children: React.ReactNode;
    title: string;
    description?: string;
};

export const PageScrollView = ({ children, title, description }: PageScrollViewProps) => {
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            padding: 20,
        },
        header: {
            fontSize: 27,
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
        <HorizontalScroll>
            <View style={styles.container}>
                <Text style={styles.header}>{title}</Text>
                {description ? (
                    <Text style={styles.description}>{description}</Text>
                ) : null}

                {children}
            </View>
        </HorizontalScroll>
    );
};
