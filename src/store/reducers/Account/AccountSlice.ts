import { IAccount } from 'models/Account.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getInfoUser,
  sendAvatar,
  updateUserInfo,
} from 'store/reducers/Account/AccountActionCreator.ts'

interface AccountState {
  data: IAccount
  isLoading: boolean
  error: string
}

const initialState: AccountState = {
  data: {
    id: '',
    name: '',
    surname: '',
    patronymic: '',
    city: '',
    description: '',
    avatarUrl: '',
    downloadLink: '',
    email: '',
    emailConfirmed: false,
  },
  isLoading: false,
  error: '',
}

const AccountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getInfoUser.fulfilled.type]: (state, action: PayloadAction<IAccount>) => {
      state.isLoading = false
      state.error = ''
      state.data.id = action.payload.id
      state.data.name = action.payload.name
      state.data.surname = action.payload.surname
      state.data.patronymic = action.payload.patronymic
      state.data.city = action.payload.city
      state.data.description = action.payload.description
      state.data.avatarUrl = action.payload.avatarUrl
      state.data.downloadLink = action.payload.downloadLink
      state.data.email = action.payload.email
      state.data.emailConfirmed = action.payload.emailConfirmed
    },
    [getInfoUser.pending.type]: (state) => {
      state.isLoading = true
    },
    [getInfoUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [sendAvatar.pending.type]: (state) => {
      state.isLoading = true
    },
    [sendAvatar.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.data.downloadLink = action.payload
      state.isLoading = false
    },
    [updateUserInfo.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateUserInfo.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
  },
})
export default AccountSlice.reducer
