// components/ProgressBar.tsx
export default function ProgressBar({ percent = 0 }: { percent?: number }) {
  const pct = Math.max(0, Math.min(100, percent))
  return (
    <div className="progress-outer" aria-hidden>
      <div className="progress-inner" style={{ width: `${pct}%` }} />
    </div>
  )
}
