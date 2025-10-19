// components/ReviewTable.tsx
export default function ReviewTable({ rows }: { rows: { id: string, question: string, answer: string }[] }) {
  return (
    <div>
      <div className="mb-4">
        <input placeholder="بحث..." className="border p-2 rounded w-full" />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">السؤال</th>
            <th className="py-2">الإجابة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-b">
              <td className="py-3">{r.question}</td>
              <td className="py-3">{r.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
