import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { WhScrollView } from './../../components/general/views/WhScrollView';
import { Card } from '../../components/base/Card';
import { DataWrapper } from '../../components/base/DataWrapper';
import { GoBackButton } from '../../components/general/buttons/GoBackButton';
import { TextTranslated } from '../../components/general/text/TextTranslated';
import { PageView } from '../../components/general/views/PageView';
import { useFonts } from '../../constants/Fonts';
import usePromptLibrary from '../../lib/fetcher/usePromptLibrary';
import { useNavigation } from '../../lib/utility/navigation/useNavigation';
import { Routes } from '../../routes/routes';
import { Chip, shadow } from 'react-native-paper';
import { useColorConfig } from '../../constants/Colors';
import { PageScrollView } from '../../components/general/views/PageScrollView';

export function PromptLibrary() {
    const colors = useColorConfig();
    const fonts = useFonts();
    const navigation = useNavigation();
    const { data, isLoading, error } = usePromptLibrary();
    const [selectedTool, setSelectedTool] = useState('');

    const styles = StyleSheet.create({
        card: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        leftContent: {
            flex: 1,
        },
        rightContent: {
            flex: 1,
            alignItems: 'flex-end',
        },
        title: {
            ...fonts.h1,
            marginBottom: 10,
        },
        tagContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 10,
        },
    });

    const usedTools = Array.from(new Set(data?.map((prompt) => prompt.tool)));

    const filteredPrompts = data?.filter((prompt) =>
        selectedTool ? prompt.tool === selectedTool : true
    );

    return (
        <DataWrapper isLoading={isLoading} error={error}>
            <PageScrollView>
                <TextTranslated
                    id="prompt-library"
                    style={styles.title}
                    text="Prompt Library"
                />
                <GoBackButton
                    onPress={() => navigation.navigate(Routes.Study)}
                    buttonText="Study"
                />
                <View style={styles.tagContainer}>
                    {usedTools.map((tool) => (
                        <Chip
                            key={tool}
                            style={{
                                marginRight: 5,
                                marginBottom: 5,
                                backgroundColor:
                                    selectedTool === tool
                                        ? colors.primary
                                        : colors.danger, // Use colors.secondary instead of randomColor()
                                borderColor:
                                    selectedTool === tool
                                        ? colors.primary
                                        : colors.danger, // Use colors.secondary instead of randomColor()
                                ...shadow,
                            }}
                            textStyle={fonts.description}
                            onPress={() => setSelectedTool(tool)}
                        >
                            {tool}
                        </Chip>
                    ))}
                </View>
                {filteredPrompts?.map((prompt) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(Routes.Prompt, {
                                promptId: prompt.id,
                            });
                        }}
                        key={prompt.id}
                    >
                        <Card style={styles.card}>
                            <View style={styles.leftContent}>
                                <Text style={fonts.h3}>
                                    {prompt.title}
                                </Text>
                                <Text style={fonts.accent}>
                                    {prompt.promptPattern}
                                </Text>
                            </View>
                            <View style={styles.rightContent}>
                                <Text style={fonts.h2}>
                                    {prompt.tool}
                                </Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </PageScrollView>
        </DataWrapper>
    );
}
