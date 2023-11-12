import s from './WidgetsButton.module.scss'
import React, { useState } from 'react'

interface IProps {
  name: string
}

export const WidgetsButton: React.FC<IProps> = ({ name }) => {
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
      <ul className={s.dropdownMenu}>
        <li>Button 1</li>
        <li>Button 2</li>
        <li>Button 3</li>
      </ul>
    </div>
  )
}
