// components/QuestionForm.tsx
'use client'
import { useState } from 'react'
import type { Question, QuestionType } from '../stores/useSurveyStore'

type Props = {
  initial?: Partial<Question>
  onCancel: () => void
  onSave: (payload: Omit<Question, 'id'> | Question) => void
}

export default function QuestionForm({ initial = {}, onCancel, onSave }: Props) {
  const [text, setText] = useState(initial.text ?? '')
  const [type, setType] = useState<QuestionType>(initial.type ?? 'radio')
  const [options, setOptions] = useState<string[]>(
    initial.options ?? ['نعم', 'لا']
  )

  function updateOption(idx: number, val: string) {
    setOptions((s) => s.map((o, i) => (i === idx ? val : o)))
  }
  function addOption() {
    setOptions((s) => [...s, 'خيار جديد'])
  }
  function removeOption(idx: number) {
    setOptions((s) => s.filter((_, i) => i !== idx))
  }

  function handleSave(e?: React.FormEvent) {
    e?.preventDefault()
    const payload: Omit<Question, 'id'> = {
      text: text.trim(),
      type,
      options: type === 'radio' ? options.map((o) => o.trim()) : undefined,
    }
    onSave(payload)
  }

  return (
    <form onSubmit={(e) => handleSave(e)} dir="rtl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-700 mb-2">نص السؤال</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full input-ghost"
            placeholder="اكتب نص السؤال هنا"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-2">نوع السؤال</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="qtype"
                checked={type === 'radio'}
                onChange={() => setType('radio')}
              />
              <span>اختيار</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="qtype"
                checked={type === 'text'}
                onChange={() => setType('text')}
              />
              <span>نص حر</span>
            </label>
          </div>
        </div>

        {type === 'radio' && (
          <div>
            <label className="block text-sm text-slate-700 mb-2">الخيارات</label>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="input-ghost flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    className="px-3 py-2 rounded text-sm text-red-600"
                  >
                    حذف
                  </button>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={addOption}
                  className="px-4 py-2 rounded bg-slate-100 text-slate-800"
                >
                  إضافة خيار
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded text-slate-700">
            إلغاء
          </button>
          <button type="submit" className="px-6 py-2 rounded bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            حفظ
          </button>
        </div>
      </div>
    </form>
  )
}
