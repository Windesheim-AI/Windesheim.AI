//Editbutton within "My background information"
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { shadow, useColorConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import { TextTranslated } from '../general/text/TextTranslated';

interface EditButtonProps {
    onPressEdit: () => void;
    isEditing: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({
    onPressEdit,
    isEditing,
}) => {
    const [editMode, setEditMode] = useState(isEditing);

    const handlePress = () => {
        setEditMode(!editMode);
        onPressEdit();
    };

    const colors = useColorConfig();
    const fonts = useFonts();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: editMode ? colors.warning : colors.bg3,
            padding: 10,
            borderRadius: 5,
            ...shadow,
        },
        buttonText: {
            fontSize: 16,
            textAlign: 'center',
            ...fonts.button,
            color: colors.text,
        },
    });

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>
                <TextTranslated text={editMode ? 'Complete' : 'Edit'} />
            </Text>
        </TouchableOpacity>
    );
};
