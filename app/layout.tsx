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
      <body className="min-h-screen antialiased bg-white text-slate-800">
        {/* explicit flex-row and explicit order on children to prevent RTL re-ordering */}
        <div className="min-h-screen flex flex-row">
          {/* aside: left image column (fixed width) — explicit order-0 */}
          <aside className="w-[42%] min-h-screen order-0">
            <LeftPanel />
          </aside>

          {/* main content (right side). explicit order-1. keep RTL for text */}
          <main dir="rtl" className="flex-1 p-10 order-1">
            <div className="max-w-[880px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
