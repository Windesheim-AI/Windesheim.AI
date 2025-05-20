import React from 'react';
import { Pressable, StyleSheet, Image, ImageStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SettingsIcon from '../../../assets/images/Icon/settings_icon.png';
import { useColorConfig, useCurrentTheme } from '../../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../../lib/haptic/Hooks';
import { Routes } from '../../../routes/routes';

export type SettingsButtonProps = {
  style?: ImageStyle;
};

export const SettingsButton = ({ style }: SettingsButtonProps) => {
  const colors = useColorConfig();
  const navigation = useNavigation();
  const currentTheme = useCurrentTheme();

  const handlePress = () => {
    HapticFeedback(HapticForces.Light);
    navigation.navigate(Routes.Settings as never);
  };

  const iconStyle: ImageStyle = {
    width: 37,
    height: 37,
    tintColor: currentTheme === 'dark' ? '#FFFFFF' : undefined,
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
      testID="SettingsButton"
      style={[styles.buttonContainer, style]}
      onPress={handlePress}
    >
      <Image source={SettingsIcon} style={iconStyle} />
    </Pressable>
  );
};
