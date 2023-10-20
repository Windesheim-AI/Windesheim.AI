import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { useAppDispatch } from '../../redux/Hooks';

type WhScrollViewProps = {
    children: React.ReactNode;
};

const scrollHideShowThreshold = 50;
const topThreshold = 50;
const bottomThreshold = 300;

export const WhScrollView = ({ children }: WhScrollViewProps) => {
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

        const maxScroll =
            event.nativeEvent.contentSize.height - bottomThreshold;

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
