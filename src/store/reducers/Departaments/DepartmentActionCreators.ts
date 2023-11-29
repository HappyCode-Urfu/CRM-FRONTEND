import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDepartment } from 'models/IDepartment.ts'
import { $host } from 'http/index.ts'

export const postDepartment = createAsyncThunk(
  'event/post',
  async (
    {
      name,
      businessArea,
      categoryName,
      country,
      city,
      workMode,
      phoneNumber,
      location,
    }: IDepartment,
    thunkAPI
  ) => {
    try {
      const response = await $host.post<IDepartment>('/department', {
        name,
        businessArea,
        categoryName,
        country,
        city,
        location: {
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude,
          zoom: location.zoom,
        },
        phoneNumber,
        workMode,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать событие')
    }
  }
)

export const getDepartment = createAsyncThunk(
  'department/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await $host.get<IDepartment>('/department')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить филиалы')
    }
  }
)
