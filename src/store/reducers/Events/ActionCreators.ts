import { $api } from '../../../http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEvents } from 'models/IEvents.ts'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface IGetAll {
  startDate: string
  endDate: string
}

export const getAllSessions = createAsyncThunk(
  'events/getAll',
  async ({ endDate, startDate }: IGetAll, thunkAPI) => {
    try {
      let token: JwtPayload
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        return new Error('Access token not found')
      }
      // eslint-disable-next-line prefer-const
      token = jwtDecode(accessToken)
      const response = await $api.get(`/sessions/all/${token.sub}`, {
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
  async ({ sessionId }: { sessionId: string }, thunkAPI) => {
    try {
      const response = await $api.get(`/sessions/${sessionId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить событие')
    }
  }
)

interface IPostSession {
  departmentId: string
  data: IEvents
}

export const postSession = createAsyncThunk(
  'event/post',
  async ({ departmentId, data }: IPostSession, thunkAPI) => {
    try {
      const response = await $api.post<IEvents>(`/sessions/${departmentId}`, {
        serviceName: data.serviceName,
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
  sessionsId: string
  data: IEvents
}

export const putSession = createAsyncThunk(
  'event/put',
  async ({ sessionsId, data }: IPutSession, thunkAPI) => {
    try {
      const response = await $api.put<IEvents>(`/sessions/${sessionsId}`, {
        serviceName: data.serviceName,
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
  async ({ sessionsId }: { sessionsId: string }, thunkAPI) => {
    try {
      const response = await $api.delete<IEvents>(`/sessions/${sessionsId}`)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать событие')
    }
  }
)
