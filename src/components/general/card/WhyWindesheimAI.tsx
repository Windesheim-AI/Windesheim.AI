import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useColorConfig } from '../../../lib/constants/Colors';

export const DisclaimerCard = () => {
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        container: {
            marginTop: 100,
            padding: 15,
            //backgroundColor: colors.attentionYellow,
            borderRadius: 15,
            // borderColor: colors.lightGrey,
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
    });

    return (
        <View style={styles.container}>
            <View style={styles.textRow}>
                <View>
                    <Text style={styles.title}>Why Windesheim.AI</Text>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed nonne merninisti licere mihi ista probare, quae sunt
                        a te dicta? Duo Reges: constructio interrete. Quae cum
                        dixisset paulumque institisset, Quid est?{' '}
                    </Text>
                </View>
            </View>
        </View>
    );
};
