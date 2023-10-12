import { $host } from '../../http'
import { IUser } from '../../models/IUser.ts'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await $host.get<IUser[]>('/users')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей')
    }
  }
)
