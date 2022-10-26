![image](./public/images/User%20log%20in%20index.png)

# 帳密檢查機制系統

一個使用 Node.js + Express + MongoDB + Mongoose 帳密檢查機制系統

## Features - 產品功能

1. 使用者可以在首頁輸入信箱及密碼進行登入


### Environment  - 開發環境

- Nodejs v16.14.2
- nodemon @2.0.16

### package  - 使用套件

By NPM
- "body-parser": "^1.20.0",
- "cookie-parser": "~1.4.4",
- "debug": "~2.6.9",
- "dotenv": "^16.0.1",
- "express": "~4.16.1",
- "hbs": "~4.0.4",
- "http-errors": "~1.6.3",
- "mongoose": "^6.3.5",
- "morgan": "~1.9.1"

By CDN
- bootstrap 5.0.2

### Installing - 專案安裝流程

1. 打開 terminal, Clone 此專案至本機電腦

```
git clone https://github.com/yongsin0129/user-authentication.git
```

2. 使用終端機 Terminal, 進入存放此專案的資料夾

```
cd user-authentication
```

3. 使用終端機 Terminal, 安裝 npm 套件

```
npm install
```


4. 在此專案的資料夾新增一個.env，放入 MONGODB_URI_users，連結你的 mongoBD

```
MONGODB_URI_users='mongodb+srv://你的帳號:你的密碼@cluster0.ac5wn.mongodb.net/資料庫名稱?retryWrites=true&w=majority'
```

5. 使用終端機 Terminal, 建立種子資料，執行 addDummyData 檔案

```
npm run seed
```

6. 使用終端機 Terminal, 開啟 server，執行 app.js 檔案

```
npm run dev
```
看到訊息以下訊息表示成功執行此專案
```
mongoose ok !
```


## Acknowledgments

* alpha camp
