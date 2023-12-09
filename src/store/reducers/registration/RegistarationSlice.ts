import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerUser } from 'store/reducers/registration/RegistrationActionCreator.ts'
import { ResponseRegistration } from 'models/Registration.ts'

interface RegistrationState {
  isLoading: boolean
  isError: boolean
  user: ResponseRegistration | null
}

const initialState: RegistrationState = {
  isLoading: false,
  isError: false,
  user: null,
}

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<ResponseRegistration>
    ) => {
      state.isLoading = false
      state.isError = false
      state.user = action.payload
    },
    [registerUser.rejected.type]: (state) => {
      state.isLoading = false
      state.isError = true
    },
  },
})

export default registrationSlice.reducer
