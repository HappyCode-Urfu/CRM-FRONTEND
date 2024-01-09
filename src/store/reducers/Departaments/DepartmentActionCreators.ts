import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDepartment } from 'models/IDepartment.ts'
import { $api } from 'http/index.ts'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { toast } from 'react-toastify'
import { daysNumb, IEmployee } from 'models/IEmployee.ts'

export const postDepartment = createAsyncThunk(
  'department/Create',
  async (
    { name, businessArea, workMode, phoneNumber, location }: IDepartment,
    thunkAPI
  ) => {
    try {
      let token: JwtPayload
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return new Error('Access token not found')
      }
      // eslint-disable-next-line prefer-const
      token = jwtDecode(accessToken)
      const response = await $api.post<IDepartment>(`/departments/${token.sub}`, {
        name,
        businessArea,
        location,
        phoneNumber,
        workMode,
      })
      toast('Филиал создан')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать филиал')
    }
  }
)

interface IProps {
  departmentId: string | undefined
  data: IDepartment
}

export const updateDepartment = createAsyncThunk(
  'department/Update',
  async ({ departmentId, data }: IProps, thunkAPI) => {
    try {
      const response = await $api.put<IDepartment>(`/departments/${departmentId}`, {
        name: data.name,
        businessArea: data.businessArea,
        location: data.location,
        phoneNumber: data.phoneNumber,
        workMode: data.workMode,
      })
      toast('Филиал обновлён')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать филиал')
    }
  }
)

export const delIdDepartment = createAsyncThunk(
  'department/Del',
  async ({ Id }: { Id: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.delete(`/departments/${Id}`)
      toast('Филиал удален')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

export const getDepartment = createAsyncThunk(
  'department/GetAll',
  async (_, thunkAPI) => {
    try {
      let token: JwtPayload
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return new Error('Access token not found')
      }
      // eslint-disable-next-line prefer-const
      token = jwtDecode(accessToken)
      const response = await $api.get(`/departments/${token.sub}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const getIdDepartment = createAsyncThunk(
  'department/GetId',
  async ({ Id }: { Id: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.get(`/departments/info/${Id}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const addImageDepartment = createAsyncThunk(
  'department/addImage',
  async (
    { departmentId, formData }: { formData: FormData; departmentId: string },
    thunkAPI
  ) => {
    try {
      const response = await $api.post(`/departments/files/${departmentId}`, {
        formData,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const delImageDepartment = createAsyncThunk(
  'department/delImage',
  async ({ departmentId }: { departmentId: string }, thunkAPI) => {
    try {
      const response = await $api.delete(`/departments/files/${departmentId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const addEmployee = createAsyncThunk(
  'employee/add',
  async (
    {
      departmentId,
      data,
    }: { departmentId: string | undefined; data: IEmployee<daysNumb> },
    thunkAPI
  ) => {
    try {
      const response = await $api.post<IEmployee<daysNumb>>(
        `/departments/employees/${departmentId}`,
        {
          name: data.name,
          email: data.email,
          workDays: data.workDays,
          workMode: data.workMode,
        }
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const editEmployee = createAsyncThunk(
  'employee/edit',
  async (
    {
      departmentId,
      data,
    }: { departmentId: string | undefined; data: IEmployee<daysNumb> },
    thunkAPI
  ) => {
    try {
      const response = await $api.put<IEmployee<daysNumb>>(
        `/departments/employee/${departmentId}`,
        {
          employeeId: data.id,
          name: data.name,
          email: data.email,
          workDays: data.workDays,
          workMode: data.workMode,
        }
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const getAllEmployee = createAsyncThunk(
  'employee/getAll',
  async ({ departmentId }: { departmentId: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.get(`/departments/employees/${departmentId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)

export const delEmployeeId = createAsyncThunk(
  'employee/delId',
  async (
    {
      departmentId,
      employeeId,
    }: { departmentId: string | undefined; employeeId: string | undefined },
    thunkAPI
  ) => {
    try {
      const response = await $api.delete(
        `/departments/employee/${departmentId}/${employeeId}`
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить список филиалов')
    }
  }
)
