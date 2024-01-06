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
  SERVICE_COMPANY_ROUTE,
} from 'utils/constsRoutes.ts'
import { lazy } from 'react'

const InformationPage = lazy(
  () => import('pages/auth/InformationPage/InformationPage.tsx')
)
const InfoLogin = lazy(() => import('pages/auth/infoLogin/InfoLogin.tsx'))
const NotFound = lazy(() => import('pages/notFound/NotFound.tsx'))
const Login = lazy(() => import('pages/auth/login/Login.tsx'))
const Cabinet = lazy(() => import('pages/cabinet/Cabinet.tsx'))
const Companies = lazy(() => import('pages/companies/Companies.tsx'))
const CategoryCompany = lazy(
  () => import('pages/companies/CategoryCompany/CategoryCompany.tsx')
)
const ServiceCompany = lazy(
  () => import('pages/companies/ServiceCompany/ServiceCompany.tsx')
)
const ServiceIdPage = lazy(
  () => import('pages/companies/ServiceCompany/ServiceIdPage/ServiceIdPage.tsx')
)
const Main = lazy(() => import('pages/main/Main.tsx'))
const Employees = lazy(() => import('pages/employees/Employees.tsx'))
const Services = lazy(() => import('pages/services/Services.tsx'))
const WorkSchedule = lazy(() => import('pages/workSchedule/WorkSchedule.tsx'))
const Registration = lazy(() => import('pages/registration/Registration.tsx'))
const ForgotPassword = lazy(() => import('pages/auth/forgotPassword/ForgotPassword.tsx'))
const ConfirmPassword = lazy(
  () => import('pages/auth/confirmPassword/ConfirmPassword.tsx')
)

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
    path: COMPANIES_ROUTE + '/:id',
    Component: Companies,
  },
  {
    path: CATEGORY_COMPANY + '/:id',
    Component: CategoryCompany,
  },
  {
    path: SERVICE_COMPANY + '/:id',
    Component: ServiceCompany,
  },
  {
    path: SERVICE_COMPANY_ROUTE + '/:id',
    Component: ServiceIdPage,
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
