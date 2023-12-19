import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Bar } from 'react-native-progress';

import { useColorConfig } from '../../../lib/constants/Colors';

export type ProgressBarProps = {
    width?: number;
    height?: number;
    progress?: number;
    testId?: string;
};

const ProgressBar = ({
    width,
    height,
    progress = 0.5,
    testId,
}: ProgressBarProps) => {
    const colors = useColorConfig();
    const windowDimensions = useWindowDimensions();
    const styles = StyleSheet.create({
        progressBar: {},
    });
    const barWidth =
        width === undefined || width === null
            ? windowDimensions.width * 0.8
            : windowDimensions.width * width;
    return (
        <Bar
            style={styles.progressBar}
            borderRadius={10}
            color={colors.bg3}
            unfilledColor={colors.listItemBg}
            width={barWidth}
            height={height}
            progress={progress}
            testID={testId}
        />
    );
};

export default ProgressBar;
