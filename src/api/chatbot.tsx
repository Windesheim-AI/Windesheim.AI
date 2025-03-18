import axios from 'axios';

import { getEnvValue } from '../lib/utility/env/env';
import { EnvOptions } from '../lib/utility/env/env.values';

const OPENAI_API_KEY = getEnvValue(EnvOptions.OpenAIApiKey);

export const getBotResponse = async (message: string): Promise<string> => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo-16k',
                messages: [{ role: 'user', content: message }],
                max_tokens: 300,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error getting response from OpenAI API:', error);
        throw new Error('Failed to get response from chatbot.');
    }
};
