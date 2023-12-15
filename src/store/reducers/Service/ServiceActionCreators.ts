import { createAsyncThunk } from '@reduxjs/toolkit'
import { $api } from 'http/index.ts'
import { IService } from 'models/IService.ts'

export const getAllServices = createAsyncThunk(
  'services/GetAll',
  async ({ categoryId }: { categoryId: string }, thunkAPI) => {
    try {
      const response = await $api.get(`/services/categories/${categoryId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

export const getIdService = createAsyncThunk(
  'services/GetId',
  async ({ serviceId }: { serviceId: string }, thunkAPI) => {
    try {
      const response = await $api.get(`/services/${serviceId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

interface IProps {
  categoryId: string
  data: IService
}

export const createService = createAsyncThunk(
  'services/Post',
  async ({ categoryId, data }: IProps, thunkAPI) => {
    try {
      const response = await $api.post(`/services/${categoryId}`, {
        name: data.name,
        priceFrom: data.priceFrom,
        priceTo: data.priceTo,
        duration: data.duration,
        isOnlineAvailable: data.isOnlineAvailable,
        onlineNameRecord: data.onlineNameRecord,
        description: data.description,
        serviceType: data.serviceType,
        imageUrl: data.imageUrl,
        downloadLink: data.downloadLink,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)
