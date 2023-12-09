import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postDepartment } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { IDepartment } from 'models/IDepartment.ts'

interface DepartmentState {
  data: IDepartment[]
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
  },
})

export default departmentSlice.reducer
