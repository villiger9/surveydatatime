// components/QuestionList.tsx
'use client'
import { useState, useMemo } from 'react'
import type { Question } from '../stores/useSurveyStore'
import { useSurveyStore } from '../stores/useSurveyStore'
import Modal from './UI/Modal'
import QuestionForm from './QuestionForm'

type Props = {
  mode?: 'admin' | 'answer'
}

export default function QuestionList({ mode = 'admin' }: Props) {
  const questions = useSurveyStore((s) => s.questions)
  const addQuestion = useSurveyStore((s) => s.addQuestion)
  const updateQuestion = useSurveyStore((s) => s.updateQuestion)
  const removeQuestion = useSurveyStore((s) => s.removeQuestion)
  const answers = useSurveyStore((s) => s.answers)
  const addAnswer = useSurveyStore((s) => s.addAnswer)

  const [editing, setEditing] = useState<Question | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  // helper to get current answer value for a question
  const getAnswer = (qid: number) => {
    const a = answers.find((x) => x.questionId === qid)
    return a ? a.answer : ''
  }

  // handler for radio change
  const onRadioChange = (qid: number, value: string) => {
    addAnswer({ questionId: qid, answer: value })
  }

  // handler for text change
  const onTextChange = (qid: number, value: string) => {
    addAnswer({ questionId: qid, answer: value })
  }

  return (
    <div dir="rtl">
      <div className="space-y-0">
        {questions.length === 0 && (
          <div className="text-center py-8 text-slate-500">لا توجد أسئلة بعد</div>
        )}

        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white">
            {/* question row */}
            <div className="p-5 flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-medium text-slate-800">
                    <span className="text-slate-400 mr-3">{idx + 1}.</span>
                    {q.text}
                  </h3>

                  {/* icon actions: only in admin mode */}
                  {mode === 'admin' && (
                    <div className="flex items-center gap-2">
                      <button
                        title="تعديل"
                        onClick={() => setEditing(q)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100"
                      >
                        {/* pen icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                          <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M14 4l6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      <button
                        title="حذف"
                        onClick={() => {
                          if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return
                          removeQuestion(q.id)
                        }}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-50"
                      >
                        {/* bin icon */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-500">
                          <path d="M3 6h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 6l-1-3H6L5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* answer UI (for mode === 'answer') */}
                {mode === 'answer' && q.type === 'radio' && q.options && (
                  <div className="mt-4 flex flex-col gap-3">
                    {q.options.map((opt, i) => (
                      <label key={i} className="inline-flex items-center gap-3 text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={opt}
                          className="h-4 w-4 accent-[#0b8b8f]"
                          checked={getAnswer(q.id) === opt}
                          onChange={() => onRadioChange(q.id, opt)}
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {mode === 'answer' && q.type === 'text' && (
                  <div className="mt-3">
                    <textarea
                      placeholder="اكتب إجابتك..."
                      className="input-ghost"
                      rows={4}
                      value={getAnswer(q.id)}
                      onChange={(e) => onTextChange(q.id, e.target.value)}
                    />
                  </div>
                )}

                {/* preview UI for admin (read-only-like preview but not editable) */}
                {mode === 'admin' && q.type === 'radio' && q.options && (
                  <div className="mt-4 flex flex-col gap-3">
                    {q.options.map((opt, i) => (
                      <label key={i} className="inline-flex items-center gap-3 text-slate-700">
                        <input
                          type="radio"
                          name={`preview-${q.id}`}
                          value={opt}
                          className="h-4 w-4 accent-[#0b8b8f]"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {mode === 'admin' && q.type === 'text' && (
                  <div className="mt-3">
                    <input placeholder="نص الإجابة..." className="input-ghost" readOnly />
                  </div>
                )}
              </div>
            </div>

            {/* separator line between questions (except after last) */}
            {idx !== questions.length - 1 && <div className="border-t border-slate-100" />}
          </div>
        ))}
      </div>

      {/* admin-only create button */}
      {mode === 'admin' && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowCreate(true)}
            className="btn-cta w-full max-w-xs mx-auto block mt-10"
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
            // TODO: sync to API (POST /questions) if you add backend
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
              // TODO: sync to API (PUT /questions/:id)
            }}
          />
        )}
      </Modal>
    </div>
  )
}
