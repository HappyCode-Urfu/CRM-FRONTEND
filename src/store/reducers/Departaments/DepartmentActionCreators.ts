import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDepartment } from 'models/IDepartment.ts'
import { $api } from 'http/index.ts'
import { jwtDecode, JwtPayload } from 'jwt-decode'

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
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать филиал')
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
