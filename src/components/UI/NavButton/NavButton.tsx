import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import s from './NavButton.module.scss'

interface IProps {
  route: string
  children: ReactNode
}

export const NavButton: FC<IProps> = ({ route, children }) => {
  return (
    <NavLink className={s.container} to={route}>
      {children}
    </NavLink>
  )
}
