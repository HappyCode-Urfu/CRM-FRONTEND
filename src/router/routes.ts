import {
  Cabinet,
  ConfirmPassword,
  ForgotPassword,
  Login,
  Main,
  Registration,
  Companies,
} from 'pages'
import {
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
