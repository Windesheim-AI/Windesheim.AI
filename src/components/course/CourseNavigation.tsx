import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Stage } from '../../types/Stage';
import { TextTranslated } from '../text/TextTranslated';

export function CourseNavigation({
    title,
    subTitle,
    courseId,
    currentStageId,
    stages,
}: {
    title: string;
    subTitle: string;
    currentStageId: string;
    courseId: string;
    stages: Stage[];
}) {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();

    const [showDropdown, setShowDropdown] = React.useState(false);

    const styles = StyleSheet.create({
        x: {
            zIndex: 9999,
            flexDirection: 'column',
        },
        topBar: {
            backgroundColor: colors.listItemBg,
            ...shadow,
            padding: 10,
            borderRadius: !showDropdown ? 15 : 0,
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            ...fonts.courseTitle,
            flexDirection: 'row',
            marginBottom: 3,
        },
        icon: {
            marginRight: 10,
            marginBottom: 'auto',
            marginTop: 'auto',
        },
        chevronIcon: {
            marginLeft: 'auto',
            marginRight: 10,
        },
        courseDropdown: {
            backgroundColor: colors.listItemBg,
            ...shadow,
            padding: 20,
            paddingTop: 10,
            borderBottomEndRadius: 15,
            borderBottomStartRadius: 15,
            width: '100%',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            maxHeight: 200, // set a fixed height
            overflow: 'scroll', // enable scrolling
        },
        dropdownText: {
            ...fonts.h4,
            padding: 10,
            borderRadius: 10,
        },
        block: {
            width: '95%',
        },
    });

    function onDropdownPress(stageId: string) {
        //@ts-ignore
        navigation.navigate('Course', { courseId, stageId });
        setShowDropdown(false);
    }

    return (
        <View style={styles.x}>
            <View
                style={styles.topBar}
                onTouchEnd={() => setShowDropdown(!showDropdown)}
            >
                <View style={styles.block}>
                    <View style={styles.title}>
                        <FontAwesome5Icon
                            name="graduation-cap"
                            size={24}
                            style={styles.icon}
                            color={colors.text}
                        />
                        <TextTranslated text={title} />
                    </View>
                    <View style={fonts.courseSubTitle}>
                        <TextTranslated text={subTitle} />
                    </View>
                </View>

                <FontAwesome5Icon
                    name={showDropdown ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    style={styles.chevronIcon}
                    color={colors.text}
                />
            </View>

            {showDropdown ? (
                <View style={styles.courseDropdown}>
                    {stages?.map((stage: Stage) => (
                        <View
                            key={stage.title}
                            style={[
                                styles.dropdownText,
                                stage.id === currentStageId && {
                                    backgroundColor: colors.primary,
                                },
                            ]}
                            onTouchEnd={() => {
                                onDropdownPress(stage.id);
                            }}
                        >
                            <TextTranslated text={stage.title} />
                        </View>
                    ))}
                </View>
            ) : null}
        </View>
    );
}
