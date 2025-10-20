// components/QuestionList.tsx
'use client'
import { useState } from 'react'
import type { Question } from '../stores/useSurveyStore'
import { useSurveyStore } from '../stores/useSurveyStore'
import Modal from './UI/Modal'
import QuestionForm from './QuestionForm'

type Mode = 'list' | 'answer'

export default function QuestionList({ mode = 'list' }: { mode?: Mode }) {
  const questions = useSurveyStore((s) => s.questions)
  const addQuestion = useSurveyStore((s) => s.addQuestion)
  const updateQuestion = useSurveyStore((s) => s.updateQuestion)
  const removeQuestion = useSurveyStore((s) => s.removeQuestion)

  const [editing, setEditing] = useState<Question | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div>
      <div className="space-y-4">
        {questions.length === 0 && (
          <div className="text-center py-8 text-slate-500">لا توجد أسئلة بعد</div>
        )}

        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-xl p-5 shadow-sm flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-medium text-slate-800">{idx + 1}. {q.text}</h3>
                <div className="text-sm text-slate-500">{q.type === 'radio' ? 'اختيار' : 'نص'}</div>
              </div>

              {q.type === 'radio' && q.options && (
                <div className="mt-3 flex gap-3 flex-wrap">
                  {q.options.map((o, i) => (
                    <div key={i} className="px-3 py-1 rounded bg-slate-50 text-slate-700 text-sm">
                      {o}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {mode !== 'answer' ? (
              <div className="flex flex-col items-start gap-2">
                <button
                  onClick={() => setEditing(q)}
                  className="px-4 py-2 rounded bg-slate-50 text-slate-800"
                >
                  تعديل
                </button>
                <button
                  onClick={() => {
                    if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return
                    removeQuestion(q.id)
                    // TODO: optionally sync delete with API here (DELETE /questions/:id)
                  }}
                  className="px-4 py-2 rounded text-red-600"
                >
                  حذف
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {mode !== 'answer' && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
          >
            + إضافة سؤال جديد
          </button>
        </div>
      )}

      {/* Create modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="سؤال جديد">
        <QuestionForm
          onCancel={() => setShowCreate(false)}
          onSave={(payload) => {
            addQuestion(payload)
            setShowCreate(false)
            // TODO: call POST /questions to persist to backend
          }}
        />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="تعديل السؤال">
        {editing && (
          <QuestionForm
            initial={editing}
            onCancel={() => setEditing(null)}
            onSave={(payload) => {
              updateQuestion(editing.id, payload as Partial<Question>)
              setEditing(null)
              // TODO: call PUT /questions/:id to sync with backend
            }}
          />
        )}
      </Modal>
    </div>
  )
}
