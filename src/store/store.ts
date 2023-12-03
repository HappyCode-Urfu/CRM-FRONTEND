import { combineReducers, configureStore } from '@reduxjs/toolkit'
import registrationSlice from './reducers/registration/RegistarationSlice.ts'
import authSlice from './reducers/auth/AuthSlice.ts'
import eventReducer from './reducers/Events/EventSlice.ts'
import departmentReducer from './reducers/Departaments/DepartmentSlice.ts'
import accountReducer from './reducers/Account/AccountSlice.ts'

const rootReducer = combineReducers({
  registrationSlice,
  authSlice,
  eventReducer,
  departmentReducer,
  accountReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
