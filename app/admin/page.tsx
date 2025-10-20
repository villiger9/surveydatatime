// app/admin/page.tsx
'use client'
import QuestionList from '../../components/QuestionList'

export default function AdminPage() {
  return (
    <div className="px-12 py-10" dir="rtl">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-light text-slate-800">إدارة الأسئلة</h1>
        <div className="text-right text-sm text-slate-500">
          <div>مثال: التحكم بالأسئلة وعودة الردود</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 shadow-inner">
        <QuestionList />
      </div>
    </div>
  )
}
