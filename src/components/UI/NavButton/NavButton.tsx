import { FC, MouseEventHandler, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import s from './NavButton.module.scss'

interface IProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>
  route: string
  children: ReactNode
}

export const NavButton: FC<IProps> = ({ onClick, route, children }) => {
  return (
    <NavLink onClick={onClick} className={s.container} to={route}>
      {children}
    </NavLink>
  )
}
