import { StyleSheet, ViewStyle } from "react-native";
import { shadow, useColorConfig, useColorStateConfig } from "../../../lib/constants/Colors";
import { IntractableView } from "../views/InteractableView";
import { IconLine } from "./IconLine";
import React from "react";
import { TextTranslated } from "../text/TextTranslated";
import { useFonts } from "../../../lib/constants/Fonts";
import { HapticFeedback, HapticForces } from "../../../lib/haptic/Hooks";

type PlainButtonProps = {
    text: string;
    onPress: () => void;
    icon?: string;
    style?: ViewStyle;
    backgroundColor: string;
};

export function PlainButton({
    text,
    onPress,
    icon,
    style,
    backgroundColor,
}: PlainButtonProps) {
    const fonts = useFonts();

    const styles = StyleSheet.create({
        button: {
            backgroundColor,
            borderRadius: 10,
            paddingBottom: 10,
            paddingTop: 10,
            paddingLeft: 16,
            paddingRight: 16,
            marginBottom: 16,
            ...shadow,
        },
    });

    function press() {
        HapticFeedback(HapticForces.Light);
        onPress();
    }

    return (
        <IntractableView style={[style, styles.button]} onPress={press}>
            {icon ? (
                <IconLine iconName={icon} text={text} size={15} />
            ) : (
                <TextTranslated text={text} style={fonts.button} />
            )}
        </IntractableView>
    );
}
