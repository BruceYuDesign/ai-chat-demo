import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import '@/app/globals.css';


export const metadata: Metadata = {
  title: 'AI Chat Demo',
  description: '',
}


/**
 * @function RootLayoutProps
 * @param {React.ReactNode} children - 子頁面
 */
interface RootLayoutProps {
  children: React.ReactNode;
}


/**
 * @function RootLayout
 * @description 根頁面的佈局
 * @param {RootLayoutProps} props
 */
export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang='zh-Hant-TW'>
      <body cz-shortcut-listen='true'>
        {props.children}
        <ToastContainer
          position='top-left'
        />
      </body>
    </html>
  );
}