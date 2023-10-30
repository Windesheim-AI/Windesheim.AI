import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from '../buttons/Button';
import { buttonColorSchemes } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes/routes';

export const TechProviders = () => {
    const navigation = useNavigation();

    const providers = [
        { name: 'Apple', logo: 'apple' },
        { name: 'Amazon', logo: 'amazon' },
        { name: 'Cisco', logo: 'cisco' },
        { name: 'Google', logo: 'google' },
        { name: 'HP', logo: 'hp' },
        { name: 'IBM', logo: 'ibm' },
        { name: 'Intel', logo: 'intel' },
        { name: 'Meta', logo: 'meta' },
        { name: 'Microsoft', logo: 'microsoft' },
        { name: 'Oracle', logo: 'oracle' },
        { name: 'SalesForce', logo: 'salesforce' },
        { name: 'SAP', logo: 'sap' },
    ];

    const navigate = (profider: string) => {
        navigation.navigate(Routes.WindesheimTechRadar, {
            page: profider,
        });
    };

    return (
        <View>
            <Text>TechProviders</Text>
            {providers.map((provider) => (
                <Button
                    key={provider.name}
                    onPress={() => navigate(provider.name)}
                    buttonText={provider.name}
                    icon={provider.logo}
                    colorGradientScheme={buttonColorSchemes.primary}
                />
            ))}
        </View>
    );
};
