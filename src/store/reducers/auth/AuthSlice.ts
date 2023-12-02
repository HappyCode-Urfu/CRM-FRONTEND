import { createSlice } from '@reduxjs/toolkit'
import { login } from 'store/reducers/auth/AuthActionCreator.ts'
import { ResponseLogin } from 'models/Auth.ts'

export interface AuthState {
  isLoading: boolean
  isError: boolean
  user: ResponseLogin | null
}

export const initialState: AuthState = {
  isLoading: false,
  isError: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.isError = false
      state.user = action.payload
    },
    [login.rejected.type]: (state) => {
      state.isLoading = false
      state.isError = true
    },
  },
})

export default authSlice.reducer
