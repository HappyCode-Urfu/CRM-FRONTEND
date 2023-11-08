import { Cabinet, Companies, Main } from 'pages'
import {
  CABINET_ROUTE,
  MAIN_ROUTE,
  COMPANIES_ROUTE,
} from 'utils/constsRoutes.ts'

export const authRoutes = [
  {
    path: CABINET_ROUTE,
    Component: Cabinet,
  },
  {
    path: COMPANIES_ROUTE,
    Component: Companies,
  },
]

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
]
