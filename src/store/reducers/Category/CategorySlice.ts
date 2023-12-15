import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getAllCategories,
  createCategory,
  updateCategory,
  delIdCategory,
} from 'store/reducers/Category/CategoryActionCreators.ts'

interface EventState {
  data: Data[]
  isLoading: boolean
  error: string
}

interface Data {
  id: string
  name: string
}

const initialState: EventState = {
  data: [],
  isLoading: false,
  error: '',
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCategories.fulfilled.type]: (state, action: PayloadAction<Data[]>) => {
      state.isLoading = false
      state.error = ''
      state.data = action.payload
    },
    [getAllCategories.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllCategories.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [createCategory.fulfilled.type]: (state) => {
      state.isLoading = false
      state.error = ''
    },
    [createCategory.pending.type]: (state) => {
      state.isLoading = true
    },
    [createCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [updateCategory.fulfilled.type]: (state) => {
      state.isLoading = false
      state.error = ''
    },
    [updateCategory.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [delIdCategory.fulfilled.type]: (state) => {
      state.isLoading = false
      state.error = ''
    },
    [delIdCategory.pending.type]: (state) => {
      state.isLoading = true
    },
    [delIdCategory.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default categorySlice.reducer
