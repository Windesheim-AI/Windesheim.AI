import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';

import BlockWrapper from './block';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { ImageOptions } from '../../../types/CourseStageBlock';
import { IntractableView } from '../../general/views/InteractableView';

export function ImageBlock({ options }: { options: ImageOptions }) {
    const [visible, setVisible] = useState(false);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            height: 200,
        },
    });

    function onPress() {
        HapticFeedback(HapticForces.Light);
        setVisible(true);
    }

    return (
        <BlockWrapper style={styles.container}>
            <IntractableView onPress={onPress}>
                <Image
                    style={styles.image}
                    source={{
                        uri: options.imageURL,
                    }}
                />
            </IntractableView>
            <ImageView
                images={[
                    {
                        uri: options.imageURL,
                    },
                ]}
                imageIndex={0}
                visible={visible}
                swipeToCloseEnabled
                doubleTapToZoomEnabled
                onRequestClose={() => setVisible(false)}
            />
        </BlockWrapper>
    );
}
