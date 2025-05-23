'use client';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import AssistantContent from '@/components/AssistantContent';
import UserContent from '@/components/UserContent';


/**
 * @name Role
 * - 'assistant'： AI 發送的訊息
 * - 'user'：使用者發送的訊息
 */
type Role = 'assistant' | 'user'

/**
 * @interface ConversationItem
 * @property {string} content - 發送的訊息內容
 * @property {Role} role - 發送訊息的角色
 */
interface ConversationItem {
  content: string;
  role: Role;
}

export type Conversation = Array<ConversationItem>;


/**
 * @interface DialogProps
 * @property {boolean} isLoading - 是否讀取中
 * @property {ConversationType} conversation - 對話內容
 */
interface DialogProps {
  isLoading: boolean;
  conversation: Conversation;
}


/**
 * @interface DialogRef
 * @property {function} scrollToBottom - 滾動到對話框底部
 */
export interface DialogRef {
  scrollToBottom: () => void;
}


/**
 * @function Dialog
 * @description 使用者與 AI 助理對話訊息
 * @param {DialogProps} props
 * @param {DialogRef} ref
 */
const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
  const dialogRef = useRef<HTMLDivElement>(null);


  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      dialogRef.current?.scrollTo({
        top: dialogRef.current.scrollHeight,
        behavior: 'smooth',
      });
    },
  }));


  return (
    <div
      ref={dialogRef}
      className='util-block
      grow px-8 overflow-auto'
    >
      <div className='flex flex-col gap-4 py-4'>
        {
          props.conversation.map(({ content, role }, index) =>
            role === 'assistant'
              ? <AssistantContent key={index} content={content} />
              : <UserContent key={index} content={content} />
          )
        }
        {props.isLoading && (
          <p className='text-slate-500 animate-pulse'>
            Loading...
          </p>
        )}
      </div>
    </div>
  );
});


Dialog.displayName = 'Dialog';


export default Dialog;