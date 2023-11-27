import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import BlockWrapper from './block';
import { VideoOptions } from '../../../types/CourseStageBlock';

export function VideoBlock({ options }: { options: VideoOptions }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    // Moved StyleSheet out of the component so it's not recreated on each render
    const styles = StyleSheet.create({
        container: {
            flex: 1, // You might want to adjust this flex value or set fixed width/height
            justifyContent: 'center',
            alignItems: 'center',
        },
        video: {
            // If you know the aspect ratio of your video, set it here
            aspectRatio: 16 / 9, // Assuming a 16:9 aspect ratio
            width: '100%', // Make the video width stretch to the container width
            maxHeight: '100%', // Optional: if you want to set a max height
            marginBottom: 20,
        },
    });

    return (
        <BlockWrapper style={styles.container}>
            <Video
                style={styles.video}
                ref={video}
                source={{
                    uri: options.videoURL,
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
                onReadyForDisplay={() => {
                    let elements = document.getElementsByTagName('video');
                    for (var i = 0; i < elements.length; i++) {
                        //  position to relative
                        elements[i].style.position = 'relative';
                    }
                }}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                }
            />
        </BlockWrapper>
    );
}
