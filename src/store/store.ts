import { combineReducers, configureStore } from '@reduxjs/toolkit'
import registrationSlice from './reducers/RegistarationSlice.ts'
import authSlice from './reducers/auth/AuthSlice.ts'

const rootReducer = combineReducers({
  registration: registrationSlice,
  auth: authSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
