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
    } catch (err: any) {
      setError(err?.message || 'فشل في تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[82vh] flex items-center">
      <div className="w-full max-w-[760px] mx-auto">
        <h2 className="text-[3.6rem] font-light text-right mb-8">أهلاً بك</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-right mb-2">اسم المستخدم أو الإيميل</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="youremail@guru.com"
              className="w-full p-6 rounded-md bg-gray-100 placeholder:text-gray-400 text-right outline-none shadow-none"
              style={{ border: 'none' }}
            />
          </div>

          <div className="relative">
            <label className="block text-right mb-2">كلمة المرور</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              type={showPass ? 'text' : 'password'}
              className="w-full p-6 pr-14 rounded-md bg-gray-100 placeholder:text-gray-400 text-right outline-none shadow-none"
              style={{ border: 'none' }}
            />

            {/* Eye button positioned at right (works with RTL). z-20 so it sits above the input */}
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label="toggle password visibility"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-gray-500"
            >
              {showPass ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9l-6 6" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
              className="w-full py-5 rounded-lg text-xl font-light"
              style={{ background: 'linear-gradient(90deg,#0b8b8f,#007d82)', color: 'white', fontFamily: 'inherit' }}
            >
              {loading ? 'جارٍ...' : 'تسجيل دخول'}
            </button>
          </div>

          <div className="text-right mt-1">
            <a className="text-teal-700 underline">تواصل معنا</a>
          </div>
        </form>
      </div>
    </div>
  )
}
