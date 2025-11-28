# 功能說明

## 已實現功能

### 1. 定價頁面
- 使用者可以選擇不同的訂閱方案（基礎方案、進階方案）
- 支援月繳和年繳兩種計費週期
- 需要登入後才能訂閱方案
- 選擇方案後會呼叫「建立訂單 API」

### 2. 建立訂單 API
- 驗證使用者身份
- 確認方案和計費週期的合法性
- 在資料庫中建立狀態為 pending 的訂單
- 產生帶有 user_id 的 Stripe Payment Link 連結回傳給前端

### 3. Stripe Webhook 處理程序
- 處理付款成功事件
- 處理付款失敗事件
- 更新訂單狀態
- 管理使用者訂閱狀態

### 4. 訂閱管理頁面
- 查看目前訂閱狀態
- 查看訂單歷史記錄
- 取消訂閱功能

## 檔案結構

```
app/
├── pricing/
│   └── page.tsx          # 定價頁面
├── payment-success/
│   └── page.tsx          # 付款成功頁面
├── subscription/
│   └── page.tsx          # 訂閱管理頁面
├── api/
│   ├── create-order/
│   │   └── route.ts      # 建立訂單 API
│   └── stripe-webhook/
│       └── route.ts      # Stripe Webhook 處理程序
├── components/
│   └── header.tsx        # 導航列
└── layout.tsx            # 應用程式布局（包含導航列）

SUPABASE_ORDERS_SCHEMA.sql  # 資料庫訂單表結構
FEATURES.md                 # 功能說明文件
.env.example                # 環境變數範例
```

## 資料庫結構

訂單表包含以下欄位：
- id: UUID 主鍵
- user_id: 使用者 ID（關聯 auth.users）
- plan_id: 方案 ID
- billing_cycle: 計費週期（monthly/yearly）
- amount: 金額
- currency: 貨幣（預設 TWD）
- status: 狀態（預設 pending）
- payment_link: Stripe 付款連結
- created_at: 建立時間
- updated_at: 更新時間

## API 端點

### 建立訂單
```
POST /api/create-order
```

請求參數：
```json
{
  "planId": "basic|premium",
  "billingCycle": "monthly|yearly"
}
```

回應：
```json
{
  "success": true,
  "paymentLink": "https://buy.stripe.com/...",
  "orderId": "uuid"
}
```

### Stripe Webhook
```
POST /api/stripe-webhook
```

處理來自 Stripe 的事件通知，包括：
- checkout.session.completed (付款成功)
- invoice.payment_failed (付款失敗)

## 環境變數

請參考 [.env.example](.env.example) 檔案設定以下環境變數：

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase 專案 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase 匿名金鑰
- `STRIPE_SECRET_KEY` - Stripe 私鑰
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe 公開金鑰
- `STRIPE_WEBHOOK_SECRET` - Stripe Webhook 密鑰
- `NEXT_PUBLIC_SITE_URL` - 應用程式網址

## 後續實作建議

1. 安裝 Stripe SDK 以產生真實的付款連結：
   ```bash
   npm install stripe
   ```

2. 在環境變數中設定 Stripe 密鑰：
   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

3. 實作 Stripe Webhook 驗證以確保安全性

4. 在前端實作付款成功/失敗頁面

5. 實作使用者訂閱狀態管理

6. 添加取消訂閱功能

7. 實作訂閱管理頁面讓使用者可以查看和管理他們的訂閱

8. 實作方案升級/降級功能

9. 添加發票下載功能

10. 實作試用期功能