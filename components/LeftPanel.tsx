// components/LeftPanel.tsx
'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function LeftPanel() {
  const pathname = usePathname()
  const routeNameMap: Record<string, string> = {
    '/': '',
    '/login': 'تسجيل الدخول',
    '/admin': 'لوحة التحكم',
    '/survey': 'الاستبيان',
    '/review': 'الاستعراض',
  }
  const title = routeNameMap[pathname] ?? pathname.replace('/', '')
  const showProgress = pathname === '/survey'
  const percent = showProgress ? 50 : 0

  return (
    <div className="left-panel-root">
  <Image src="/left.jpg" alt="bg" fill className="left-panel-image" priority />
      <div className="left-panel-overlay" />
      <div className="left-panel-content">
        <div style={{ maxWidth: '70%' }}>
          <h1 className="left-panel-title">{title}</h1>
          {showProgress && (
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
          )}
        </div>
      </div>
    </div>
  )
}
