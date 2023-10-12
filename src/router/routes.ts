import { Cabinet, Main } from 'pages'
import { CABINET_ROUTE, MAIN_ROUTE } from 'utils/constsRoutes.ts'

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
]
