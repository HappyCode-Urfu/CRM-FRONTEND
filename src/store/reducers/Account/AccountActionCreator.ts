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
      localStorage.setItem('avatarUrl', data)
      return data
    } catch {
      return thunkAPI.rejectWithValue('Не удалось отправить изображение изображение')
    }
  }
)

interface TUpdate {
  id: string
  values: { name: string; email: string; city: string }
}

export const updateUserInfo = createAsyncThunk(
  'user/updateUser',
  async ({ id, values }: TUpdate, thunkAPI) => {
    try {
      const response = await $api.put(`accounts/update-info/${id}`, {
        name: values.name,
        email: values.email,
        city: values.city,
      })
      toast('Личные данные обновлены')
      return response.data
    } catch {
      thunkAPI.rejectWithValue('Не удалось обновить личные данные')
    }
  }
)
