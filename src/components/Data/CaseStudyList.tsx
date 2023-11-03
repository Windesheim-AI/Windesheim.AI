import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useColorConfig } from '../../constants/Colors';

interface CaseStudyItem {
    id: number;
    title: string;
}

export type CaseStudyListProps = {
    onPress?: (id: number) => void;
};

const CaseStudy: CaseStudyItem[] = [
    {
        id: 1,
        title: 'Mojo Vision',
    },
    {
        id: 2,
        title: 'Coaching in VR',
    },
    {
        id: 3,
        title: 'LVB Media Experience',
    },
];

const CaseStudyList = ({ onPress }: CaseStudyListProps) => {
    const colors = useColorConfig();
    const styles = StyleSheet.create({
        CaseStudyContainer: {
            flexDirection: 'row',
            margin: 10,
            marginRight: 10,
        },
        CaseStudyItem: {
            width: 140,
            height: 140,
            backgroundColor: colors.gray,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 10,
        },
        CaseStudyText: {
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

    return (
        <View testID="CaseStudy" style={styles.CaseStudyContainer}>
            {CaseStudy.map((item) => (
                <TouchableOpacity
                    testID="casestudyitem"
                    key={item.id}
                    style={styles.CaseStudyItem}
                    onPress={() => onPress && onPress(item.id)}
                >
                    <Text style={styles.CaseStudyText}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CaseStudyList;
