import { IEvents } from 'models/IEvents.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getAllSessions,
  getIdSessions,
  putSession,
  delSession,
  postSession,
} from './ActionCreators.ts'

interface EventState {
  events: IEvents[]
  eventId: IEvents
  dateSelect: Date
  isLoading: boolean
  error: string
}

const initialState: EventState = {
  events: [],
  eventId: {
    sessionId: '',
    serviceName: '',
    serviceId: '',
    visitDate: '',
    startTime: '',
    endTime: '',
    employeeId: '',
    clientName: '',
    clientPhoneNumber: '',
    clientEmail: '',
  },
  dateSelect: new Date(),
  isLoading: false,
  error: '',
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    selectDate(state, action: PayloadAction<Date>) {
      state.dateSelect = action.payload
    },
    selectTask(state, action: PayloadAction<IEvents>) {
      state.eventId.sessionId = action.payload.sessionId
      state.eventId.serviceId = action.payload.serviceId
      state.eventId.serviceName = action.payload.serviceName
      state.eventId.visitDate = action.payload.visitDate
      state.eventId.startTime = action.payload.startTime
      state.eventId.endTime = action.payload.endTime
      state.eventId.employeeId = action.payload.employeeId
      state.eventId.clientName = action.payload.clientName
      state.eventId.clientPhoneNumber = action.payload.clientPhoneNumber
      state.eventId.clientEmail = action.payload.clientEmail
    },
  },
  extraReducers: {
    [getAllSessions.fulfilled.type]: (state, action: PayloadAction<IEvents[]>) => {
      state.isLoading = false
      state.error = ''
      state.events = action.payload
    },
    [getAllSessions.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllSessions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getIdSessions.fulfilled.type]: (state, action: PayloadAction<IEvents>) => {
      state.isLoading = false
      state.error = ''
      state.eventId.sessionId = action.payload.sessionId
      state.eventId.serviceName = action.payload.serviceName
      state.eventId.visitDate = action.payload.visitDate
      state.eventId.startTime = action.payload.startTime
      state.eventId.endTime = action.payload.endTime
      state.eventId.employeeId = action.payload.employeeId
      state.eventId.clientName = action.payload.clientName
      state.eventId.clientPhoneNumber = action.payload.clientPhoneNumber
      state.eventId.clientEmail = action.payload.clientEmail
    },
    [getIdSessions.pending.type]: (state) => {
      state.isLoading = true
    },
    [getIdSessions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [postSession.fulfilled.type]: (state, action: PayloadAction<IEvents>) => {
      state.isLoading = false
      state.error = ''
      state.events.push(action.payload)
    },
    [postSession.pending.type]: (state) => {
      state.isLoading = true
    },
    [postSession.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [putSession.fulfilled.type]: (state, action: PayloadAction<IEvents>) => {
      state.isLoading = false
      state.error = ''
      state.events.find((id) => {
        if (id.sessionId === action.payload.sessionId) {
          id.serviceId = action.payload.serviceId
          id.serviceName = action.payload.serviceName
          id.visitDate = action.payload.visitDate
          id.startTime = action.payload.startTime
          id.endTime = action.payload.endTime
          id.employeeId = action.payload.employeeId
          id.clientName = action.payload.clientName
          id.clientPhoneNumber = action.payload.clientPhoneNumber
          id.clientEmail = action.payload.clientEmail
        }
      })
    },
    [putSession.pending.type]: (state) => {
      state.isLoading = true
    },
    [putSession.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [delSession.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((id) => id.sessionId !== action.payload)
      state.isLoading = false
      state.error = ''
    },
    [delSession.pending.type]: (state) => {
      state.isLoading = true
    },
    [delSession.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default eventSlice.reducer
