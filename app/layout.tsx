import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './components/auth-provider'

export const metadata: Metadata = {
  title: '去除 AI 味工具',
  description: '大學生專用文字改寫工具，去除 AI 生成的痕跡，讓文字更自然',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

