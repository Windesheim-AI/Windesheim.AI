import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Switch } from 'react-native';
import { PageScrollView } from '../../components/general/views/PageScrollView';

import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';

export default function InformationPage() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [company, setCompany] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [location, setLocation] = useState('');

    const navigator = useNavigation();

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted:', { name, phoneNumber, email, company, companySize, location });
        navigator.navigate(Routes.Results.toString());

    };

    return (
        <PageScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>In order to save your data and show you the results, we'll need a little information.</Text>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Show Additional Fields</Text>
                    <Switch
                        value={showAdditionalFields}
                        onValueChange={setShowAdditionalFields}
                    />
                </View>

                {showAdditionalFields && (
                    <>
                        <Text style={styles.label}>Company</Text>
                        <TextInput
                            style={styles.input}
                            value={company}
                            onChangeText={setCompany}
                            placeholder="Enter your company"
                        />

                        <Text style={styles.label}>Company Size</Text>
                        <TextInput
                            style={styles.input}
                            value={companySize}
                            onChangeText={setCompanySize}
                            placeholder="Enter your company size"
                        />

                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.input}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Enter your location"
                        />
                    </>
                )}

                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </PageScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    text: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
});