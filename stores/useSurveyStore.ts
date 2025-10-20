// stores/useSurveyStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuestionType = 'radio' | 'text'

export type Question = {
  id: number
  text: string
  type: QuestionType
  // optional: radio options (when type === 'radio')
  options?: string[]
}

export type Answer = {
  questionId: number
  answer: string
}

type SurveyState = {
  questions: Question[]
  answers: Answer[]

  addQuestion: (q: Omit<Question, 'id'>) => void
  updateQuestion: (id: number, updated: Partial<Question>) => void
  removeQuestion: (id: number) => void

  // answers
  addAnswer: (a: Answer) => void
  clearAnswers: () => void

  // helper to replace questions (for syncing with API)
  setQuestions: (qs: Question[]) => void
  // simple auth helper (mock)
  login: (username: string, password: string) => Promise<void>
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set, get) => ({
      questions: [
        // initial example questions (editable)
        { id: 1, text: 'ما رأيك في جودة الخدمة؟', type: 'radio', options: ['ممتاز', 'جيد', 'ضعيف'] },
        { id: 2, text: 'هل لديك اقتراحات؟', type: 'text' },
      ],
      answers: [],

      addQuestion: (q) =>
        set((s) => ({
          questions: [...s.questions, { id: Date.now(), ...q }],
        })),

      updateQuestion: (id, updated) =>
        set((s) => ({
          questions: s.questions.map((qq) => (qq.id === id ? { ...qq, ...updated } : qq)),
        })),

      removeQuestion: (id) =>
        set(() => ({ questions: get().questions.filter((q) => q.id !== id) })),

      addAnswer: (a) =>
        set((s) => ({
          answers: [...s.answers.filter((x) => x.questionId !== a.questionId), a],
        })),

      clearAnswers: () => set({ answers: [] }),

      setQuestions: (qs) => set({ questions: qs }),
      // simple mock login (store a token) — replace with real API call as needed
      login: async (username: string, password: string) => {
        // very small validation
        if (!username || !password) throw new Error('اسم المستخدم وكلمة المرور مطلوبة')
        // simulate async call
        await new Promise((res) => setTimeout(res, 300))
        // save a mock token in local storage and state (persist middleware will store it)
        try {
          if (typeof window !== 'undefined') localStorage.setItem('survey-token', 'mock-token')
        } catch {}
        return
      },
    }),
    {
      name: 'survey-storage-v1',
      // You can blacklist or whitelist fields e.g., whitelist: ['questions']
    }
  )
)
