import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ResponseRegistration, TRegister } from 'models/Registration.ts'

export const registerUser = createAsyncThunk<
  ResponseRegistration,
  TRegister,
  { rejectValue: string }
>(
  'registrationSlice/register',
  async function (userData: TRegister, { rejectWithValue }) {
    try {
      const response = await axios.post(
        'http://localhost:10000/api/v1/accounts/register',
        userData
      )
      return { data: response.data, status: response.status } as ResponseRegistration
    } catch (error) {
      return rejectWithValue('Пользователь уже зарегистрирован')
    }
  }
)
