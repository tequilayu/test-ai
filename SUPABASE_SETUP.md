# Supabase 配置说明

## 环境变量配置

您需要在 `.env.local` 文件中配置以下环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 获取 Supabase 配置信息

1. 登录到 [Supabase Dashboard](https://app.supabase.com/)
2. 选择您的项目
3. 进入 **Settings** > **API**
4. 复制以下信息：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 当前配置

根据您提供的信息：
- Project ID: `clyoayafdllpqfotwbqf`
- Project URL: `https://clyoayafdllpqfotwbqf.supabase.co`
- Publishable Key: `sb_publishable_SXdx9ElnLc7t27WU20UALw_ADeZyjA2`
- Secret Key: `sb_secret_2_aB9pUryU4cr9sqLfNmiQ_YucFCt9c`

**注意**：
- `NEXT_PUBLIC_SUPABASE_URL` 已配置为：`https://clyoayafdllpqfotwbqf.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 已配置为您的 publishable key
- Secret key 应该只在服务器端使用，不要放在客户端环境变量中
- 如果 publishable key 格式不正确，请从 Supabase Dashboard > Settings > API 中获取标准的 anon key（通常是 JWT token 格式）

## 启用 Email 认证

1. 在 Supabase Dashboard 中，进入 **Authentication** > **Providers**
2. 确保 **Email** 提供者已启用
3. 配置 **Email Templates**（可选）
4. 在 **Authentication** > **URL Configuration** 中设置：
   - **Site URL**: `http://localhost:3000` (开发环境)
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

## 测试

1. 启动开发服务器：`npm run dev`
2. 访问注册页面：`http://localhost:3000/signup`
3. 创建新账号
4. 检查邮箱以确认账号（如果启用了邮箱确认）
5. 登录并测试功能

