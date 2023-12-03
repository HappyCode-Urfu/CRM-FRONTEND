import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDepartment } from 'models/IDepartment.ts'
import { $api } from 'http/index.ts'
import { jwtDecode, JwtPayload } from 'jwt-decode'

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
      let token: JwtPayload
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        throw new Error('Access token not found')
      }
      // eslint-disable-next-line prefer-const
      token = jwtDecode(accessToken)
      const response = await $api.post(`/departments/${token.sub}`, {
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
