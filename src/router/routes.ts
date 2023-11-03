import { Cabinet, Login, Main, Registration } from 'pages'
import {
  CABINET_ROUTE,
  LOGIN,
  MAIN_ROUTE,
  REGISTRATION,
} from 'utils/constsRoutes.ts'

export const authRoutes = [
  {
    path: CABINET_ROUTE,
    Component: Cabinet,
  },
]

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: LOGIN,
    Component: Login,
  },
  {
    path: REGISTRATION,
    Component: Registration,
  },
]
