import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDepartment } from 'models/IDepartment.ts'
import { $api } from 'http/index.ts'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { toast } from 'react-toastify'

export const postDepartment = createAsyncThunk(
  'department/Create',
  async (
    { name, businessArea, workMode, phoneNumber, location }: IDepartment,
    thunkAPI
  ) => {
    try {
      let token: JwtPayload
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return new Error('Access token not found')
      }
      // eslint-disable-next-line prefer-const
      token = jwtDecode(accessToken)
      const response = await $api.post<IDepartment>(`/departments/${token.sub}`, {
        name,
        businessArea,
        location,
        phoneNumber,
        workMode,
      })
      toast('Филиал создан')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать филиал')
    }
  }
)

interface IProps {
  departmentId: string
  data: IDepartment
}

export const updateDepartment = createAsyncThunk(
  'department/Update',
  async ({ departmentId, data }: IProps, thunkAPI) => {
    try {
      const response = await $api.put<IDepartment>(`/departments/${departmentId}`, {
        name: data.name,
        businessArea: data.businessArea,
        location: data.location,
        phoneNumber: data.phoneNumber,
        workMode: data.workMode,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать филиал')
    }
  }
)

export const delIdDepartment = createAsyncThunk(
  'department/Del',
  async ({ Id }: { Id: string }, thunkAPI) => {
    try {
      const response = await $api.delete(`/departments/${Id}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

export const getDepartment = createAsyncThunk(
  'department/GetAll',
  async (_, thunkAPI) => {
    try {
      let token: JwtPayload
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return new Error('Access token not found')
      }
      // eslint-disable-next-line prefer-const
      token = jwtDecode(accessToken)
      const response = await $api.get(`/departments/${token.sub}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const getIdDepartment = createAsyncThunk(
  'department/GetId',
  async ({ Id }: { Id: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.get(`/departments/info/${Id}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const addImageDepartment = createAsyncThunk(
  'department/addImage',
  async (
    { departmentId, formData }: { formData: FormData; departmentId: string },
    thunkAPI
  ) => {
    try {
      const response = await $api.post(`/departments/files/${departmentId}`, {
        formData,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const delImageDepartment = createAsyncThunk(
  'department/delImage',
  async ({ departmentId }: { departmentId: string }, thunkAPI) => {
    try {
      const response = await $api.delete(`/departments/files/${departmentId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)
