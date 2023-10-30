/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

//@ts-ignore
import Amazon from '../../assets/images/WTR/TechProviders/amazon.svg';
//@ts-ignore
import Apple from '../../assets/images/WTR/TechProviders/apple.svg';
//@ts-ignore
import Cisco from '../../assets/images/WTR/TechProviders/cisco.svg';
//@ts-ignore
import Google from '../../assets/images/WTR/TechProviders/google.svg';
//@ts-ignore
import Hp from '../../assets/images/WTR/TechProviders/hp.svg';
//@ts-ignore
import Ibm from '../../assets/images/WTR/TechProviders/ibm.svg';
//@ts-ignore
import Intel from '../../assets/images/WTR/TechProviders/intel.svg';
//@ts-ignore
import Meta from '../../assets/images/WTR/TechProviders/meta.svg';
//@ts-ignore
import Microsoft from '../../assets/images/WTR/TechProviders/microsoft.svg';
//@ts-ignore
import Oracle from '../../assets/images/WTR/TechProviders/oracle.svg';
//@ts-ignore
import SalesForce from '../../assets/images/WTR/TechProviders/salesforce.svg';
//@ts-ignore
import Sap from '../../assets/images/WTR/TechProviders/sap.svg';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';
import { TextTranslated } from '../text/TextTranslated';

export const TechProviders = () => {
    const navigation = useNavigation();
    const colors = useColorConfig();

    const providers = [
        { name: 'Apple', logo: Apple },
        { name: 'Amazon', logo: Amazon },
        { name: 'Cisco', logo: Cisco },
        { name: 'Google', logo: Google },
        { name: 'HP', logo: Hp },
        { name: 'IBM', logo: Ibm },
        { name: 'Intel', logo: Intel },
        { name: 'Meta', logo: Meta },
        { name: 'Microsoft', logo: Microsoft },
        { name: 'Oracle', logo: Oracle },
        { name: 'SalesForce', logo: SalesForce },
        { name: 'SAP', logo: Sap },
    ];

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
        },
        text: {
            color: colors.text,
            fontSize: 18,
            fontWeight: 'bold',
            left: 50,
            position: 'absolute',
        },
        nav_button: {
            position: 'absolute',
            right: 10,
        },
        heading: {
            color: colors.text,
            fontSize: 24,
            fontWeight: 'bold',
            margin: 10,
        },
        container: {
            backgroundColor: colors.background,
            maxHeight: 200,
        },
    });

    const navigate = (provider: string) => () => {
        if (provider === 'Amazon') provider = 'AWS';
        //@ts-ignore
        navigation.navigate(Routes.WindesheimTechRadar, {
            page: provider,
        });
    };

    return (
        <View>
            <Text style={styles.heading}>
                <TextTranslated text="Tech Providers" />
            </Text>
            <ScrollView style={styles.container}>
                {providers.map((provider) => (
                    <Pressable
                        style={styles.button}
                        onPress={navigate(provider.name)}
                        key={provider.name}
                    >
                        {Platform.OS !== 'web' ? (
                            <provider.logo
                                width="24"
                                height="24"
                                fill={colors.text}
                            />
                        ) : null}
                        <Text style={styles.text}>{provider.name}</Text>
                        {/* at the end of the button place a arrow */}
                        <FontAwesome5Icon
                            name="arrow-right"
                            size={24}
                            color={colors.text}
                            style={styles.nav_button}
                        />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};
