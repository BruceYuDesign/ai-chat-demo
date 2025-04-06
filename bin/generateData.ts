// import OpenAI from 'openai';
import fs from 'fs';
import 'dotenv/config';


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


const contents: Array<{ path: string, content: string }> = [];


/**
 * @function dirReader
 * @description 遞迴讀取指定資料夾內所有檔案與子資料夾的檔案，並將檔案內容儲存至 contents 陣列
 * @param {string} dirPath - 資料夾路徑
 * @returns {void}
 */
function dirReader(dirPath: string): void {
  const files = fs.readdirSync(dirPath, { encoding: 'utf-8' });

  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    fileReader(filePath);
  }
}

/**
 * @function fileReader
 * @description 判斷指定路徑是否為資料夾或檔案，若為資料夾則遞迴呼叫 dirReader，否則讀取檔案內容
 * @param {string} filePath - 檔案或資料夾路徑
 * @returns {void}
 */
function fileReader(filePath: string): void {
  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    dirReader(filePath);
  } else {
    const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
    contents.push({ path: filePath, content });
  }
}

/**
 * @function parseStringToVector
 * @description 將輸入字串轉換為 OpenAI Embedding 向量
 * @param {string} inputString - 要轉換為向量的文字
 * @returns {Promise<number[]>} - 對應的向量陣列，為非同步
 * 
 * ! 需收費
 */
// async function parseStringToVector(inputString: string): Promise<Array<number>> {
//   const embeddings = await openai.embeddings.create({
//     model: 'text-embedding-ada-002',
//     input: inputString,
//   });

//   const vector = embeddings.data[0].embedding;
//   return vector;
// }


/**
 * 遍歷指定資料夾內容，並將所有檔案的內容與路徑輸出為 JSON 檔。
 */
(() => {
  const folder = 'contents';
  dirReader(folder);

  fs.mkdirSync('src/app/api/assets', { recursive: true });
  fs.writeFileSync('src/app/api/assets/contents.json', JSON.stringify(contents), { encoding: 'utf-8' });
})();