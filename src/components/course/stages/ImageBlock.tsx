import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import BlockWrapper from './block';
import { ImageOptions } from '../../../types/CourseStageBlock';

export function ImageBlock({ options }: { options: ImageOptions }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            flex: 1,
            resizeMode: 'contain',
            height: 300,
        },
    });

    return (
        <BlockWrapper style={styles.container}>
            <View style={styles.container}>
                <Image
                    source={{ uri: options.imageURL }}
                    style={styles.image}
                />
            </View>
        </BlockWrapper>
    );
}
