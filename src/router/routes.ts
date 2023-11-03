import { CABINET_ROUTE, MAIN_ROUTE } from 'utils/constsRoutes.ts'
import { Cabinet, Main } from 'pages'
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
