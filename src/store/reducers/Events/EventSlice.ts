import { IEvents } from '../../../models/IEvents.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchEvents } from './ActionCreators.ts'

interface EventState {
  events: IEvents[]
  isLoading: boolean
  error: string
}

const initialState: EventState = {
  events: [],
  isLoading: false,
  error: '',
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.fulfilled.type]: (state, action: PayloadAction<IEvents[]>) => {
      state.isLoading = false
      state.error = ''
      state.events = action.payload
    },
    [fetchEvents.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchEvents.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default eventSlice.reducer
