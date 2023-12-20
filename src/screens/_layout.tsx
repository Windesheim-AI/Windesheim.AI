import React, { useEffect } from 'react';
import {
    Animated,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';

import BackgroundCollectForm from './UserBackground/BackgroundCollectForm';
import { NotificationList } from '../components/general/alerts/NotificationList';
import { Background } from '../components/general/background/Background';
import { NavBar } from '../components/navigation/Navbar';
import { Tutorial } from '../components/tutorial/Tutorial';
import { useColorConfig, shadow } from '../lib/constants/Colors';
import { useAppSelector } from '../lib/redux/Hooks';
import { useAnimatedValue } from '../lib/utility/animate';
import Snowfall from 'react-snowfall';

//@ts-ignore
import SapLogo from '../assets/images/WTR/TechProviders/sap.png';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const navigation = useAppSelector((state) => state.navigation);
    const colors = useColorConfig();

    const styles = StyleSheet.create({
        contentContainer: {
            borderRadius: 15,
            flex: 1,
            margin: 10,
            overflow: 'hidden',
            ...shadow,
        },
        innerContainer: {
            backgroundColor: colors.background,
            height: '100%',
        },
        pos_r: {
            position: 'relative',
            marginTop: navigation.showNavBar ? 50 : 0,
        },
        wrapper: {
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
    });
    //25-28 decemer
    const isChristmas = () => {
        const date = new Date();
        const month = date.getMonth();
        const day = date.getDate();

        return month === 11 && day >= 20 && day <= 28;
    }

    const isFirstTimeUser = useAppSelector(
        (state) => state.backgroundInformation,
    ).isFirstTimeUser;

    const [marginBottomAnimation, animateMarginBottomAnimation] =
        useAnimatedValue(20);

    useEffect(() => {
        animateMarginBottomAnimation(navigation.showNavBar ? 70 : 10, 200);
    }, [animateMarginBottomAnimation, navigation]);

    const rob = document.createElement('img');
    rob.src = 'https://www.windesheim.tech/wp-content/uploads/2023/12/Rob.png'

    const wim = document.createElement('img');
    wim.src = 'https://www.windesheim.tech/wp-content/uploads/2022/06/image-6.png'

    const bertand = document.createElement('img');
    bertand.src = 'https://www.windesheim.tech/wp-content/uploads/2022/06/1516180868356.jpeg'

    const bigJan = document.createElement('img');
    bigJan.src = 'https://www.windesheim.tech/wp-content/uploads/2022/06/image-4.png'




    return (
        <>
            <Snowfall
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1000,
                }}
                wind={[1, 2]}
                radius={[50, 75]}
                rotationSpeed={[0.1, 0.5]}
                changeFrequency={150}
                images={[rob]} />
            <Background />
            <SafeAreaView style={styles.wrapper}>
                <NotificationList />
                <Animated.View // Use Animated.View here
                    style={{
                        ...styles.contentContainer,
                        marginBottom: marginBottomAnimation,
                    }}
                >
                    {isFirstTimeUser ? <BackgroundCollectForm /> : null}
                    {!isFirstTimeUser ? (
                        <>
                            <View style={styles.innerContainer}>
                                {children}
                            </View>
                            <Tutorial />
                        </>
                    ) : null}
                </Animated.View>
                <View style={styles.pos_r}>
                    <NavBar />
                </View>
            </SafeAreaView>
        </>
    );
};
