import { createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { $host } from 'http/index.ts'

export const getInfoUser = createAsyncThunk('user/getInfoUser', async (_, thunkAPI) => {
  try {
    let token: JwtPayload
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('Access token not found')
    }
    // eslint-disable-next-line prefer-const
    token = jwtDecode(accessToken)
    const response = await $host.get(`accounts/user/${token.sub}`)
    console.log(response)
    return response.data
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response?.data?.message)
  }
})
