import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  postDepartment,
  getDepartment,
  delImageDepartment,
  addImageDepartment,
} from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { IDepartmentsList } from 'models/IDepartment.ts'

interface DepartmentState {
  data: IDepartmentsList[]
  isLoading: boolean
  error: string
}

const initialState: DepartmentState = {
  data: [],
  isLoading: false,
  error: '',
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: {
    [getDepartment.fulfilled.type]: (
      state,
      action: PayloadAction<IDepartmentsList[]>
    ) => {
      state.data = action.payload
      state.isLoading = false
      state.error = ''
    },
    [getDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [getDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [postDepartment.fulfilled.type]: (state) => {
      state.isLoading = false
      state.error = ''
    },
    [postDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [postDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [addImageDepartment.fulfilled.type]: (state) => {
      state.isLoading = false
      state.error = ''
    },
    [addImageDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [addImageDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [delImageDepartment.fulfilled.type]: (state) => {
      state.isLoading = false
      state.error = ''
    },
    [delImageDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [delImageDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default departmentSlice.reducer
