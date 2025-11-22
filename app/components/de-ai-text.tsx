'use client'

import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import { useAuth } from './auth-provider'
import Link from 'next/link'

export function DeAIText() {
  const { user, loading, signOut } = useAuth()
  const [originalText, setOriginalText] = useState('')
  const [rewrittenText, setRewrittenText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRewrite = async () => {
    if (!originalText.trim()) {
      setError('請輸入文字內容')
      return
    }

    setIsLoading(true)
    setError(null)
    setRewrittenText('')

    try {
      const response = await fetch('/api/de-ai-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: originalText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '改寫失敗')
      }

      const data = await response.json()
      setRewrittenText(data.rewrittenText)
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生未知錯誤')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setOriginalText('')
    setRewrittenText('')
    setError(null)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rewrittenText)
      alert('已複製到剪貼簿')
    } catch (err) {
      setError('複製失敗，請手動複製')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">載入中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors">
        <div className="max-w-md mx-auto">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              請先登錄
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              您需要登錄才能使用去除 AI 味工具
            </p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
              >
                登錄
              </Link>
              <Link
                href="/signup"
                className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                註冊
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              登出
            </button>
          </div>
          <ThemeToggle />
        </div>
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors">
            去除 AI 味工具
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors">
            將 AI 生成的文字改寫得更自然、更像人類書寫
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 transition-colors">
              原始文字
            </h2>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="請在此輸入需要去除 AI 味的文字..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleRewrite}
                disabled={isLoading}
                className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? '改寫中...' : '去除 AI 味'}
              </button>
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
              >
                清除
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 transition-colors">
              改寫後文字
            </h2>
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400 transition-colors">
                {error}
              </div>
            )}
            {isLoading && (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors">正在去除 AI 味...</p>
                </div>
              </div>
            )}
            {!isLoading && rewrittenText && (
              <>
                <div className="h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 overflow-y-auto transition-colors">
                  <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 transition-colors">
                    {rewrittenText}
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className="mt-4 w-full bg-green-600 dark:bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium"
                >
                  複製結果
                </button>
              </>
            )}
            {!isLoading && !rewrittenText && !error && (
              <div className="h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 flex items-center justify-center transition-colors">
                <p className="text-gray-400 dark:text-gray-500 transition-colors">
                  改寫後的文字將顯示在這裡
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 transition-colors">
            使用說明
          </h3>
          <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm transition-colors">
            <li>• 在左側輸入框中貼上需要改寫的文字</li>
            <li>• 點擊「去除 AI 味」按鈕開始改寫</li>
            <li>• 改寫完成後，右側會顯示改寫後的文字</li>
            <li>• 點擊「複製結果」按鈕即可複製改寫後的文字</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

