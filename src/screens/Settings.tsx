import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import arrowLeft from '../assets/images/Icon/go_back_arrow.png';
import { SettingCard } from '../components/general/card/SettingCard';
import { ThemeSwitcher } from '../components/settings/ThemeSwitcher';
import { LanguageSwitcher } from '../components/settings/LanguageSwitcher';
import { FontSwitcher } from '../components/settings/FontSwitcher';
import { AnimationToggle } from '../components/settings/AnimationToggle';
import { HighContrastSwitcher } from '../components/settings/HighContrastSwitcher';
import { EditBackgroundInformationButton } from '../components/BackgroundCollect/EditBackgroundInformationButton';
import { TutorialRedoButton } from '../components/tutorial/TutorialRedoButton';
import { PromptsTutorialRedoButton } from '../components/promptsTutorial/PromptsTutorialRedoButton';
import { useCurrentTheme } from '../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../lib/haptic/Hooks';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const currentTheme = useCurrentTheme();

  const goBack = () => {
    HapticFeedback(HapticForces.Light);
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: currentTheme === 'dark' ? '#000' : '#fff',
    },
    header: {
      paddingTop: insets.top + 12,
      paddingBottom: 16,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: currentTheme === 'dark' ? '#000' : '#fff',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: currentTheme === 'dark' ? '#333' : '#ccc',
      zIndex: 999,
    },
    backIcon: {
      width: 36,
      height: 36,
      tintColor: currentTheme === 'dark' ? '#fff' : '#000',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: currentTheme === 'dark' ? '#fff' : '#000',
      flex: 1,
      textAlign: 'center',
      marginRight: 36, // reserve space for back icon
    },
    scroll: {
      padding: 20,
      paddingBottom: 60,
    },
  });

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image source={arrowLeft} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <SettingCard icon="moon" title="Enable dark mode" testID="Theme switcher">
          <ThemeSwitcher />
        </SettingCard>

        <SettingCard icon="language" title="Language" testID="Language switcher">
          <LanguageSwitcher />
        </SettingCard>

        <SettingCard icon="font" title="Font" testID="font switcher">
          <FontSwitcher />
        </SettingCard>

        <SettingCard icon="hand-sparkles" title="Animations" testID="Animation Toggle">
          <AnimationToggle />
        </SettingCard>

        <SettingCard icon="eye" title="Enable high contrast" testID="High contrast mode switcher">
          <HighContrastSwitcher />
        </SettingCard>

        <SettingCard icon="user-edit" title="Background" testID="Background">
          <EditBackgroundInformationButton />
        </SettingCard>

        <SettingCard icon="redo" title="App Tutorial" testID="tutorial reset">
          <TutorialRedoButton />
        </SettingCard>

        <SettingCard icon="redo" title="Prompt Tutorial" testID="tutorial reset">
          <PromptsTutorialRedoButton />
        </SettingCard>
      </ScrollView>
    </View>
  );
};
