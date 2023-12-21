import { createAsyncThunk } from '@reduxjs/toolkit'
import { $api } from 'http/index.ts'
import { IService } from 'models/IService.ts'

export const getAllServices = createAsyncThunk(
  'services/GetAll',
  async ({ categoryId }: { categoryId: string | undefined }, thunkAPI) => {
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
  async ({ serviceId }: { serviceId: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.get(`/services/${serviceId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

interface IProps {
  Id: string | undefined
  data: IService
}

export const createService = createAsyncThunk(
  'services/Post',
  async ({ Id, data }: IProps, thunkAPI) => {
    try {
      const response = await $api.post(`/services/${Id}`, {
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

export const updateService = createAsyncThunk(
  'services/Put',
  async ({ Id, data }: IProps, thunkAPI) => {
    try {
      const response = await $api.put(`/services/${Id}`, {
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

export const delIdService = createAsyncThunk(
  'services/Del',
  async ({ Id }: { Id: string }, thunkAPI) => {
    try {
      const response = await $api.delete(`/services/${Id}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

export const addImageService = createAsyncThunk(
  'services/addImage',
  async (
    { serviceId, formData }: { formData: FormData; serviceId: string },
    thunkAPI
  ) => {
    try {
      const response = await $api.post(`/services/image/${serviceId}`, {
        formData,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const delImageService = createAsyncThunk(
  'services/delImage',
  async ({ serviceId }: { serviceId: string }, thunkAPI) => {
    try {
      const response = await $api.delete(`/services/image/${serviceId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)
