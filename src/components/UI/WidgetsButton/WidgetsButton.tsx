import s from './WidgetsButton.module.scss'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface Router {
  link: string
  name: string
}

interface IProps {
  name: string
  router: Router[]
}

export const WidgetsButton: React.FC<IProps> = ({ name, router }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={`${s.dropdown} ${isOpen ? s.open : s.closing}`}
      style={{ marginBottom: `${isOpen ? '120px' : '0'}` }}
    >
      <button
        className={s.dropdownToggle}
        style={{
          borderRadius: `${isOpen ? '8px 8px 0 0' : '8px'}`,
        }}
        onClick={toggleMenu}
      >
        {name}
        <i className={s.arrowIcon}></i>
      </button>
      <div className={s.dropdownMenu}>
        {router.map((router) => (
          <NavLink className={s.navLink} to={router.link}>
            {router.name}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
