export type daysNumb = '0' | '1' | '2' | '3' | '4' | '5' | '6'

export interface IEmployee<T extends daysNumb> {
  id?: string
  name: string
  email: string
  workDays: T[]
  workMode: {
    startTime: string | undefined
    endTime: string | undefined
  }
}
