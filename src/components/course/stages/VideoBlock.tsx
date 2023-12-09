import { Audio, ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

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
            marginBottom: 20,
        },
        video: {
            // If you know the aspect ratio of your video, set it here
            aspectRatio: 16 / 9, // Assuming a 16:9 aspect ratio
            width: '100%', // Make the video width stretch to the container width
            maxHeight: '100%', // Optional: if you want to set a max height
        },
        ytContainer: {
            marginRight: 10,
            marginLeft: 10,
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
                <View style={styles.ytContainer}>
                    <YoutubePlayer
                        height={Dimensions.get('window').height / 3}
                        width={Dimensions.get('window').width - 90}
                        videoId={getYTId(options.videoURL) || ''}
                    />
                </View>
            )}
        </BlockWrapper>
    );
}
