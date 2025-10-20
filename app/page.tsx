import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="w-full max-w-[520px] mx-auto text-center">
        <div className="flex flex-col">
          <Link href="/login" className="btn-cta w-full">Login</Link>
          <Link href="/admin" className="btn-cta w-full">Admin</Link>
          <Link href="/survey" className="btn-cta w-full">Survey</Link>
          <Link href="/review" className="btn-cta w-full">Review</Link>
        </div>
      </div>
    </div>
  )
}
