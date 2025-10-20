"use client"

import { useEffect, useState } from "react"
import type { Poll, PaginatedPolls, PollQuestion, PollAnswerOption } from "../../types"
import { fetchPolls } from "../../lib/api"
import Image from "next/image"

export default function ReviewPage() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pagesize] = useState(10)
  const [tokenInput, setTokenInput] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('survey-token') ?? '' : ''
  )
  const [savedToken, setSavedToken] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('survey-token') ?? '' : ''
  )
  const [selectedQuestion, setSelectedQuestion] = useState<{
    question: PollQuestion
    pollTitle: string
  } | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        // localStorage token; fallback to public env var
        const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem("survey-token") : undefined
        const token = tokenFromStorage ?? (process.env.NEXT_PUBLIC_SURVEY_TOKEN ?? undefined)
        const data: PaginatedPolls = await fetchPolls(page, pagesize, token ?? undefined)
        if (!mounted) return
        setPolls(data.data || [])
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message)
        else setError(String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [page, pagesize])

  return (
    <div className="px-12 py-10" dir="rtl">
  <h1 className="text-4xl font-light mb-6 text-slate-800">استعراض الاستبيانات</h1>

      {loading && <div>جار التحميل...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="text-slate-600 border-b">
                  <th className="py-3 px-4 font-normal">ID</th>
                  <th className="py-3 px-4 font-normal">Title</th>
                  <th className="py-3 px-4 font-normal">Description</th>
                  <th className="py-3 px-4 font-normal">Creation Date</th>
                </tr>
              </thead>
              <tbody>
                {polls.map((poll) => (
                  <tr key={poll.id} className="border-b hover:bg-slate-50">
                    <td className="py-4 px-4 text-slate-800">{poll.id}</td>
                    <td className="py-4 px-4 text-slate-800">{poll.title}</td>
                    <td className="py-4 px-4 text-slate-500">{poll.description}</td>
                    <td className="py-4 px-4 text-slate-500">{new Date(poll.createdAt).toLocaleString('ar-SA')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 border rounded disabled:opacity-50"
            >
              السابق
            </button>
            <div>صفحة {page}</div>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-2 border rounded"
            >
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
