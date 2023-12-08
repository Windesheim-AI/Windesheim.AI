import React, { useEffect, useState } from 'react';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { TechProvider, techProviderItems } from './TechProviderItems';
import {
    useColorConfig,
    useColorStateConfig,
} from '../../lib/constants/Colors';
import { useFonts } from '../../lib/constants/Fonts';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../general/text/TextTranslated';
import { TitleWithSeeAll } from '../general/text/TitleWithSeeAll';

export const TechProviders = ({ limit }: { limit?: number }) => {
    const navigation = useNavigation();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const [displayItems, setDisplayItems] = useState<TechProvider[]>([]);
    const isLimited = limit && limit > 0;

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            borderRadius: 40,
            flexDirection: 'row',
            margin: 10,
            marginTop: 0,
            padding: Platform.OS !== 'web' ? 10 : 20,
            maxHeight: 90,
            overflow: 'hidden',
            backgroundColor: colors.listItemBg,
            ...colorStateConfig.highContrastBorder,
        },
        itemText: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
            flexWrap: 'wrap',
            left: 50,
            position: 'absolute',
            ...fonts.description,
        },
        navButton: {
            position: 'absolute',
            right: 10,
        },
        heading: {
            margin: 10,
            ...fonts.h1,
        },
        container: {
            backgroundColor: colors.background,
            maxHeight: limit ? 'auto' : 200,
        },
    });

    const navigate = (provider: string) => () => {
        navigation.navigate(Routes.WindesheimTechRadar, {
            page: provider,
        });
    };

    useEffect(() => {
        let resultItems = [...techProviderItems];
        if (!limit || limit < 1) {
            setDisplayItems(resultItems);
            return;
        }

        //shuffles the array and then slices it to the limit
        resultItems.sort(() => Math.random() - Math.random());
        resultItems = resultItems.slice(0, limit);

        setDisplayItems(resultItems);
    }, [limit]);

    return (
        <View>
            {isLimited ? (
                <TitleWithSeeAll
                    title="Tech Providers"
                    navigateToRoute={Routes.WindesheimTechRadar}
                />
            ) : (
                <TextTranslated style={styles.heading} text="Tech Providers" />
            )}

            <ScrollView style={styles.container}>
                {displayItems.map((provider) => (
                    <Pressable
                        style={styles.button}
                        onPress={navigate(provider.slug)}
                        key={provider.slug}
                        testID={`tech-provider-${provider.slug}-button`}
                    >
                        {Platform.OS !== 'web' ? (
                            <provider.logo
                                width="24"
                                height="24"
                                fill={colors.text}
                            />
                        ) : null}
                        <Text
                            testID="tech-provider-text"
                            style={styles.itemText}
                        >
                            {provider.name}
                        </Text>
                        {/* at the end of the button place an arrow */}
                        <FontAwesome5Icon
                            name="arrow-right"
                            size={24}
                            color={colors.text}
                            style={styles.navButton}
                        />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};
