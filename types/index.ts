export type Question = {
  id: string
  text: string
  options: string[]
}

export type Answer = {
  questionId: string
  value: string
}
