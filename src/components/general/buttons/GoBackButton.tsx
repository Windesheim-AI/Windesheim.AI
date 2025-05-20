import React from 'react';
import { Pressable, StyleSheet, TextStyle } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { useColorConfig } from '../../../lib/constants/Colors';
import { useFonts } from '../../../lib/constants/Fonts';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';

export type GoBackButtonProps = {
  onPress?: () => void;
  style?: TextStyle;
};

export const GoBackButton = ({ onPress, style }: GoBackButtonProps) => {
  const colors = useColorConfig();
  const fonts = useFonts();
  const navigation = useNavigation();

  const handlePress = () => {
    HapticFeedback(HapticForces.Light);
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('Home' as never);
    }
  };

  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <Pressable
      testID="GoBackButton"
      style={[styles.buttonContainer, style]}
      onPress={handlePress}
    >
      <FontAwesome5 name="arrow-left" size={20} color={colors.text} />
    </Pressable>
  );
};
