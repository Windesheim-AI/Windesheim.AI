/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Apple from '../../assets/images/WTR/TechProfiders/apple.svg';
import Amazon from '../../assets/images/WTR/TechProfiders/amazon.svg';
import Cisco from '../../assets/images/WTR/TechProfiders/cisco.svg';
import Google from '../../assets/images/WTR/TechProfiders/google.svg';
import Hp from '../../assets/images/WTR/TechProfiders/hp.svg';
import Ibm from '../../assets/images/WTR/TechProfiders/ibm.svg';
import Intel from '../../assets/images/WTR/TechProfiders/intel.svg';
import Meta from '../../assets/images/WTR/TechProfiders/meta.svg';
import Microsoft from '../../assets/images/WTR/TechProfiders/microsoft.svg';
import Oracle from '../../assets/images/WTR/TechProfiders/oracle.svg';
import SaleceForce from '../../assets/images/WTR/TechProfiders/salesforce.svg';
import Sap from '../../assets/images/WTR/TechProfiders/sap.svg';
import { useColorConfig } from '../../constants/Colors';
import { Routes } from '../../routes/routes';

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
        { name: 'SalesForce', logo: SaleceForce },
        { name: 'SAP', logo: Sap },
    ];

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            borderRadius: 40,
            flexDirection: 'row',
            margin: 10,
            marginTop: 0,
            padding: 10,
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

    const navigate = (profider: string) => () => {
        //@ts-ignore
        navigation.navigate(Routes.WindesheimTechRadar, {
            page: profider,
        });
    };

    return (
        <View>
            <Text style={styles.heading}>TechProviders</Text>
            <ScrollView style={styles.container}>
                {providers.map((provider) => (
                    <Pressable
                        style={styles.button}
                        onPress={navigate(provider.name)}
                        key={provider.name}
                    >
                        <provider.logo
                            width="24"
                            height="24"
                            fill={colors.text}
                        />
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
