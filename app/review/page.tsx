// app/review/page.tsx
'use client'
import ReviewTable from '../../components/ReviewTable'
import { useSurveyStore } from '../../stores/useSurveyStore'

export default function ReviewPage() {
  const answers = useSurveyStore((s) => s.answers)
  const questions = useSurveyStore((s) => s.questions)

  // transform to rows for table
  const rows = Object.entries(answers).map(([qid, answer]) => {
    const qidNum = Number(qid)
    const q = questions.find((x) => x.id === qidNum)
    return { id: qid, question: q?.text ?? qid, answer: answer.answer }
  })

  return (
    <div>
      <h1 className="text-3xl mb-6 text-right">مراجعة الردود</h1>
      <ReviewTable rows={rows} />
    </div>
  )
}
