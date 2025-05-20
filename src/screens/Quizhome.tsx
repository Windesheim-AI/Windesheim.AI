import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable'; // ✅ Add Animatable

import { NavBar } from '../components/navigation/Navbar';
import { SettingsButton } from '../components/general/buttons/SettingButton';
import { useColorConfig, useCurrentTheme } from '../lib/constants/Colors';

type RootStackParamList = {
  Quizhome: undefined;
  Quizzes: { quizId: number };
};

type QuizhomeNavigationProp = StackNavigationProp<RootStackParamList, 'Quizhome'>;

const screenWidth = Dimensions.get('window').width;

const Quizhome: React.FC = () => {
  const navigation = useNavigation<QuizhomeNavigationProp>();
  const colors = useColorConfig();
  const currentTheme = useCurrentTheme();
  const logoTextColor = currentTheme === 'dark' ? '#FFFFFF' : 'black';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: '#e5e5e5',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    logo: {
      width: 37,
      height: 37,
      resizeMode: 'contain',
    },
    logoText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
      color: logoTextColor,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20,
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: '#555',
      marginBottom: 32,
      maxWidth: 400,
    },
    button: {
      backgroundColor: '#ffcb05',
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 18,
    },
    navBarContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Icon/favicon.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>WINDESHEIM.AI</Text>
        </View>
        <SettingsButton />
      </View>

      <View style={styles.content}>
        <Animatable.Text
          animation="fadeInUp"
          duration={600}
          delay={100}
          style={styles.title}
        >
          AI startbekwaam test
        </Animatable.Text>

        <Animatable.Text
          animation="fadeInUp"
          duration={600}
          delay={200}
          style={styles.subtitle}
        >
          Deze test bestaat uit meerkeuzevragen. Je hebt 13 minuten om de test af te ronden.
        </Animatable.Text>

        <Animatable.View
          animation="fadeInUp"
          duration={600}
          delay={300}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Quizzes', { quizId: 2 })}
          >
            <Text style={styles.buttonText}>Start de test</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <View style={styles.navBarContainer}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

export default Quizhome;
