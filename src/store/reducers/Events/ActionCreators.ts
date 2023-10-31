import { $host } from '../../../http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEvents } from '../../../models/IEvents.ts'

export const fetchEvents = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await $host.get<IEvents[]>('/events')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить события')
    }
  }
)
