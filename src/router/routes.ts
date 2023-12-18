import {
  Cabinet,
  ConfirmPassword,
  ForgotPassword,
  Login,
  Main,
  Registration,
  Companies,
  Employees,
  Services,
  WorkSchedule,
  CategoryCompany,
  ServiceCompany,
} from 'pages'
import {
  SERVICE_COMPANY,
  COMPANIES_ROUTE,
  CABINET_ROUTE,
  CONFIRM_PASSWORD,
  FORGOT_PASSWORD,
  INFO_LOGIN,
  INFORMATION_USER,
  LOGIN,
  MAIN_ROUTE,
  NOT_FOUND,
  REGISTRATION,
  EMPLOYEES_ROUTE,
  SERVICES_ROUTE,
  WORK_SCHEDULE_ROUTE,
  CATEGORY_COMPANY,
} from 'utils/constsRoutes.ts'
import InformationPage from 'pages/auth/InformationPage/InformationPage.tsx'
import InfoLogin from 'pages/auth/infoLogin/InfoLogin.tsx'
import NotFound from 'pages/notFound/NotFound.tsx'

export const authRoutes = [
  {
    path: CABINET_ROUTE,
    Component: Cabinet,
  },
  {
    path: COMPANIES_ROUTE,
    Component: Companies,
  },
  {
    path: CATEGORY_COMPANY,
    Component: CategoryCompany,
  },
  {
    path: SERVICE_COMPANY,
    Component: ServiceCompany,
  },
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: EMPLOYEES_ROUTE,
    Component: Employees,
  },
  {
    path: SERVICES_ROUTE,
    Component: Services,
  },
  {
    path: WORK_SCHEDULE_ROUTE,
    Component: WorkSchedule,
  },
]

export const publicRoutes = [
  {
    path: LOGIN,
    Component: Login,
  },
  {
    path: REGISTRATION,
    Component: Registration,
  },
  {
    path: FORGOT_PASSWORD,
    Component: ForgotPassword,
  },
  {
    path: CONFIRM_PASSWORD,
    Component: ConfirmPassword,
  },
  {
    path: INFORMATION_USER,
    Component: InformationPage,
  },
  {
    path: INFO_LOGIN,
    Component: InfoLogin,
  },
  {
    path: NOT_FOUND,
    Component: NotFound,
  },
]
