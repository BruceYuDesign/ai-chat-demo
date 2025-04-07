'use client';
import type { ChatCompletion } from 'openai/src/resources.js';
import type { Conversation, DialogRef } from '@/components/Dialog';
import { useRef, useState, useEffect, use } from 'react';
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
  // 對話框
  const dialogRef = useRef<DialogRef>(null);


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

    // 新增 AI 發送的訊息
    result && setConversation(prevConversation => {
      return [
        ...prevConversation,
        { content: result.choices[0].message.content as string, role: 'assistant' },
      ];
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
    ]);

    // 送出訊息給 AI
    createDialog(content);
  }


  // 使用者發送訊息，滾動到最底部
  useEffect(() => {
    if (conversation.at(-1)?.role === 'user') {
      dialogRef.current?.scrollToBottom();
    }
  }, [conversation]);


  return (
    <div className='w-screen h-screen flex flex-col gap-4 px-16 py-8 items-stretch justify-stretch bg-slate-200'>
      <Dialog
        ref={dialogRef}
        isLoading={isLoading}
        conversation={conversation}
      />
      <TextField
        submitBtnIsActive={!isLoading}
        onSubmit={textFieldOnSubmit}
      />
    </div>
  );
}
