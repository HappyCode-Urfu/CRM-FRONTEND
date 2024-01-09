import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  postDepartment,
  getDepartment,
  delIdDepartment,
  updateDepartment,
  delImageDepartment,
  addImageDepartment,
  getIdDepartment,
  getAllEmployee,
  addEmployee,
  editEmployee,
  delEmployeeId,
} from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { IDepartment } from 'models/IDepartment.ts'
import { daysNumb, IEmployee } from 'models/IEmployee.ts'

interface DepartmentState {
  data: IDepartment[]
  dataId: IDepartment | undefined
  employees: IEmployee<daysNumb>[]
  isLoading: boolean
  error: string
}

const initialState: DepartmentState = {
  data: [],
  isLoading: false,
  employees: [],
  error: '',
  dataId: {
    id: '',
    name: '',
    businessArea: '',
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    phoneNumber: '',
    workMode: {
      startTime: '',
      endTime: '',
    },
  },
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    selectId(state, action: PayloadAction<string | undefined>) {
      state.dataId = state.data.find((item) => item.id === action.payload)
    },
  },
  extraReducers: {
    [getDepartment.fulfilled.type]: (state, action: PayloadAction<[]>) => {
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
    [getIdDepartment.fulfilled.type]: (state, action: PayloadAction<IDepartment>) => {
      state.dataId = action.payload
      state.isLoading = false
      state.error = ''
    },
    [getIdDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [getIdDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [postDepartment.fulfilled.type]: (state, action: PayloadAction<IDepartment>) => {
      state.data.push(action.payload)
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
    [updateDepartment.fulfilled.type]: (state, action: PayloadAction<IDepartment>) => {
      state.data.find((id) => {
        if (id.id == action.payload.id) {
          id.name = action.payload.name
        }
      })
      state.isLoading = false
      state.error = ''
    },
    [updateDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [delIdDepartment.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((id) => id.id !== action.payload)
      state.isLoading = false
      state.error = ''
    },
    [delIdDepartment.pending.type]: (state) => {
      state.isLoading = true
    },
    [delIdDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    // TODO Доделать добавление картинки
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
    // TODO Доделать удаление картинки
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
    [getAllEmployee.fulfilled.type]: (
      state,
      action: PayloadAction<IEmployee<daysNumb>[]>
    ) => {
      state.employees = action.payload
      state.isLoading = false
      state.error = ''
    },
    [getAllEmployee.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllEmployee.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [addEmployee.fulfilled.type]: (state, action: PayloadAction<IEmployee<daysNumb>>) => {
      state.employees.push(action.payload)
      state.isLoading = false
      state.error = ''
    },
    [addEmployee.pending.type]: (state) => {
      state.isLoading = true
    },
    [addEmployee.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [editEmployee.fulfilled.type]: (
      state,
      action: PayloadAction<IEmployee<daysNumb>>
    ) => {
      state.employees.find((id) => {
        if (id.id == action.payload.id) {
          id.name = action.payload.name
          id.email = action.payload.email
          id.workDays = action.payload.workDays
          id.workMode.startTime = action.payload.workMode.startTime
          id.workMode.endTime = action.payload.workMode.endTime
        }
      })
      state.isLoading = false
      state.error = ''
    },
    [editEmployee.pending.type]: (state) => {
      state.isLoading = true
    },
    [editEmployee.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [delEmployeeId.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter((id) => id.id !== action.payload)
      state.isLoading = false
      state.error = ''
    },
    [delEmployeeId.pending.type]: (state) => {
      state.isLoading = true
    },
    [delEmployeeId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default departmentSlice.reducer
