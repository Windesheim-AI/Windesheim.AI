import { Audio, ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Button, StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import BlockWrapper from './block';
import { shadow } from '../../../lib/constants/Colors';
import { VideoOptions } from '../../../types/CourseStageBlock';

export function VideoBlock({ options }: { options: VideoOptions }) {
    const windowDimensions = useWindowDimensions();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            ...shadow,
        },
        video: {
            aspectRatio: 16 / 9, // Assuming a 16:9 aspect ratio
            width: '100%', // Make the video width stretch to the container width
            maxHeight: '100%', // Optional: if you want to set a max height
        },
        ytContainer: {
            borderRadius: 10,
        },
    });

    // enable ios audio when in silent mode
    // eslint-disable-next-line no-void
    void Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
    });

    // get the YT id from the url if it's a YT url
    const getYTId = (url: string) => {
        const regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
        const match = url.match(regex);
        return match && match[1].length === 11 ? match[1] : false;
    };

    return (
        <BlockWrapper style={styles.container}>
            {!options.videoURL.includes('youtube' || 'yt') ? (
                <>
                    <Video
                        style={styles.video}
                        ref={video}
                        source={{
                            uri: options.videoURL,
                        }}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        onPlaybackStatusUpdate={(newStatus) =>
                            setStatus(() => newStatus)
                        }
                    />
                    <Button
                        //@ts-ignore
                        title={status.isPlaying ? 'Pause' : 'Play'}
                        onPress={() => {
                            //@ts-ignore
                            if (status.isPlaying) {
                                //@ts-ignore
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                                video.current.pauseAsync();
                                return;
                            }

                            //@ts-ignore
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                            video.current.playAsync();
                        }}
                    />
                </>
            ) : (
                <YoutubePlayer
                    webViewStyle={styles.ytContainer}
                    height={windowDimensions.height / 4.3}
                    width={windowDimensions.width - 40}
                    videoId={getYTId(options.videoURL) || ''}
                />
            )}
        </BlockWrapper>
    );
}
