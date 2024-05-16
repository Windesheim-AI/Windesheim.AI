import React from 'react';
import { Image, StyleSheet } from 'react-native';

import BlockWrapper from './block';
import { shadow } from '../../../lib/constants/Colors';
import { ImageOptions } from '../../../types/CourseStageBlock';
export function ImageBlock({ options }: { options: ImageOptions }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            height: 200,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            ...shadow,
        },
    });

    return (
        <BlockWrapper style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: options.imageURL,
                }}
            />
        </BlockWrapper>
    );
}
