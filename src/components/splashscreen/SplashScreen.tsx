/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../redux/Store';
import { hideSplashScreen } from '../../redux/slices/LayoutSlice';

import { Routes } from '../../routes/routes';
import { Background } from '../../components/general/Background';

export const SplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Simulate a delay while loading the app
        setTimeout(() => {
          // Dispatch the action to hide the splash screen and change the state
          dispatch(hideSplashScreen());
          // Navigate to the main app screen
          navigation.navigate(Routes.Home as never);
        }, 3000);
      }, [dispatch, navigation]); // Include dispatch and navigation in the dependencies array
    

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        centerImage: {
          width: 275,
          height: 200,
          resizeMode: 'contain',
        },
        originalSizeImage: {
          width: 200,
          height: 100,
          resizeMode: 'contain',
        },
      });
    
      return (
        <>
          <Background />
          <View style={styles.container}>
            <Image testID='winsight-logo'
              source={require('../../assets/images/WINsight_logo_light.png')}
              style={styles.centerImage}
            />
            <Image testID='windesheim-logo'
              source={require('../../assets/images/windesheim_logo.png')}
              style={styles.originalSizeImage}
            />
          </View>
        </>
      );
};

export default SplashScreen;
