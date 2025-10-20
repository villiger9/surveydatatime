// app/survey/page.tsx
'use client'

import { useState } from 'react'
import QuestionList from '@/components/QuestionList'

export default function SurveyPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="px-12 py-10" dir="rtl">
      <h1 className="text-4xl font-light mb-10 text-slate-800">الاستبيان</h1>

      <div className="bg-white rounded-2xl shadow p-10">
        <QuestionList mode="answer" />
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            className="btn-cta w-full mt-10"
          >
            إرسال الإجابات
          </button>
        ) : (
          <div className="text-center text-green-700 text-lg mt-6">تم إرسال الإجابات بنجاح ✅</div>
        )}
      </div>
    </div>
  )
}
