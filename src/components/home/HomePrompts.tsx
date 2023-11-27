import { ScrollView, StyleSheet, View } from 'react-native';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { DataWrapper } from '../general/base/DataWrapper';
import { TextTranslated } from '../general/text/TextTranslated';
import React from 'react';
import { Button } from '../general/buttons/Button';
import { stateColorSchemes, useColorConfig } from '../../constants/Colors';
import { ListButton } from '../general/buttons/ListButton';

export function HomePrompts() {
    // This is a component that displays 5 random prompts from the prompt library
    // It is used on the home screen

    const colors = useColorConfig();
    const { data, isLoading, error } = usePromptLibrary();

    //select 5 random prompts
    const selectedPrompts = data
        // eslint-disable-next-line etc/no-assign-mutated-array
        ?.sort(() => Math.random() - Math.random())
        .slice(0, 5);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            maxHeight: 200,
        },
    });

    return (
        <DataWrapper isLoading={isLoading} error={error}>
            <ScrollView style={styles.container}>
                {selectedPrompts?.map((prompt) => (
                    <ListButton
                        key={prompt.id}
                        buttonText={prompt.title}
                        screenName={prompt.prompt}
                        testId="home-prompt-button"
                    />
                ))}
            </ScrollView>
        </DataWrapper>
    );
}
