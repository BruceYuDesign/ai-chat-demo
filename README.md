# AI Chat Demo

此專案為 mapPlus.js 的文件與 OpenAI Chat 的範例，詢問 AI 將回傳 mapPlus.js 的 API 文件，並且提供範例程式碼。


## 初始化

需使用 `node v20.0.0` 以上開發，建議使用 `nvm` 做為 `node.js` 版本管理工具，詳請參考 [nvm](https://github.com/nvm-sh/nvm)。

```bash
npm install
```


## 生成 OpenAI 所需資料

使用以下 CLI 生成所需資料，會將 `/contents` 中的文件轉為 JSON 格式，並寫入 `/src/app/api/assets/content.json`。

※ 因未使用 OpenAI 付費方案，目前沒有將文字轉為向量資料，或是使用向量資料庫等。

```bash
npm run generate-data
```


## 開發環境

```bash
npm run dev
```


## 產品環境

```bash
# 打包
npm run build

# 啟動產品環境
npm run start
```