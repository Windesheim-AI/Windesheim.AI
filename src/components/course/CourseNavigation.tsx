import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { Routes } from '../../routes/routes';
import { Stage } from '../../types/Stage';
import { TextTranslated } from '../general/text/TextTranslated';
import { IntractableView } from '../general/views/IntractableView';

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
        },
        dropdownText: {
            ...fonts.h4,
            padding: 5,
            borderRadius: 10,
        },
        block: {
            width: '95%',
        },
        courseOverview: {
            ...fonts.h4,
            fontWeight: 'bold',
            padding: 5,
            borderBottomColor: colors.listItemBg,
            borderBottomWidth: 1,
        },
    });

    function onDropdownPress(stageId: string) {
        //@ts-ignore
        navigation.navigate(Routes.Stage, { courseId, stageId });
        setShowDropdown(false);
    }

    function onCourseOverviewPress() {
        //@ts-ignore
        navigation.navigate(Routes.StageOverview, { courseId });
        setShowDropdown(false);
    }

    return (
        <View style={styles.x}>
            <IntractableView
                style={styles.topBar}
                onPress={() => setShowDropdown(!showDropdown)}
            >
                <View style={styles.block}>
                    <View style={styles.title}>
                        <FontAwesome5Icon
                            name="graduation-cap"
                            size={24}
                            style={styles.icon}
                            color={colors.text}
                        />
                        <TextTranslated style={styles.title} text={title} />
                    </View>
                    <TextTranslated
                        style={fonts.courseSubTitle}
                        text={subTitle}
                    />
                </View>

                <FontAwesome5Icon
                    name={showDropdown ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    style={styles.chevronIcon}
                    color={colors.text}
                />
            </IntractableView>

            {showDropdown ? (
                <View style={styles.courseDropdown}>
                    {/* course overview button */}
                    <IntractableView
                        style={styles.courseOverview}
                        onPress={onCourseOverviewPress}
                    >
                        <TextTranslated
                            style={styles.courseOverview}
                            text="Course Overview"
                        />
                    </IntractableView>
                    {stages?.map((stage: Stage) => (
                        <IntractableView
                            key={stage.id}
                            style={[
                                styles.dropdownText,
                                stage.id === currentStageId && {
                                    backgroundColor: colors.primary,
                                },
                            ]}
                            onPress={() => {
                                onDropdownPress(stage.id);
                            }}
                        >
                            <TextTranslated
                                style={[
                                    styles.dropdownText,
                                    stage.id === currentStageId && {
                                        color: colors.textLight,
                                    },
                                ]}
                                text={stage.title}
                            />
                        </IntractableView>
                    ))}
                </View>
            ) : null}
        </View>
    );
}
