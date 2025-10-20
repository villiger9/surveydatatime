// components/LeftPanel.tsx
'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ProgressBar from './ProgressBar'

export default function LeftPanel() {
  const pathname = usePathname()
  const title = pathname === '/login' ? 'تسجيل الدخول' : 'عنوان الأستطلاع'
  const subtitle = pathname === '/login' ? 'شرح بسيط' : 'شرح عن الأستطلاع'
  const percent = pathname === '/login' ? 0 : 50

  return (
    <div className="left-panel-root">
  {/* use the SVG fallback present in public/; Next expects public assets to be referenced from the web root */}
  <Image src="/left.jpg" alt="bg" fill className="left-panel-image" priority />
      <div className="left-panel-overlay" />
      <div className="left-panel-content">
        <div style={{ maxWidth: '70%' }}>
          <h1 className="left-panel-title">{title}</h1>
          <p className="left-panel-sub">{subtitle}</p>

          <div className="left-progress-row">
            <div>
              <div className="left-progress-label">الخطوة الاولى</div>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{percent}% تم استكمال</div>
                </div>
                <div className="progress-outer" aria-hidden>
                  <div className="progress-inner" style={{ width: `${percent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
