import { createAsyncThunk } from '@reduxjs/toolkit'
import qs from 'qs'
import axios from 'axios'
import { ResponseLogin, TLogin, Token } from 'models/Auth.ts'
import { toast } from 'react-toastify'

export const login = createAsyncThunk<ResponseLogin, TLogin, { rejectValue: string }>(
  'userReducer/login',
  async function (form, { rejectWithValue }) {
    try {
      const options = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(form),
        url: 'http://localhost:10001/connect/token',
        method: 'POST',
      }

      const { data, status } = await axios<Token>(options)
      const { access_token, refresh_token } = data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      toast('Вход прошёл успешно')
      return { data, status }
    } catch (e) {
      return rejectWithValue('Не удалось авторизоваться')
    }
  }
)
