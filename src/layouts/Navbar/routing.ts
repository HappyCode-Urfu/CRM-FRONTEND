import {
  EMPLOYEES_ROUTE,
  SERVICES_ROUTE,
  WORK_SCHEDULE_ROUTE,
} from 'utils/constsRoutes.ts'

export const ServiceRoute = [
  {
    link: EMPLOYEES_ROUTE,
    name: 'Сотрудники',
  },
  {
    link: SERVICES_ROUTE,
    name: 'Услуги',
  },
  {
    link: WORK_SCHEDULE_ROUTE,
    name: 'График работы',
  },
]
