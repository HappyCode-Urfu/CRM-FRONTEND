import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from 'http/index.ts'

interface RegistrationState {
  isLoading: boolean
  isError: boolean
}

const initialState: RegistrationState = {
  isLoading: false,
  isError: false,
}

interface UserData {
  firstName: string
  lastName: string
  middleName: string
  email: string
  password: string
}

export const registerUser = createAsyncThunk<
  void,
  UserData,
  { rejectValue: string }
>(
  'registrationSlice/register',
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const response = await $api.post('/register', userData)
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue('Пользователь уже зарегистрирован')
    }
  }
)

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.isError = false
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default registrationSlice.reducer
