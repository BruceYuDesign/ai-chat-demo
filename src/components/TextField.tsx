'use client';
import { useState, useRef } from 'react';


/**
 * @callback SubmitCallback
 * @param {string} text - 使用者輸入的文字
 * @returns {void} - 無
 */

/**
 * @interface TextFieldProps
 * @property {boolean} submitBtnIsActive - 送出按鈕是否為可點選
 * @property {SubmitCallback} onSubmit - 使用者按下送出時觸發的回調函數
 */
interface TextFieldProps {
  submitBtnIsActive: boolean;
  onSubmit: (text: string) => void;
}


/**
 * @function TextField
 * @description 文字輸入框
 * @param {TextFieldProps} props
 * 
 * - 可判斷中文是否選字
 * - 支援 Shift + Enter 換行且攔截回調函式
 * - 可於父層組件控制送出按鈕是否可點選
 */
export default function TextField(props: TextFieldProps) {
  // 輸入框文字
  const [text, setText] = useState<string>('');
  // 是否正在選字
  const isComposing = useRef(false);
  // Shift是否點選中
  const shiftIsPressing = useRef(false);


  // 輸入文字
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }


  // 監聽 Shift 或 Enter 按下
  // 按下 Enter 同時 Shift 已放開，且選完中文字，則觸發回調函式
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Shift') {
      shiftIsPressing.current = true;
    }
    if (event.key === 'Enter' && !shiftIsPressing.current && !isComposing.current) {
      event.preventDefault(); // 預防多發送一個換行
      onSubmit();
    }
  }


  // 監聽 Shift 放開
  const onKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Shift') {
      shiftIsPressing.current = false;
    }
  }


  // 中文選字開始
  const onCompositionStart = () => {
    isComposing.current = true;
  }


  // 中文選字結束
  const onCompositionEnd = () => {
    isComposing.current = false;
  }


  // 送出並清空欄位
  const onSubmit = () => {
    if (props.submitBtnIsActive) {
      props.onSubmit(text);
      setText('');
    }
  }


  return (
    <div
      className='util-block
      flex flex-row items-end p-1'
    >
      <textarea
        className='h-24 grow pl-4 outline-none resize-none text-slate-600'
        autoComplete='off'
        placeholder='輸入您想詢問的問題'
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
      <button
        className={
          `${props.submitBtnIsActive
            ? 'cursor-pointer opacity-100'
            : 'cursor-progress opacity-50'
          } px-6 py-2 bg-slate-700 text-white font-bold rounded-full`
        }
        type='button'
        onClick={onSubmit}
      >
        送出
      </button>
    </div>
  );
}