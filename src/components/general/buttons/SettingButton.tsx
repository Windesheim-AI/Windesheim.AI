import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { useNavigation } from '../../../lib/utility/navigation/useNavigation';
import { truncate } from '../../../lib/utility/stringutils';
import { TextTranslated } from '../text/TextTranslated';

export type SettingButtonProps = {
    onPress?: () => void;
    title: string;
    description: string;
    icon: string;
    screenName?: string;
};

export const SettingButton = ({
    title,
    description,
    onPress,
    icon,
    screenName,
}: SettingButtonProps) => {
    const colors = useColorConfig();
    const navigation = useNavigation();
    const fonts = useFonts();

    if (!onPress) {
        /* istanbul ignore next */
        if (!screenName) {
            throw new Error(
                'SettingButton requires either onPress or screenName to be defined',
            );
        }

        /* istanbul ignore next */
        onPress = () => {
            navigation.navigate(screenName);
        };
    }

    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: colors.gray,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginBottom: 20,
        },
        iconContainer: {
            marginRight: 10,
        },
        icon: {
            ...fonts.icon,
            color: colors.text,
        },
        titleContainer: {
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        title: {
            ...fonts.button,
            marginBottom: 5,
            color: colors.text,
        },
        description: {
            ...fonts.description,
        },
        arrowContainer: {
            justifyContent: 'center',
        },
        arrow: {
            width: 20,
            height: 20,
            color: colors.text,
        },
    });
    return (
        <Pressable
            testID={title}
            style={styles.buttonContainer}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <FontAwesome5 style={styles.icon} name={icon} size={24} />
            </View>
            <View style={styles.titleContainer}>
                <TextTranslated style={styles.title} text={title} />
                <TextTranslated
                    style={styles.description}
                    text={truncate(description, 50)}
                />
            </View>
            <View style={styles.arrowContainer}>
                <FontAwesome5
                    style={styles.arrow}
                    name="chevron-right"
                    size={24}
                />
            </View>
        </Pressable>
    );
};
