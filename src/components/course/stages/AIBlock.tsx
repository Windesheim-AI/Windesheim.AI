//@ts-ignore
import { OPENAI_API_KEY, AI_ENABLED } from '@env';
import OpenAI, { ClientOptions } from 'openai';
import React, { useState, useEffect } from 'react';

import BlockWrapper from './block';
import { AIOptions } from '../../../types/CourseStageBlock';
import AIGeneratedOutput from '../AIGeneratedOutput';

export default function AIRenderer({ options }: { options: AIOptions }) {
    const [text, setText] = useState(''); // set default value to an empty string
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY as string, // defaults to process.env["OPENAI_API_KEY"]
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

        if (AI_ENABLED === 'true') {
            // eslint-disable-next-line no-void
            void main();
        } else {
            setText(
                'Live AI has been disabled in the .env file. Showing prompt; ' +
                    options.prompt,
            );
        }
    }, [options.prompt, openai.chat.completions]);

    return (
        <BlockWrapper>
            <AIGeneratedOutput text={text} prompt={options.prompt} />
        </BlockWrapper>
    );
}
