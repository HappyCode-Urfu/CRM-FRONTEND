import { CABINET_ROUTE, MAIN_ROUTE } from '../utils/constsRoutes.ts'
import Main from '../pages/main'
import Cabinet from '../pages/cabinet'
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
