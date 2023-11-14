import { combineReducers, configureStore } from '@reduxjs/toolkit'
import eventReducer from './reducers/Events/EventSlice.ts'
import departmentReducer from './reducers/Departaments/DepartmentSlice.ts'

const rootReducer = combineReducers({
  eventReducer,
  departmentReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
