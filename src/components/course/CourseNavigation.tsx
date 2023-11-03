import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { TextTranslated } from '../text/TextTranslated';

export function CourseNavigation({
    title,
    subTitle,
}: {
    title: string;
    subTitle: string;
}) {
    const colors = useColorConfig();
    const fonts = useFonts();
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
        },
        icon: {
            marginRight: 10,
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
    });

    return (
        <View style={styles.x}>
            <View style={styles.topBar}>
                <View>
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
                    onPress={() => setShowDropdown(!showDropdown)}
                />
            </View>

            {showDropdown ? (
                <View style={styles.courseDropdown}>
                    <TextTranslated text="Course Content" />
                </View>
            ) : null}
        </View>
    );
}
