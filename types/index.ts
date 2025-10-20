export type PollAnswerOption = {
  id: number | string
  text: string
  points: number
}

export type PollQuestion = {
  id: number | string
  text: string
  answers: PollAnswerOption[]
}

export type Poll = {
  id: number | string
  title: string
  description?: string
  createdAt: string
  questions: PollQuestion[]
}

export type PaginatedPolls = {
  count: number
  next?: string | null
  previous?: string | null
  data: Poll[]
}
