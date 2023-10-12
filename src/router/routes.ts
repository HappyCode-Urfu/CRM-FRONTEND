import { CABINET_ROUTE, MAIN_ROUTE } from '../utils/constsRoutes.ts'
import Main from '../pages/main'
import Cabinet from '../pages/cabinet'
export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
]

export const publicRoutes = [
  {
    path: CABINET_ROUTE,
    Component: Cabinet,
  },
]
