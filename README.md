surveydatatime

A small Next.js (App Router) demo app for collecting and reviewing survey/poll data.

---

## Project idea / فكرة المشروع

🧩 فكرة المشروع: نظام استبيانات بسيط

إنشاء نظام استبيانات مع واجهة للإدارة والإجابة على الأسئلة، وعرض الإجابات في جدول.

English summary: Build a lightweight survey system with an Admin UI to manage questions, a Survey UI to collect responses, and a Review UI to display and export responses.

---

## ✅ المهام المطلوبة / Required deliverables

- الصفحة الرئيسية (Admin): إنشاء واجهة لإدارة الأسئلة مع تخزين البيانات باستخدام Zustand
- صفحة الاستبيان (Survey): عرض الأسئلة وجمع الإجابات باستخدام React Hook Form
- صفحة الاستعراض (Review): عرض الإجابات في جدول مع إمكانية التصفية والبحث
- ملف README: شرح الإعداد والتشغيل

Tech checklist (short): Next.js, Tailwind CSS, TypeScript, Zustand, React Hook Form

---

## What this repo contains

- Next.js (App Router) + TypeScript + Tailwind CSS
- Zustand store for app state and simple auth/token handling
- API helper in `lib/api.ts` (includes `fetchPolls` for the review page)
- Review page: `app/review/page.tsx` — paginated table
- Left panel: `components/LeftPanel.tsx` and question rendering in `components/QuestionList.tsx`

---

## Quick start (Windows PowerShell)

Install dependencies:

```powershell
cd <project-directory>
npm install
```

The app will also read a token from `localStorage` under the key `survey-token`.

Run the dev server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
npm run start
```

---

## API / Backend notes

- The app uses a small API helper in `lib/api.ts`. The review page calls `fetchPolls(page, pageSize, token?)` which expects the backend endpoint `GET /admin/poll/` returning paginated polls.
- The API uses `Authorization: Bearer <token>` when the token is provided. The code looks for a token in `localStorage` (key `survey-token`) and falls back to `NEXT_PUBLIC_SURVEY_TOKEN` from `.env.local` for development convenience.

---

## Folder map

- `app/` — Next.js App Router pages and layout (survey, review, admin, login)
- `components/` — reusable UI (LeftPanel, QuestionList, ProgressBar, etc.)
- `lib/api.ts` — API helper and `fetchPolls`
- `stores/useSurveyStore.ts` — Zustand store for questions/answers and token management
- `types/` — TypeScript domain types (Poll, Question, etc.)

---

## Notes, linting

- Linting: the project uses TypeScript and ESLint. Some non-blocking warnings may appear for unused imports.

---

## Extending and next steps

- Add a detailed poll page at `app/review/poll/[pollId]/page.tsx`
- Add filtering and server-side search on the review page for large datasets.
- Persist question definitions to a real backend or localStorage for long-term storage.

---
