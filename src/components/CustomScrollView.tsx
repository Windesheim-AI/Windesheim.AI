import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { useAppDispatch } from '../redux/Hooks';

type CustomScrollViewProps = {
    children: React.ReactNode;
};

export const CustomScrollView = ({ children }: CustomScrollViewProps) => {
    const dispatch = useAppDispatch();

    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastShownNavBar, setLastShownNavBar] = useState(0);
    const [lastHiddenNavBar, setLastHiddenNavBar] = useState(0);
    const [showNav, setShowNav] = useState(true);

    const setNavState = (show: boolean) => {
        dispatch({
            type: 'navigation/showNavBar',
            payload: show,
        });
        setShowNav(show);
    };

    const handleScroll = (event: {
        nativeEvent: {
            contentSize: { height: number };
            contentOffset: { y: number };
        };
    }) => {
        const position = event.nativeEvent.contentOffset.y;

        //if scrolling dow
        if (position > scrollPosition) {
            if (showNav && position > lastShownNavBar + 50) {
                setNavState(false);
            }
            setLastHiddenNavBar(position);
        } else if (position < scrollPosition) {
            // Scrolling up
            if (!showNav && position < lastHiddenNavBar - 50) {
                setNavState(true);
            }
            setLastShownNavBar(position);
        }

        // if at the top of the page
        if (position < 10) {
            setNavState(true);
            setLastHiddenNavBar(0);
            setLastShownNavBar(0);
        }

        const maxScroll = event.nativeEvent.contentSize.height - 1000;

        // if at the bottom of the page hide nav bar
        if (position > maxScroll - 10) {
            setNavState(false);
            setLastHiddenNavBar(maxScroll);
            setLastShownNavBar(maxScroll);
        }

        setScrollPosition(position);
    };

    //on firs load, show nav bar
    useEffect(() => {
        dispatch({
            type: 'navigation/showNavBar',
            payload: true,
        });
        setShowNav(true);
    }, [dispatch]);

    return (
        <ScrollView
            scrollEventThrottle={100}
            testID="custom-scroll-view"
            onScroll={handleScroll}
        >
            {children}
        </ScrollView>
    );
};
