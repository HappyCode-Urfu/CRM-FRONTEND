import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IService } from 'models/IService.ts'
import {
  getAllServices,
  getIdService,
  addImageService,
  delIdService,
  updateService,
  delImageService,
  createService,
} from 'store/reducers/Service/ServiceActionCreators.ts'

interface ServiceState {
  data: IService[]
  dataId: IService
  isLoading: boolean
  error: string
}

const initialState: ServiceState = {
  data: [],
  dataId: {
    id: '',
    name: '',
    priceFrom: 0,
    priceTo: 0,
    duration: '',
    isOnlineAvailable: false,
    onlineNameRecord: '',
    description: '',
    serviceType: '',
    imageUrl: '',
    downloadLink: '',
  },
  isLoading: false,
  error: '',
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllServices.fulfilled.type]: (state, action: PayloadAction<IService[]>) => {
      state.data = action.payload
      state.isLoading = false
      state.error = ''
    },
    [getAllServices.pending.type]: (state) => {
      state.isLoading = true
    },
    [getAllServices.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getIdService.fulfilled.type]: (state, action: PayloadAction<IService>) => {
      state.dataId = action.payload
      state.isLoading = false
      state.error = ''
    },
    [getIdService.pending.type]: (state) => {
      state.isLoading = true
    },
    [getIdService.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [createService.fulfilled.type]: (state, action: PayloadAction<IService>) => {
      state.data.push(action.payload)
      state.isLoading = false
      state.error = ''
    },
    [createService.pending.type]: (state) => {
      state.isLoading = true
    },
    [createService.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [updateService.fulfilled.type]: (state, action: PayloadAction<IService>) => {
      state.dataId.name = action.payload.name
      state.dataId.priceFrom = action.payload.priceFrom
      state.dataId.priceTo = action.payload.priceTo
      state.dataId.duration = action.payload.duration
      state.dataId.isOnlineAvailable = action.payload.isOnlineAvailable
      state.dataId.onlineNameRecord = action.payload.onlineNameRecord
      state.dataId.description = action.payload.description
      state.dataId.serviceType = action.payload.serviceType
      state.dataId.imageUrl = action.payload.imageUrl
      state.dataId.downloadLink = action.payload.downloadLink
      state.isLoading = false
      state.error = ''
    },
    [updateService.pending.type]: (state) => {
      state.isLoading = true
    },
    [updateService.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [delIdService.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((id) => id.id !== action.payload)
      state.isLoading = false
      state.error = ''
    },
    [delIdService.pending.type]: (state) => {
      state.isLoading = true
    },
    [delIdService.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    // TODO Доделать добавление картинки
    [addImageService.fulfilled.type]: (state, action: PayloadAction<IService>) => {
      state.dataId = action.payload
      state.isLoading = false
      state.error = ''
    },
    [addImageService.pending.type]: (state) => {
      state.isLoading = true
    },
    [addImageService.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    // TODO Доделать удаление картинки
    [delImageService.fulfilled.type]: (state, action: PayloadAction<IService>) => {
      state.dataId = action.payload
      state.isLoading = false
      state.error = ''
    },
    [delImageService.pending.type]: (state) => {
      state.isLoading = true
    },
    [delImageService.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default serviceSlice.reducer
