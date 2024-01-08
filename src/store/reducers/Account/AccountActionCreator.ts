import { createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { $api } from 'http/index.ts'
import { toast } from 'react-toastify'

export const getInfoUser = createAsyncThunk('user/getInfoUser', async (_, thunkAPI) => {
  try {
    let token: JwtPayload
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('Access token not found')
    }
    // eslint-disable-next-line prefer-const
    token = jwtDecode(accessToken)
    const response = await $api.get(`accounts/user/${token.sub}`)
    console.log(response)
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data?.message)
  }
})

export const sendAvatar = createAsyncThunk<string, FormData>(
  'user/sendAvatarUrl',
  async (formData, thunkAPI) => {
    try {
      const { data } = await $api.post('accounts/upload-avatar', formData)
      toast('Изображение загружено')
      return data
    } catch {
      return thunkAPI.rejectWithValue('Не удалось отправить изображение изображение')
    }
  }
)
