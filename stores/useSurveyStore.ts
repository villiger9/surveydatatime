// stores/useSurveyStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware' // optional for localStorage persistence
import type { Question } from '../types' // create types/index.ts as earlier
import { postLogin } from '../lib/api'

type AnswerMap = Record<string, string>

type SurveyState = {
  // auth
  token: string | null
  setToken: (token: string | null) => void
  login: (username: string, password: string) => Promise<void>

  // survey data
  questions: Question[]
  setQuestions: (qs: Question[]) => void
  fetchQuestions: () => Promise<void>

  // answers
  answers: AnswerMap
  setAnswer: (qid: string, value: string) => void
  clearAnswers: () => void
}

export const useSurveyStore = create<SurveyState>(
  // Optional persist wrapper: if you want to enable persistence, wrap the
  // initializer with `persist(...)`. For now we call `create` directly so
  // TypeScript correctly infers the state shape.
  (set) => ({
    token: null,
    setToken: (token) => {
      set({ token })
      if (token) localStorage.setItem('token', token)
      else localStorage.removeItem('token')
    },

    login: async (username: string, password: string) => {
      // call API helper; store token
      // NOTE: postLogin throws on error - callers should catch
      const data = await postLogin({ username, password })
  const token = data?.access_token
      set({ token })
      if (token) localStorage.setItem('token', token)
    },

    questions: [],
    setQuestions: (qs) => set({ questions: qs }),
    fetchQuestions: async () => {
      // TODO: call fetchQuestions() from lib/api.ts
      // placeholder: set mock data for template
      set({
        questions: [
          { id: 'q1', text: 'ما رأيك بالخدمة؟', options: ['جيد', 'متوسط', 'ضعيف'] },
          { id: 'q2', text: 'هل توصي بنا؟', options: ['نعم', 'لا'] },
          { id: 'q3', text: 'تقييم السرعة', options: ['سريع', 'مقبول', 'بطيء'] },
        ],
      })
    },

    answers: {},
    setAnswer: (qid, value) =>
      set((s) => ({ answers: { ...s.answers, [qid]: value } })),
    clearAnswers: () => set({ answers: {} }),
  })
)
