# 去除 AI 味工具

一個專為大學生設計的文字改寫工具，使用 DeepSeek API 去除文字中的 AI 生成痕跡，讓文字看起來更自然、更像人類書寫。

## 功能

- 用戶註冊和登錄（使用 Supabase 認證）
- 輸入需要改寫的文字
- 使用 DeepSeek API 自動去除 AI 味
- 顯示改寫後的文字
- 一鍵複製改寫結果
- 淺色/深色主題切換

## 技術棧

- Next.js 14
- TypeScript
- TailwindCSS
- DeepSeek API
- Supabase (認證和數據庫)
- React Server Components

## 安裝與運行

1. 安裝依賴：
```bash
npm install
```

2. 配置環境變數：
   - 在 `.env.local` 文件中配置以下變數：
     - `DEEPSEEK_API_KEY`: 您的 DeepSeek API Key
     - `NEXT_PUBLIC_SUPABASE_URL`: 您的 Supabase 項目 URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 您的 Supabase Anon Key
   - 詳細配置說明請參考 `SUPABASE_SETUP.md`

3. 運行開發伺服器：
```bash
npm run dev
```

4. 在瀏覽器中打開 [http://localhost:3000](http://localhost:3000)

## 使用說明

1. **註冊/登錄**：
   - 訪問 `/signup` 頁面創建新帳號
   - 或訪問 `/login` 頁面登錄現有帳號
   
2. **使用改文功能**：
   - 在「原始文字」區域輸入或貼上需要改寫的文字
   - 點擊「去除 AI 味」按鈕
   - 等待改寫完成，結果會顯示在「改寫後文字」區域
   - 點擊「複製結果」按鈕即可複製改寫後的文字

3. **主題切換**：
   - 點擊右上角的主題切換按鈕
   - 在淺色和深色模式之間切換

## 環境變數配置

在 `.env.local` 文件中配置以下環境變數：

```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

詳細的 Supabase 配置說明請參考 `SUPABASE_SETUP.md` 文件。

## 專案結構

```
.
├── app
│   ├── api
│   │   └── de-ai-text
│   │       └── route.ts          # API路由處理改寫請求
│   ├── auth
│   │   └── callback
│   │       └── route.ts          # Supabase 認證回調路由
│   ├── components
│   │   ├── auth-provider.tsx     # 認證上下文提供者
│   │   ├── de-ai-text.tsx        # 去除AI味組件
│   │   ├── login-form.tsx        # 登錄表單組件
│   │   ├── signup-form.tsx       # 註冊表單組件
│   │   ├── theme-provider.tsx    # 主題上下文提供者
│   │   └── theme-toggle.tsx      # 主題切換按鈕
│   ├── login
│   │   └── page.tsx              # 登錄頁面
│   ├── signup
│   │   └── page.tsx              # 註冊頁面
│   ├── globals.css               # 全局樣式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主頁面
├── lib
│   └── supabase
│       ├── client.ts             # Supabase 客戶端配置
│       └── server.ts             # Supabase 服務端配置
├── .cursor
│   └── rules
│       └── techspec.mdc          # 專案技術規範
└── package.json
```

## 注意事項

- 需要有效的 DeepSeek API Key 才能使用改文功能
- 需要配置 Supabase 項目才能使用註冊和登錄功能
- API 調用可能會產生費用，請注意使用量
- 建議在生產環境中設置速率限制和錯誤處理
- 詳細的 Supabase 配置請參考 `SUPABASE_SETUP.md`

## 相關文檔

- [Supabase 配置說明](./SUPABASE_SETUP.md)

