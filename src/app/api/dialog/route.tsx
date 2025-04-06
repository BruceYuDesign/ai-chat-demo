import type { NextRequest } from 'next/server';
import { requestHandler, responseStatus, responseHandler } from '@/app/api/utils/httpHandler';
import { aiChat } from '@/app/api/utils/aiChat';


/**
 * @function POST
 * @memberof dialog
 * @description 處理前端傳入的訊息，呼叫 AI 模型並回傳其生成的回應
 * @param {NextRequest} request - body 須包含 messages 參數
 * @returns {Promise<Response>} - AI 回應內容
 */
export const POST = (request: NextRequest): Promise<Response> => requestHandler(async function() {
  const requestData = await request.json();

  if (!requestData || !requestData.messages) {
    return responseHandler(responseStatus.BAD_REQUEST);
  }

  const result = await aiChat(requestData.messages);

  return responseHandler(responseStatus.SUCCESS, result);
});