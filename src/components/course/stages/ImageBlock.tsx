import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import BlockWrapper from './block';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { ImageOptions } from '../../../types/CourseStageBlock';
import { InteractiveView } from '../../general/views/InteractiveView';

// Import ImageView only on mobile
let ImageView: any;
if (process.env.TARGET === 'mobile') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
    ImageView = require('react-native-image-zoom-viewer').default;
}

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
            {ImageView ? (
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
