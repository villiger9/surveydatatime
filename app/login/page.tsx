// app/login/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSurveyStore } from '../../stores/useSurveyStore'

export default function LoginPage() {
  const login = useSurveyStore((s) => s.login)
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      router.push('/survey')
    } catch (err: unknown) {
      // narrow unknown to Error to safely read message (avoids `any` lint rule)
      const message = err instanceof Error ? err.message : String(err ?? 'فشل في تسجيل الدخول')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[82vh] flex items-center">
      <div className="w-full max-w-[760px] mx-auto">
        <h2 className="page-hero">أهلاً بك</h2>

        <form onSubmit={handleSubmit} className="form-root relative space-y-6">
          <div>
            <label className="form-label">اسم المستخدم أو الإيميل</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="youremail@guru.com"
              className="input-ghost"
            />
          </div>

          <div className="relative">
            <label className="form-label">كلمة المرور</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              type={showPass ? 'text' : 'password'}
              className="input-ghost"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label="toggle password"
              className="input-icon"
            >
              {showPass ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9l-6 6" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 3l18 18" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>

          {error && <div className="text-right text-red-600">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-cta"
            >
              {loading ? 'جارٍ...' : 'تسجيل دخول'}
            </button>
          </div>

          <div className="text-right mt-1">
            <a className="helper-link">تواصل معنا</a>
          </div>
        </form>
      </div>
    </div>
  )
}
