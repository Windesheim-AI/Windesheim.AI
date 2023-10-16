import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useColorConfig } from '../constants/Colors';
import { RootState } from '../redux/Store';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';
import { NavigationSlice } from '../redux/NavigationSlice';
import * as Animatable from 'react-native-animatable';

export const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(true);

    const navigation = useAppSelector(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        (state: RootState) => state.navigation,
    ) as NavigationSlice;
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 50,
            height: 50,
            justifyContent: 'center',
            marginBottom: 10,
            position: 'absolute',
            bottom: 0,
            width: '90%',
            zIndex: 1,
        },
    });

    const containerStyle = {
        ...styles.container,
        backgroundColor: colors.navBar,

    };

    useEffect(() => {
        setShowNavBar(navigation.showNavBar);
    }, [navigation]);

    return (
        <Animatable.View
            animation={showNavBar ? 'slideInUp' : 'slideOutDown'}
            duration={200} // Adjust the duration as needed
            style={containerStyle}
        >
            <View style={styles.container}>
                <Text>NavBar</Text>
            </View>
        </Animatable.View>
    );
};
