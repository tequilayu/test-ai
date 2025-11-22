import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: '未登入' }, { status: 401 })
    }

    const limitEnv = process.env.DAILY_USAGE_LIMIT
    const dailyLimit = Number.isFinite(Number(limitEnv)) && Number(limitEnv) > 0 ? Number(limitEnv) : 20
    const usageDate = new Date().toISOString().slice(0, 10)

    const { data: usageRow, error: usageError } = await supabase
      .from('daily_usage')
      .select('count')
      .eq('user_id', user.id)
      .eq('usage_date', usageDate)
      .maybeSingle()

    if (usageError) {
      return NextResponse.json({ error: '用量查詢失敗' }, { status: 500 })
    }

    const currentCount = usageRow?.count ?? 0
    if (currentCount >= dailyLimit) {
      return NextResponse.json({ error: '今日使用次數已達上限' }, { status: 429 })
    }

    const { text } = await request.json()

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: '請提供有效的文字內容' },
        { status: 400 }
      )
    }

    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY 環境變數未設定')
      return NextResponse.json(
        { error: 'API 配置錯誤，請聯繫管理員' },
        { status: 500 }
      )
    }

    const rewrittenText = await rewriteWithDeepSeek(text, apiKey)

    if (usageRow) {
      const { error: updateError } = await supabase
        .from('daily_usage')
        .update({ count: currentCount + 1 })
        .eq('user_id', user.id)
        .eq('usage_date', usageDate)
      if (updateError) {
        return NextResponse.json({ error: '用量更新失敗' }, { status: 500 })
      }
    } else {
      const { error: insertError } = await supabase
        .from('daily_usage')
        .insert({ user_id: user.id, usage_date: usageDate, count: 1 })
      if (insertError) {
        return NextResponse.json({ error: '用量建立失敗' }, { status: 500 })
      }
    }

    return NextResponse.json({ rewrittenText })
  } catch (error) {
    console.error('改寫錯誤:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '改寫過程中發生錯誤，請稍後再試' },
      { status: 500 }
    )
  }
}

async function rewriteWithDeepSeek(text: string, apiKey: string): Promise<string> {
  const prompt = `請將以下文字改寫，去除其中的 AI 生成痕跡，讓文字看起來更自然、更像人類書寫。保持原意不變，但使用更口語化、更生動的表達方式。避免使用過於正式的語調或重複的句式結構。

原始文字：
${text}

請直接輸出改寫後的文字，不需要額外的說明或標記：`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.error?.message || `API 請求失敗: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('API 響應格式錯誤')
    }

    const rewrittenText = data.choices[0].message.content.trim()

    if (!rewrittenText) {
      throw new Error('API 未返回有效的改寫結果')
    }

    return rewrittenText
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('調用 DeepSeek API 時發生未知錯誤')
  }
}





