import { Guid } from 'guid-typescript'

export interface TRegister {
  name: string
  email: string
  password: string
}

interface UserData {
  id: Guid
  name: string
  surname: string
  patronymic: string
  city: string | null
  description: string | null
  avatarUrl: string | null
  downloadLink: string | null
  email: string
  emailConfirmed: boolean
}

export interface ResponseRegistration {
  data: UserData
  status: number
}
