import { $api } from '../../../http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEvents } from 'models/IEvents.ts'

interface IGetAll {
  departmentId: string | undefined
  startDate: string
  endDate: string
}

export const getAllSessions = createAsyncThunk(
  'events/getAll',
  async ({ endDate, startDate, departmentId }: IGetAll, thunkAPI) => {
    try {
      const response = await $api.get(`/sessions/all/${departmentId}`, {
        params: { startDate, endDate },
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить события')
    }
  }
)

export const getIdSessions = createAsyncThunk(
  'events/getId',
  async ({ sessionId }: { sessionId: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.get(`/sessions/${sessionId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

interface IPostSession {
  departmentId: string | undefined
  data: IEvents
}

export const postSession = createAsyncThunk(
  'event/post',
  async ({ departmentId, data }: IPostSession, thunkAPI) => {
    try {
      const response = await $api.post<IEvents>(`/sessions/${departmentId}`, {
        serviceId: data.serviceId,
        visitDate: data.visitDate,
        startTime: data.startTime,
        endTime: data.endTime,
        employeeId: data.employeeId,
        clientName: data.clientName,
        clientPhoneNumber: data.clientPhoneNumber,
        clientEmail: data.clientEmail,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать событие')
    }
  }
)

interface IPutSession {
  sessionsId: string | undefined
  data: IEvents
}

export const putSession = createAsyncThunk(
  'event/put',
  async ({ sessionsId, data }: IPutSession, thunkAPI) => {
    try {
      const response = await $api.put<IEvents>(`/sessions/${sessionsId}`, {
        serviceId: data.serviceId,
        visitDate: data.visitDate,
        startTime: data.startTime,
        endTime: data.endTime,
        employeeId: data.employeeId,
        clientName: data.clientName,
        clientPhoneNumber: data.clientPhoneNumber,
        clientEmail: data.clientEmail,
      })
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать событие')
    }
  }
)

export const delSession = createAsyncThunk(
  'event/put',
  async ({ sessionsId }: { sessionsId: string | undefined }, thunkAPI) => {
    try {
      const response = await $api.delete<IEvents>(`/sessions/${sessionsId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать событие')
    }
  }
)
