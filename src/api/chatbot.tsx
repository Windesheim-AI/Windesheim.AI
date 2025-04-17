import { getEnvValue } from '../lib/utility/env/env';
import { EnvOptions } from '../lib/utility/env/env.values';

const OPENAI_API_KEY = getEnvValue(EnvOptions.OpenAIApiKey);
const ASSISTANT_ID = getEnvValue(EnvOptions.OpenAIAssistantId); // Replace with your actual Assistant ID

export async function fetchChatResponse(
    messages: { role: 'user'; content: string }[],
) {
    try {
        // Step 1: Create a thread
        const threadRes = await fetch('https://api.openai.com/v1/threads', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
            },
        });

        const thread = await threadRes.json();

        if (!thread.id) {
            throw new Error(
                `Failed to create thread: ${JSON.stringify(thread)}`,
            );
        }

        // Step 2: Add user message to thread
        const lastUserMessage = messages[messages.length - 1];

        const addMessageRes = await fetch(
            `https://api.openai.com/v1/threads/${thread.id}/messages`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v2',
                },
                body: JSON.stringify({
                    role: 'user',
                    content: lastUserMessage.content,
                }),
            },
        );

        const addMessageData = await addMessageRes.json();

        // Step 3: Run assistant
        const runRes = await fetch(
            `https://api.openai.com/v1/threads/${thread.id}/runs`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                    'OpenAI-Beta': 'assistants=v2',
                },
                body: JSON.stringify({
                    assistant_id: ASSISTANT_ID,
                }),
            },
        );

        const run = await runRes.json();

        if (!run.id) {
            throw new Error(`Failed to start run: ${JSON.stringify(run)}`);
        }

        // Step 4: Poll until run is completed
        let runStatus = run.status;
        while (runStatus === 'queued' || runStatus === 'in_progress') {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 second

            const checkRes = await fetch(
                `https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${OPENAI_API_KEY}`,
                        'OpenAI-Beta': 'assistants=v2',
                    },
                },
            );

            const checkData = await checkRes.json();
            runStatus = checkData.status;
        }

        // Step 5: Retrieve messages
        const messagesRes = await fetch(
            `https://api.openai.com/v1/threads/${thread.id}/messages`,
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'OpenAI-Beta': 'assistants=v2',
                },
            },
        );

        const messagesData = await messagesRes.json();

        const assistantMessage = messagesData.data.find(
            (msg: any) => msg.role === 'assistant',
        );

        const textContent = assistantMessage?.content?.find(
            (c: any) => c.type === 'text',
        )?.text?.value;
        const cleanText = textContent
            ?.replace('【4:0†ELSALON.docx】', '') // Remove 【4:0†ELSALON.docx】at the end of the response
            ?.trim();

        return cleanText || 'Sorry, no response found.';
    } catch (error) {
        return 'Something went wrong while talking to the assistant.';
    }
}
