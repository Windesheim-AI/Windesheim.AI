import React, { useState } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';

import BlockWrapper from './block';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { ImageOptions } from '../../../types/CourseStageBlock';
import { InteractiveView } from '../../general/views/InteractiveView';

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
            <InteractiveView onPress={onPress}>
                <Image
                    style={styles.image}
                    source={{
                        uri: options.imageURL,
                    }}
                />
            </InteractiveView>
            {Platform.OS !== 'web' ? (
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
            ) : null}
        </BlockWrapper>
    );
}
