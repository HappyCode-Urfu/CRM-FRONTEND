import s from './NotFound.module.scss'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { CABINET_ROUTE, LOGIN } from 'utils/constsRoutes.ts'
const NotFound = () => {
  return (
    <div className={s.container}>
      <h2>404</h2>
      <h3>Эта страница не найдена</h3>
      <span>
        Упс! Страница, которую вы ищете, не существует. Возможно, она была перемещена или
        удалена
      </span>
      <NavButton
        route={localStorage.getItem('access_token') ? CABINET_ROUTE : LOGIN}
        children={
          localStorage.getItem('access_token')
            ? 'Вернуться в кабинет'
            : 'Вернуться в авторизацию'
        }
      />
    </div>
  )
}

export default NotFound
