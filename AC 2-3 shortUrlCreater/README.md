![image](./public/pictures/homepage.png)

# 短網址產生器

一個使用 Node.js + Express + MongoDB + Mongoose 打造的短網址產生器

## Features - 產品功能

- 使用者可以輸入任一網址後，產生一個短網址
- 使用者可以在產生短網址，點選按鈕來複製短網址


### Environment  - 開發環境

- Nodejs v16.14.2
- nodemon @2.0.16

### package  - 使用套件

By NPM
- express 4.18.1
- express-handlebars 6.0.5
- dotenv 16.0.1
- mongoose 5.9.7

By CDN
- bootstrap 5.1.3

### Installing - 專案安裝流程

1. 打開 terminal, Clone 此專案至本機電腦

```
git clone https://github.com/yongsin0129/shortUrlCreater.git
```

2. 使用終端機 Terminal, 進入存放此專案的資料夾

```
cd shortUrlCreater
```

3. 使用終端機 Terminal, 安裝 npm 套件

```
npm install
```


4. 在此專案的資料夾新增一個.env，放入 DOT_MONGODB_URI，連結你的 mongoBD

```
MONGODB_URL_YS='mongodb+srv://你的帳號:你的密碼@cluster0.ac5wn.mongodb.net/資料庫名稱?retryWrites=true&w=majority'
```

5. 使用終端機 Terminal, 開啟 server，執行 app.js 檔案

```
npm run dev
```
看到訊息以下訊息表示成功執行此專案
```
server is running on http://localhost:3000
mongoose ok !
```


## Acknowledgments

* alpha camp
