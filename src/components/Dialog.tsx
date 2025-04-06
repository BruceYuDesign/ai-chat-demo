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
 * @property {ConversationType} conversation - 對話內容
 */
interface DialogProps {
  conversation: Conversation;
}


/**
 * @function Dialog
 * @description 使用者與 AI 助理對話訊息
 * @param {DialogProps} props
 */
export default function Dialog(props: DialogProps) {
  return (
    <div
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
      </div>
    </div>
  );
}