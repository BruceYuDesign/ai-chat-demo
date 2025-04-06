import type { ChatCompletionAssistantMessageParam, ChatCompletion } from 'openai/src/resources.js';
import OpenAI from 'openai';
import contents from '@/app/api/assets/contents.json';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const systemContent = '你只能回答以下提供給你的資訊：\n\n' + contents.map(({ content }) => content).join('\n\n');


/**
 * @function aiChat
 * @description 發送對話訊息至 OpenAI 並取得 AI 回覆結果
 * @param {Array<ChatCompletionAssistantMessageParam>} messages - 使用者與 AI 的歷史訊息
 * @returns {Promise<ChatCompletion>} - AI 回覆結果，為非同步請求
 */
export async function aiChat(messages: Array<ChatCompletionAssistantMessageParam>): Promise<ChatCompletion> {
  const result = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: true,
    messages: [
      {
        content: systemContent,
        role: 'system',
      },
      ...messages,
    ],
  });

  return result;
}