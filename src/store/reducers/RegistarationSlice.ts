import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Guid } from 'guid-typescript'

interface RegistrationState {
  isLoading: boolean
  isError: boolean
}

const initialState: RegistrationState = {
  isLoading: false,
  isError: false,
}

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

export interface ResponseData {
  data: UserData
  status: number
}

export const registerUser = createAsyncThunk<
  ResponseData,
  TRegister,
  { rejectValue: string }
>('registrationSlice/register', async (userData: TRegister, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'http://localhost:10000/api/v1/accounts/register',
      userData
    )
    return { data: response.data, status: response.status }
  } catch (error) {
    return rejectWithValue('Пользователь уже зарегистрирован')
  }
})

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default registrationSlice.reducer
