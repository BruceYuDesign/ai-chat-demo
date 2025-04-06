import type { Method } from 'axios';
import axios from 'axios';


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


const instance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
});


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
  }
}