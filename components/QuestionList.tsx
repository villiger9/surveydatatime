// components/QuestionList.tsx
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type Q = { id: string, text: string, options: string[] }

type FormData = Record<string, string>

export default function QuestionList({
  questions,
  register,
}: {
  questions: Q[]
  register: UseFormRegister<FormData>
}) {
  return (
    <div className="space-y-6">
  {questions.map((q) => (
        <div key={q.id} className="border-b pb-6">
          <h3 className="text-lg font-medium mb-3">{q.text}</h3>

          <div className="flex gap-6">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  {...register(q.id)}
                  type="radio"
                  value={opt}
                  className="h-4 w-4"
                />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
