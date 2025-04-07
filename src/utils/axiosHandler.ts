import type { Method } from 'axios'
import axios from 'axios';
import { toast } from 'react-toastify';


/**
 * @interface AxiosHandlerOptions
 * @param {string} url - 請求網址
 * @param {Method} method - 請求方法
 * @param {Record<string, unknown>} params - 請求的 query 參數
 * @param {Record<string, unknown>} data - 請求的 body 參數
 */
interface AxiosHandlerOptions {
  url: string;
  method?: Method;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}


/**
 * @interface AxiosError
 * @param {number} status - 錯誤狀態碼
 */
interface AxiosError {
  status: number;
  [key: string]: unknown;
}


const instance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
});


const errorCodeDict: Record<number, string> = {
  400: '請求錯誤',
  401: '未授權',
  402: '需要付款',
  403: '禁止訪問',
  404: '請求的資源不存在',
  405: '請求方法不被允許',
  406: '請求的格式不正確',
  429: '已超過請求限制',
  500: '伺服器錯誤',
}


/**
 * @function isAxiosError
 * @description 檢查 error 是否為 AxiosError 類型
 * @param {unknown} error - 發生的錯誤
 * @returns {boolean} - 是否為 AxiosError
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof (error as AxiosError).status === 'number'
  );
}


/**
 * @function axiosHandler
 * @description 模組化 axios 請求
 * @param {AxiosHandlerOptions} options - axios 請求參數
 */
export async function axiosHandler(options: AxiosHandlerOptions) {
  try {
    const { data: responseData } = await instance.request({
      url: options.url,
      params: options.params,
      method: options.method,
      data: options.data,
    })

    return responseData;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && errorCodeDict[error.status]) {
      toast.error(errorCodeDict[error.status]);
    } else {
      toast.error('發生未知錯誤');
    }
  }
}