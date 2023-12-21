import { createAsyncThunk } from '@reduxjs/toolkit'
import { $api } from 'http/index.ts'

export const getAllCategories = createAsyncThunk(
  'categories/getAll',
  async ({ departmentId }: { departmentId: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.get(`/categories/${departmentId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

interface IProps {
  departmentId: string | undefined
  name: string
}

export const createCategory = createAsyncThunk(
  'categories/Post',
  async ({ departmentId, name }: IProps, thunkAPI) => {
    try {
      const response = await $api.post(`/categories/${departmentId}`, {
        name,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/Put',
  async ({ departmentId, name }: IProps, thunkAPI) => {
    try {
      const response = await $api.put(`/categories/${departmentId}`, {
        name,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

export const delIdCategory = createAsyncThunk(
  'categories/delId',
  async ({ departmentId }: { departmentId: string }, thunkAPI) => {
    try {
      const response = await $api.delete(`/categories/${departmentId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)
