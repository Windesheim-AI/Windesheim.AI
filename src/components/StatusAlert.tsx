import React from 'react';
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ColorGradientScheme, buttonColorSchemes, colorMap, useColorConfig } from '../constants/Colors';

interface StatusAlertProps {
  message: string;
  type: 'success' | 'error'; // You can add more types as needed
  icon? : string;
}

export function StatusAlert({ message, type, icon }: StatusAlertProps) {
  const alertStyles = type === 'success' ? styles.successAlert : styles.errorAlert;

  return (
    <View style={[styles.statusAlert, alertStyles]}>
      <View style={styles.stripes}>
        <View
          style={[
            styles.stripe,
            {
              backgroundColor: type === 'success' ? colorMap.light.bg3 : colorMap.light.bg2,
            },
          ]}
        />
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>!</Text>
        </View>
        <Text style={[styles.message, { color: colorMap.light.text }]}>{message}</Text>
        <View
          style={[
            styles.stripe,
            {
              backgroundColor: type === 'success' ? colorMap.light.bg3 : colorMap.light.bg2,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusAlert: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'white', // Default background color
    zIndex: 999,
  },
  stripes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stripe: {
    height: '100%',
    width: 4,
  },
  iconContainer: {
    backgroundColor: 'black',
    borderRadius: 50,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
    color: 'white', // Icon color
  },
  message: {
    flex: 1,
    fontSize: 16,
    // Use textStyles.color for text color
  },
  successAlert: {
    backgroundColor: '#f2f2f2', // Use the defined success background color
  },
  errorAlert: {
    backgroundColor: '#f2f2f2', // Use the defined error background color
  },
});

export default StatusAlert;
