/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { TextTranslated } from 'components/general/text/TextTranslated';
import { useColorConfig } from '../lib/constants/Colors';
import { useNavigation } from '../lib/utility/navigation/useNavigation';
import { Routes } from '../routes/routes';

export const ChooseCategories = () => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    const navigator = useNavigation();
    const colors = useColorConfig();

    const toggleCategory = (categoryId: number) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId),
            );

            return;
        }

        if (selectedCategories.length < 3) {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const toggleExpand = (categoryId: number) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(
                expandedCategories.filter((id) => id !== categoryId),
            );

            return;
        }

        setExpandedCategories([...expandedCategories, categoryId]);
    };

    const categories = [
        'Strategy, Leadership, and Planning',
        'Technology and Processes',
        'Data Management and Ethics',
        'Skills, Workforce, and AI Knowledge',
        'Innovation and Change Management',
        'Risk and Compliance Management',
    ];

    const categoryDescriptions = [
        'Strategic alignment and leadership skills in the context of digital transformation.',
        'Technological infrastructure and process optimization for digital solutions.',
        'Responsible data management and ethical guidelines.',
        'Development of skills and knowledge in AI and digital technologies.',
        'Management of innovation processes and organizational change.',
        'Risk management and compliance with regulatory requirements.',
    ];
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.background,
        },
        header: {
            color: colors.text,
            fontSize: 24,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginBottom: 16,
        },
        description: {
            color: colors.text,
            fontSize: 16,
            alignSelf: 'flex-start',
            marginBottom: 20,
            lineHeight: 24,
        },
        categoryList: {
            width: '100%',
        },
        categoryItem: {
            backgroundColor: colors.background,
            borderRadius: 10,
            marginBottom: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.borderColor,
        },
        categoryItemSelected: {
            backgroundColor: colors.background,
        },
        categoryHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
        },
        checkBox: {
            marginRight: 10,
        },
        checkBoxText: {
            fontSize: 45,
            color: colors.text,
        },
        categoryText: {
            fontSize: 18,
            flex: 1,
        },
        categoryTextExpanded: {
            color: colors.continueButtonColor,
        },
        categoryTextCollapsed: {
            color: colors.text,
        },
        chevronIcon: {
            fontSize: 18,
            color: colors.text,
        },
        categoryContent: {
            paddingHorizontal: 20,
            paddingBottom: 10,
            color: colors.text,
        },
        button: {
            marginTop: 20,
            paddingVertical: 12,
            paddingHorizontal: 25,
            backgroundColor: colors.continueButtonColor,
            borderRadius: 8,
        },
        buttonText: {
            color: colors.text,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Maturity Scan</Text>
            <Text style={styles.description}>
                The Maturity Scan helps you assess the maturity level of your
                organization.{'\n'}
                Select the most important categories for you.{'\n'}
                These will be weighted more heavily in the evaluation.
            </Text>

            <View style={styles.categoryList}>
                {categories.map((category, index) => (
                    <View
                        style={[
                            styles.categoryItem,
                            selectedCategories.includes(index) &&
                                styles.categoryItemSelected,
                        ]}
                        key={index}
                    >
                        <TouchableOpacity
                            style={styles.categoryHeader}
                            onPress={() => toggleExpand(index)}
                        >
                            <View style={styles.checkBox}>
                                <TouchableOpacity
                                    onPress={() => toggleCategory(index)}
                                >
                                    <Text style={styles.checkBoxText}>
                                        {selectedCategories.includes(index)
                                            ? '☑'
                                            : '☐'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text
                                style={[
                                    styles.categoryText,
                                    expandedCategories.includes(index)
                                        ? styles.categoryTextExpanded
                                        : styles.categoryTextCollapsed,
                                ]}
                            >
                                {category}
                            </Text>

                            <Text style={styles.chevronIcon}>
                                {expandedCategories.includes(index) ? '▲' : '▼'}
                            </Text>
                        </TouchableOpacity>

                        {expandedCategories.includes(index) &&
                        index >= 0 &&
                        index < categoryDescriptions.length &&
                        categoryDescriptions[index] ? (
                            <Text style={styles.categoryContent}>
                                {categoryDescriptions[index]}
                            </Text>
                        ) : null}
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigator.navigate(Routes.QuestionPage.toString())
                }
            >
                <TextTranslated style={styles.buttonText} text="Take scan" />
            </TouchableOpacity>
        </ScrollView>
    );
};
