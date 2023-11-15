import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import $api from 'http/index.ts'

interface

export const forgotPassword = createAsyncThunk<void, string, { rejectValue: string }>(
  'userReducer/login',
  async function (email, { rejectWithValue }) {
    try {
      const response = await $api.post<>('/accounts/forgot-password', email)
      return response.data
    } catch (e) {
      return rejectWithValue('Не удалось отправить email')
    }
  }
)

const forgotPasswordSlice = createSlice({
  name: 'forgot-password',
  initialState,
  reducers: {}
  extraReducers: (builder) => {
    builder
    .addCase(forgotPassword.pending, (state) => {

    })
  }
})
