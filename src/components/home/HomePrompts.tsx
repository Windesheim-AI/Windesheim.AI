import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useColorConfig, useColorStateConfig } from '../../constants/Colors';
import { useFonts } from '../../constants/Fonts';
import usePromptLibrary from '../../lib/repositories/promptLibrary/usePromptLibrary';
import { useAppDispatch } from '../../redux/Hooks';
import { setLoading } from '../../redux/slices/LoadingSlice';
import { Routes } from '../../routes/routes';
import { DataWrapper } from '../general/base/DataWrapper';
import { Button } from '../general/buttons/Button';
import { TextTranslated } from '../general/text/TextTranslated';
import { PromptCard } from '../promptLibary/PromptCard';

export function HomePrompts() {
    // This is a component that displays 5 random prompts from the prompt library
    // It is used on the home screen

    const storeDispatcher = useAppDispatch();
    const colors = useColorConfig();
    const colorStateConfig = useColorStateConfig();
    const fonts = useFonts();
    const { data, isLoading, error } = usePromptLibrary();

    const selectedPrompts = data
        // eslint-disable-next-line etc/no-assign-mutated-array
        ?.sort(() => Math.random() - Math.random())
        .slice(0, 3);

    const styles = StyleSheet.create({
        heading: {
            color: colors.text,
            fontSize: fonts.h1.fontSize,
            fontWeight: 'bold',
            margin: 10,
        },
    });

    return (
        <View>
            <TextTranslated style={styles.heading} text="Useful Prompts" />
            <DataWrapper isLoading={isLoading} error={error}>
                {selectedPrompts?.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </DataWrapper>
            <Button
                buttonText="See all prompts"
                screenName={Routes.PromptLibrary}
                colorGradientScheme={colorStateConfig.colors.success}
                textColorScheme={colorStateConfig.text?.success}
                testId="see-all-prompts-button"
                icon="arrow-right"
                height={40}
            />
        </View>
    );
}
