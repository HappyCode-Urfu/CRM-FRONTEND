import { $host } from '../../../http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEvents } from 'models/IEvents.ts'

export const getAllEvents = createAsyncThunk(
  'events/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await $host.get<IEvents[]>('/events')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить события')
    }
  }
)

export const postEvent = createAsyncThunk(
  'event/post',
  async ({ service_name, date, start_time, end_time }: IEvents, thunkAPI) => {
    try {
      const response = await $host.post<IEvents>('/events', {
        service_name,
        date,
        start_time,
        end_time,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать событие')
    }
  }
)
