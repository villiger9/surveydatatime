// app/survey/page.tsx (adjust)
'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import QuestionList from '../../components/QuestionList'
import ProgressBar from '../../components/ProgressBar'
import { useSurveyStore } from '../../stores/useSurveyStore'
import { useRouter } from 'next/navigation'

type FormValues = Record<string, string>

export default function SurveyPage() {
  const questions = useSurveyStore((s) => s.questions)
  const fetchQuestions = useSurveyStore((s) => s.fetchQuestions)
  const setAnswer = useSurveyStore((s) => s.setAnswer)
  const router = useRouter()

  useEffect(() => {
    if (questions.length === 0) fetchQuestions()
  }, [fetchQuestions, questions.length])

  const { register, handleSubmit } = useForm<FormValues>()

  function onSubmit(values: FormValues) {
    // Save each answer to the store
    Object.entries(values).forEach(([qid, value]) => {
      setAnswer(qid, value)
    })

    // TODO: post to backend with postAnswers(...) in lib/api.ts,
    // using token from store if needed.

    router.push('/review')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <QuestionList questions={questions} register={register} />
        <div className="flex items-center justify-between mt-8">
          <div className="w-1/3">
            <ProgressBar percent={50} />
          </div>
          <div>
            <button className="px-10 py-3 bg-teal-600 text-white rounded-lg">التالي</button>
          </div>
        </div>
      </form>
    </div>
  )
}
