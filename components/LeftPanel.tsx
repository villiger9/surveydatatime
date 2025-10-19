// components/LeftPanel.tsx
'use client'
import Image from 'next/image'
import ProgressBar from './ProgressBar'
import { usePathname } from 'next/navigation'

export default function LeftPanel({
  titleProp,
  subtitle = 'شرح عن الأستطلاع',
  percent = 50,
}: {
  titleProp?: string
  subtitle?: string
  percent?: number
}) {
  const pathname = usePathname()
  // show "تسجيل الدخول" when on /login, otherwise default to provided prop or "عنوان الأستطلاع"
  const title = titleProp ?? (pathname === '/login' ? 'تسجيل الدخول' : 'عنوان الأستطلاع')

  return (
    <div className="relative h-full">
      <Image src="/left-bg.jpg" alt="left background" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
        <div className="max-w-[70%]">
          <h1 className="text-[4rem] leading-tight font-light">{title}</h1>
          <p className="mt-4 text-sm opacity-80">{subtitle}</p>

          <div className="mt-8">
            <p className="text-xs opacity-80">الخطوة الاولى</p>
            <div className="mt-2 flex items-center">
              <span className="text-lg font-semibold mr-3">{percent}% تم استكمال</span>
            </div>
            <div className="mt-4">
              <ProgressBar percent={percent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
