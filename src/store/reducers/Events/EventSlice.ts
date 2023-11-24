import { IEvents } from 'models/IEvents.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAllEvents, postEvent } from './ActionCreators.ts'

interface EventState {
  events: IEvents[]
  dateSelect: Date
  isLoading: boolean
  error: string
}

const initialState: EventState = {
  events: [],
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
  },
  extraReducers: {
    [getAllEvents.fulfilled.type]: (state, action: PayloadAction<IEvents[]>) => {
      state.isLoading = false
      state.error = ''
      state.events = action.payload
    },
    [getAllEvents.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllEvents.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [postEvent.fulfilled.type]: (state, action: PayloadAction<IEvents>) => {
      state.isLoading = false
      state.error = ''
      state.events.push(action.payload)
    },
    [postEvent.pending.type]: (state) => {
      state.isLoading = true
    },
    [postEvent.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default eventSlice.reducer
