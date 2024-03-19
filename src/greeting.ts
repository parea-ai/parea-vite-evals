import { Parea, trace, Log, patchOpenAI } from 'parea-ai';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

export const p = new Parea(process.env.PAREA_API_KEY, 'greeting');

const openai = new OpenAI();
patchOpenAI(openai);  // patch OpenAI to add auto-trace LLM calls

// eval function
function containsTarget(log: Log) {
    if (!log.target) return null;
    return log.output?.includes(log.target);
}

export const greeting = trace('greeting', async (name: string): Promise<string> => {
    const response = await openai.chat.completions.create({
        messages: [{role: 'user', content: `Write a greeting for ${name}`}],
        model: 'gpt-3.5-turbo',
    })
    return response.choices[0].message.content || '';
}, {evalFuncs: [containsTarget]});
