'use client';
import type { ChatCompletion } from 'openai/src/resources.js';
import type { Conversation } from '@/components/Dialog';
import { useState } from 'react';
import { axiosHandler } from '@/utils/axiosHandler';
import Dialog from '@/components/Dialog';
import TextField from '@/components/TextField';


/**
 * @function Home
 * @description 首頁
 */
export default function Home() {
  // 對話內容
  const [conversation, setConversation] = useState<Conversation>([]);
  // 是否讀取中
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // 送出對話訊息，含 browser 歷史訊息
  const createDialog = async (content: string) => {
    setIsLoading(true);

    const result: ChatCompletion | null = await axiosHandler({
      url: '/dialog',
      method: 'POST',
      data: {
        messages: [
          ...conversation,
          { content, role: 'user' },
        ],
      },
    });

    // 新增 AI 發送的訊息，替換掉 Loading...
    setConversation(prevConversation => {
      return result
        ? [
          ...prevConversation.slice(0, -1),
          { content: result.choices[0].message.content as string, role: 'assistant' },
        ]
        : prevConversation.slice(0, -1);
    });

    setIsLoading(false);
  }


  // 輸入框點選送出
  const textFieldOnSubmit = (content: string) => {
    if (!content) return;

    // 新增使用者發送的訊息
    setConversation(prevConversation => [
      ...prevConversation,
      { content, role: 'user' },
      { content: 'Loading...', role: 'assistant' },
    ]);

    // 送出訊息給 AI
    createDialog(content);
  }


  return (
    <div className='w-screen h-screen flex flex-col gap-4 px-16 py-8 items-stretch justify-stretch bg-slate-200'>
      <Dialog
        conversation={conversation}
      />
      <TextField
        submitBtnIsActive={!isLoading}
        onSubmit={textFieldOnSubmit}
      />
    </div>
  );
}
