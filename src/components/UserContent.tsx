/**
 * @interface UserContentProps
 * @property {string} content - 使用者的訊息
 */
interface UserContentProps {
  content: string;
}


/**
 * @function UserContent
 * @description 使用者發送的訊息框
 * @param {UserContentProps} props
 */
export default function UserContent(props: UserContentProps) {
  return (
    <div className='flex flex-row justify-end pl-8'>
      <div className='w-fit max-w-4xl px-4 py-2 rounded-2xl break-all whitespace-pre-wrap bg-slate-600 text-white'>
        {props.content}
      </div>
    </div>
  );
}