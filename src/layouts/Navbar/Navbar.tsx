import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'

export const Navbar = () => {
  return (
    <div className={s.container}>
      <div className={s.cabinet}>
        <NavLink to={CABINET_ROUTE}>Личный кабинет</NavLink>
      </div>
    </div>
  )
}
