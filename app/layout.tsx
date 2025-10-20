// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import LeftPanel from '../components/LeftPanel'

export const metadata = {
  title: 'Survey App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen antialiased bg-white text-slate-900">
        <div className="app-layout-root min-h-screen">
          <aside className="app-leftpanel w-[29%] min-h-screen">
            <LeftPanel />
          </aside>

          <main dir="rtl" className="app-main flex-1 p-12">
            <div className="max-w-[900px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
