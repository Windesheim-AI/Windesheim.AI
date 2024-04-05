import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { shadow, useColorConfig } from '../../lib/constants/Colors';
import { HapticFeedback, HapticForces } from '../../lib/haptic/Hooks';
import { useAppSelector } from '../../lib/redux/Hooks';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { navigationBarLinks } from '../../routes/navigation';

export const NavBar = () => {
    const navigation = useNavigation();
    const colors = useColorConfig();

    const navigationState = useAppSelector((state) => state.navigation);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: colors.navBar.backgroundColor,
            height: 50,
            zIndex: 1,
            left: 0,
            right: 0,
            padding: 0,
            paddingHorizontal: 20,
        },
        itemContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            paddingVertical: 10,
        },
        itemSelectedContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            paddingVertical: 10,
            ...shadow,
            backgroundColor: colors.navBar.activeItemBackgroundColor,
            elevation: 0,
        },
    });

    function isRouteActive(route: string) {
        return navigationState.selectedNavBarRoute === route;
    }

    return (
        <View style={styles.container}>
            {navigationBarLinks.map((link, index) => {
                const routeActive = isRouteActive(link.route);

                return (
                    <Pressable
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        onPress={() => {
                            HapticFeedback(HapticForces.Light);
                            navigation.navigate(link.route);
                        }}
                        style={
                            routeActive
                                ? styles.itemSelectedContainer
                                : styles.itemContainer
                        }
                        testID={link.route + '-navbar-button'}
                    >
                        <FontAwesome5
                            color={
                                routeActive
                                    ? colors.navBar.activeColor
                                    : colors.navBar.color
                            }
                            name={link.icon}
                            size={20}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
};
