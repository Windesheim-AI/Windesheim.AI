/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Audio, AVPlaybackStatus } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import ForwardButton from '../../assets/images/Icon/forward-button.png';
import PauseButton from '../../assets/images/Icon/pause-button.png';
import PlayButton from '../../assets/images/Icon/play-button.png';
import RewindButton from '../../assets/images/Icon/rewind-button.png';
import StopButton from '../../assets/images/Icon/stop-button.png';

interface AudioPlayerProps {
    audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackPosition, setPlaybackPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        if (sound) {
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            return () => {
                sound.unloadAsync();
            };
        }
    }, [sound]);

    useEffect(() => {
        if (playbackPosition >= duration && duration !== 0) {
            stopSound();
        }
    }, [playbackPosition, duration, stopSound]);

    function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        if (status.isLoaded) {
            setPlaybackPosition(status.positionMillis || 0);
            setDuration(status.durationMillis ?? 0);
        }
    }

    async function playSound() {
        // eslint-disable-next-line no-else/no-else
        if (sound) {
            await sound.setPositionAsync(playbackPosition); // Return to previous position
            await sound.playAsync();
            setIsPlaying(true);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { sound } = await Audio.Sound.createAsync(
                { uri: audioUrl },
                { shouldPlay: true, positionMillis: playbackPosition }, // initiale position
            );
            setSound(sound);
            setIsPlaying(true);
        }
    }

    async function pauseSound() {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    }

    async function rewindSound() {
        if (sound) {
            const newPosition = Math.max(0, playbackPosition - 10000); // Go back 10 seconds
            await sound.setPositionAsync(newPosition);
        }
    }

    async function forwardSound() {
        if (sound) {
            const newPosition = playbackPosition + 10000; // Skip 10 seconds
            // eslint-disable-next-line no-else/no-else
            if (newPosition < duration) {
                await sound.setPositionAsync(newPosition);
            } else {
                await sound.stopAsync();
                setIsPlaying(false);
            }
        }
    }

    function formatTime(time: number): string {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds, 10) < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.timecode}>
                {formatTime(playbackPosition)}/{formatTime(duration)}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={rewindSound}>
                    <Image source={RewindButton} style={styles.Smallbutton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
                    <Image
                        source={isPlaying ? PauseButton : PlayButton}
                        style={[styles.MainButton, styles.MainButton]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={stopSound}>
                    <Image source={StopButton} style={styles.MainButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={forwardSound}>
                    <Image source={ForwardButton} style={styles.Smallbutton} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    timecode: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    Smallbutton: {
        width: 50,
        height: 50,
        marginHorizontal: 15,
    },
    MainButton: {
        width: 70,
        height: 70,
        marginHorizontal: 10,
    },
});
