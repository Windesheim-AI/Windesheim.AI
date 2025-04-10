import { getEnvValue } from '../lib/utility/env/env';
import { EnvOptions } from '../lib/utility/env/env.values';

const OPENAI_API_KEY = getEnvValue(EnvOptions.OpenAIApiKey);

export async function fetchChatResponse(messages: { role: "user" | "assistant"; content: string }[]) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content as string;
}
