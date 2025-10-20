// app/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  // local mock state for template only
  const [questions] = useState([
    { id: 'q1', text: 'مثال سؤال 1' },
    { id: 'q2', text: 'مثال سؤال 2' },
  ])

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-light">لوحة التحكم - الأسئلة</h1>
        <div>
          <Link href="/survey">
            <button className="py-2 px-6 bg-teal-600 text-white rounded-md">عرض الاستبيان</button>
          </Link>
        </div>
      </header>

      <section className="bg-white shadow rounded-md p-6">
        <h2 className="text-xl mb-4">قائمة الأسئلة</h2>

        <ul className="space-y-3">
          {questions.map(q => (
            <li key={q.id} className="flex justify-between items-center border p-3 rounded">
              <span>{q.text}</span>
              <div className="space-x-3">
                <button className="text-sm px-3 py-1 border rounded">تعديل</button>
                <button className="text-sm px-3 py-1 border rounded">حذف</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            className="px-4 py-2 bg-white border rounded"
            onClick={() => {
              // TODO: Replace with Zustand action to add question.
              // Example: surveyStore.addQuestion(...)
              alert('Add question (only template) — connect to Zustand later')
            }}
          >
            إضافة سؤال
          </button>
        </div>
      </section>
    </div>
  )
}
