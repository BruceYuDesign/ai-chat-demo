import Markdown from 'react-markdown';


/**
 * @interface AssistantContentProps
 * @property {string} content - AI 助理的訊息
 */
interface AssistantContentProps {
  content: string;
}


/**
 * @function AssistantContent
 * @description AI 助理發送的訊息框
 * @param {AssistantContentProps} props
 * 
 * - 會將 AI 回傳的 Markdown 訊息轉為 html
 */
export default function AssistantContent(props: AssistantContentProps) {
  return (
    <div className='util-assistant-content'>
      <Markdown>
        {props.content}
      </Markdown>
    </div>
  );
}