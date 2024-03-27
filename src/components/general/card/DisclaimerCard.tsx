import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageSourcePropType,
} from 'react-native';

import { useColorConfig } from '../../../lib/constants/Colors';

export const DisclaimerCard = () => {
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        container: {
            marginTop: 100,
            padding: 15,
            backgroundColor: colors.attentionYellow,
            borderRadius: 15,
            borderColor: colors.lightGrey,
            borderWidth: 1,
            /* shadow properties for Android only */
            shadowColor: colors.black,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            /* shadow properties for iOS only */
            elevation: 8,
        },
        title: {
            marginBottom: 3,
            fontSize: 23,
            fontWeight: 'bold',
        },
        text: {
            fontSize: 10,
            color: colors.black,
            textAlign: 'justify',
        },
        textRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '85%',
        },
        exclamationMark: {
            marginLeft: 20,
            marginTop: 40,
            height: '65%',
            width: '10%',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.textRow}>
                <View>
                    <Text style={styles.title}>Disclaimer</Text>
                    <Text style={styles.text}>
                        The Windesheim AI App is an educational tool developed
                        by students at Windesheim University of Applied
                        Sciences. While efforts are made to ensure accuracy,
                        users should verify information independently. The app
                        is for educational purposes only and should not
                        substitute professional advice. Windesheim University
                        does not guarantee the app's content, functionality and
                        third-party links. Users' privacy and data security is
                        prioritized. Windesheim University reserves the right to
                        modify or discontinue the app. Users agree to these
                        terms by using the app.
                    </Text>
                </View>
                <Image
                    style={styles.exclamationMark}
                    source={
                        require('../../../assets/images/Icon/exclamation-mark.png') as ImageSourcePropType
                    }
                />
            </View>
        </View>
    );
};
