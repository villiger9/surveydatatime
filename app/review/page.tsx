'use client'

import { useEffect, useState } from 'react'

interface Poll {
  id: number
  created_at: string
  user_id: number | null
  answers: Record<string, string>
}

export default function ReviewPage() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPolls() {
      try {
        const res = await fetch(
          'https://poll-rs4it-test.rs-developing.com/admin/poll/?page=1&pagesize=10&joinOperator=and'
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        // Adjust based on actual response shape (inspect Swagger response)
        setPolls(data.results || data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPolls()
  }, [])

  return (
    <div className="px-12 py-10" dir="rtl">
      <h1 className="text-4xl font-light mb-10 text-slate-800">
        استعراض الاستبيانات
      </h1>

      {loading && <div>جار التحميل...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="bg-slate-50 rounded-2xl shadow-inner p-8 overflow-x-auto">
          <table className="min-w-full text-right">
            <thead>
              <tr className="text-slate-600 border-b">
                <th className="py-3 px-4 font-normal">#</th>
                <th className="py-3 px-4 font-normal">المستخدم</th>
                <th className="py-3 px-4 font-normal">تاريخ الإنشاء</th>
                <th className="py-3 px-4 font-normal">الإجابات</th>
              </tr>
            </thead>
            <tbody>
              {polls.length > 0 ? (
                polls.map((poll, idx) => (
                  <tr
                    key={poll.id}
                    className="border-b last:border-none hover:bg-slate-100"
                  >
                    <td className="py-3 px-4 text-slate-700">{idx + 1}</td>
                    <td className="py-3 px-4 text-slate-700">
                      {poll.user_id || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {new Date(poll.created_at).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {Object.entries(poll.answers || {}).map(
                        ([q, a], i) => (
                          <div key={i}>
                            <span className="text-slate-500">{q}: </span>
                            {a}
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-slate-500"
                  >
                    لا توجد استبيانات حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
