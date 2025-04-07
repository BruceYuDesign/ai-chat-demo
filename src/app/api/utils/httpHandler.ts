/**
 * @interface HttpStatus
 * @property {number} status - HTTP 狀態碼
 * @property {string} statusText - HTTP 狀態描述
 */
interface HttpStatus {
  status: number;
  statusText: string;
}


/**
 * @constant responseStatus
 * @description HTTP 回應狀態清單
 */
export const responseStatus = {
  SUCCESS: {
    status: 200,
    statusText: 'Success'
  },
  BAD_REQUEST: {
    status: 400,
    statusText: 'Bad Request',
  },
  UNAUTHORIZED: {
    status: 401,
    statusText: 'Unauthorized',
  },
  PAYMENT_REQUIRED: {
    status: 402,
    statusText: 'Payment Required',
  },
  FORBIDDEN: {
    status: 403,
    statusText: 'Forbidden',
  },
  NOT_FOUND: {
    status: 404,
    statusText: 'Not Found',
  },
  METHOD_NOT_ALLOWED: {
    status: 405,
    statusText: 'Method Not Allowed',
  },
  NOT_ACCEPTABLE: {
    status: 406,
    statusText: 'Not Acceptable',
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    statusText: 'Too Many Requests',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    statusText: 'Internal Server Error',
  },
}


/**
 * @function isHttpError
 * @description 判斷錯誤是否為 HTTP 錯誤
 * @param {unknown} error - 要檢查的錯誤物件
 * @returns {boolean} - 是否為 HTTP 錯誤
 */
function isHttpError(error: unknown): error is { status: number; message?: string; statusText?: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
  );
}


/**
 * @callback RequestHandlerCallback
 * @returns {Promise<Response>} - HTTP 回應狀態，為非同步
 */

/**
 * @function requestHandler
 * @description 模組化請求處理函式
 * @param {RequestHandlerCallback} requestAction - 要執行的請求處理
 * @returns {Promise<Response>} - HTTP 回應狀態，為非同步
 */
export async function requestHandler(requestAction: () => Promise<Response>): Promise<Response> {
  try {
    return await requestAction();
  } catch (error) {
    console.error(error);

    if (isHttpError(error)) {
      return responseHandler({
        status: error.status,
        statusText: error.message || error.statusText || 'Unknown Error',
      });
    }

    return responseHandler(responseStatus.INTERNAL_SERVER_ERROR);
  }
}


/**
 * @function responseHandler
 * @description 模組化 HTTP 回應
 * @param {HttpStatus} httpStatus - 要回傳的 HTTP 狀態碼
 * @param {object} [data] - 要回傳的資料內容
 * @returns {Response} - 回傳的 Response 物件
 */
export function responseHandler(httpStatus: HttpStatus, data?: object): Response {
  return new Response(
    data ? JSON.stringify(data) : null,
    httpStatus,
  );
}