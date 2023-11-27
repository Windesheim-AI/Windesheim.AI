import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { useColorConfig } from '../../../constants/Colors';
import { useAppDispatch } from '../../../redux/Hooks';
import { navigationActions } from '../../../redux/slices/NavigationSlice';

type WhScrollViewProps = {
    children: React.ReactNode;
};

const scrollHideShowThreshold = 50;
const topThreshold = 50;

export const WhScrollView = ({ children }: WhScrollViewProps) => {
    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();

    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastShownNavBar, setLastShownNavBar] = useState(0);
    const [lastHiddenNavBar, setLastHiddenNavBar] = useState(0);

    const [showNav, setShowNav] = useState(true);

    /* istanbul ignore next */
    const setNavState = (show: boolean) => {
        storeDispatcher(navigationActions.showNavBar(show));
        setShowNav(show);
    };

    /* istanbul ignore next */
    const handleScroll = (event: {
        nativeEvent: {
            contentSize: { height: number };
            contentOffset: { y: number };
        };
    }) => {
        const position = event.nativeEvent.contentOffset.y;
        const screenHeight = Dimensions.get('window').height;
        const maxScroll = event.nativeEvent.contentSize.height - screenHeight;

        //if scrolling dow
        if (position > scrollPosition) {
            if (
                showNav &&
                position > lastShownNavBar + scrollHideShowThreshold
            ) {
                setNavState(false);
            }
            setLastHiddenNavBar(position);
        } else if (position < scrollPosition) {
            if (
                !showNav &&
                position < lastHiddenNavBar - scrollHideShowThreshold
            ) {
                setNavState(true);
            }
            setLastShownNavBar(position);
        }

        // if at the top of the page or at the bottom
        if (position < topThreshold) {
            setNavState(true);
            setLastHiddenNavBar(0);
            setLastShownNavBar(0);
        } else if (position > maxScroll) {
            setNavState(false);
            setLastHiddenNavBar(maxScroll);
            setLastShownNavBar(maxScroll);
        }

        setScrollPosition(position);
    };
    const styles = StyleSheet.create({
        container: {
            minHeight: '100%',
            backgroundColor: colors.background,
        },
    });

    //on firs load, show nav bar
    useEffect(() => {
        storeDispatcher(navigationActions.showNavBar(true));
        setShowNav(true);
    }, [storeDispatcher]);

    return (
        <ScrollView
            style={styles.container}
            scrollEventThrottle={100}
            testID="custom-scroll-view"
            onScroll={handleScroll}
        >
            {children}
        </ScrollView>
    );
};
