import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from 'http/index.ts'

export interface TUser {
  id: number
  avatar: string
  name: string
  surname: string
  patronymic: string
  email: string
  phoneNumber: string
  role: string
  hashPassword: string
  isActivated: boolean
  activationLink: string
  status: string
  city: string
  serviceId: number
}

export interface AuthState {
  user: TUser | null
  isLoading: boolean
  isError: boolean
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
}

export interface TLogin {
  email: string
  password: string
}

export const login = createAsyncThunk<TUser, TLogin, { rejectValue: string }>(
  'userReducer/login',
  async function (form, { rejectWithValue }) {
    try {
      const { data } = await $api.post<TUser & { accessToken: string }>(
        '/login',
        form
      )
      const { accessToken, ...user } = data
      localStorage.setItem('accessToken', accessToken)
      console.log(localStorage.getItem('accessToken'))
      return user
    } catch (e) {
      return rejectWithValue('Не удалось авторизоваться')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default authSlice.reducer
