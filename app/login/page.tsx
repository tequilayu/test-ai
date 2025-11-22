import { LoginForm } from '../components/login-form'
import { ThemeToggle } from '../components/theme-toggle'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors">
      <div className="max-w-md mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
            登錄
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            登錄您的帳號以使用去除 AI 味工具
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}





