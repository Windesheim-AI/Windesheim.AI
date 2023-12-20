import OpenAI, { ClientOptions } from 'openai';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import BlockWrapper from './block';
import { getEnvValue, isEnvSettingEnabled } from '../../../lib/utility/env/env';
import { EnvOptions } from '../../../lib/utility/env/env.values';
import { AIOptions } from '../../../types/CourseStageBlock';
import AIGeneratedOutput from '../AIGeneratedOutput';

export default function AIRenderer({ options }: { options: AIOptions }) {
    const [text, setText] = useState(''); // set default value to an empty string
    const openai = new OpenAI({
        apiKey: getEnvValue(EnvOptions.OpenAIApiKey),
        dangerouslyAllowBrowser: true,
    } as ClientOptions);

    useEffect(() => {
        async function main() {
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content: options.prompt + 'Houd het zeer kort!',
                    },
                ],
                model: 'gpt-3.5-turbo',
            });
            //@ts-ignore
            setText(chatCompletion.choices[0].message.content);
        }

        if (!isEnvSettingEnabled(EnvOptions.AiEnabled)) {
            setText(
                `Live AI has been disabled in the .env file. Showing prompt; ${options.prompt}`,
            );
            return;
        }

        // eslint-disable-next-line no-void
        void main();
    }, [openai.chat.completions, options.prompt]);

    const styles = StyleSheet.create({
        block: {
            marginTop: 20,
            marginBottom: 20,
        },
    });

    return (
        <BlockWrapper style={styles.block}>
            <AIGeneratedOutput text={text} prompt={options.prompt} />
        </BlockWrapper>
    );
}
