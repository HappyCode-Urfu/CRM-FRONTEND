import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import qs from 'qs'
import axios from 'axios'

export interface AuthState {
  isLoading: boolean
  isError: boolean
}

interface Token {
  access_token: string
  refresh_token: string
}

export const initialState: AuthState = {
  isLoading: false,
  isError: false,
}

export interface TLogin {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
}

export interface Response {
  data: Token
  status: number
}

export const login = createAsyncThunk<Response, TLogin, { rejectValue: string }>(
  'userReducer/login',
  async function (form, { rejectWithValue }) {
    try {
      const options = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(form),
        url: 'http://localhost:10001/connect/token',
        method: 'POST',
      }

      console.log(options)
      const { data, status } = await axios<Token>(options)
      const { access_token, refresh_token } = data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      console.log(data)
      return { data, status }
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
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default authSlice.reducer
