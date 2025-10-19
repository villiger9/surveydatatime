// components/ProgressBar.tsx
export default function ProgressBar({ percent = 0 }: { percent?: number }) {
  const pct = Math.max(0, Math.min(100, percent))
  return (
    <div className="w-full bg-white/25 rounded-full h-3">
      <div
        className="h-3 rounded-full"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg,#0b8b8f,#007d82)',
          transition: 'width .4s',
        }}
      />
    </div>
  )
}
