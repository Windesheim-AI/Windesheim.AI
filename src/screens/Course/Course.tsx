import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

import { Button } from '../../components/buttons/Button';
import AIGeneratedOutput from '../../components/course/AIGeneratedOutput';
import { CourseNavigation } from '../../components/course/CourseNavigation';
import { PageView } from '../../components/general/PageView';
import { TextTranslated } from '../../components/text/TextTranslated';
import {
    buttonColorSchemes,
    shadow,
    useColorConfig,
} from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';

export default function Course() {
    const fonts = useFonts();
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        progressBar: {
            marginTop: 15,
            ...shadow,
            borderColor: colors.listItemBg,
            color: colors.primary,
        },
        courseTitle: {
            ...fonts.h1,
            marginTop: 15,
            marginBottom: 10,
        },
        button: {
            marginTop: 'auto',
        },
    });

    const title = 'Learn, Understand, Verify';
    const subTitle = 'The basics of generative AI';
    const text =
        'This course is an introduction to the basics of generative AI. It is a hands-on course, which means that you will be working with the tools and techniques that are used in the field.';
    return (
        <PageView>
            <CourseNavigation title={title} subTitle={subTitle} />

            <Progress.Bar
                progress={0.03}
                width={null}
                style={styles.progressBar}
            />

            <View style={styles.courseTitle}>
                <TextTranslated text={title} />
            </View>

            <View style={fonts.description}>
                <TextTranslated text={text} />
            </View>

            <AIGeneratedOutput
                prompt="I did this using not ChatGPT"
                text="Absolutely! When planning team-building activities for a group that includes remote employees, it’s essential to choose icebreakers that can be easily shared across digital platforms. Here are a couple of activities designed to engage both in-person and remote participants:"
            />

            <Text>{'Wed'}</Text>

            <View style={styles.button}>
                <Button
                    buttonText="Next"
                    colorGradientScheme={buttonColorSchemes.primary}
                    screenName="ted"
                />
            </View>
        </PageView>
    );
}
