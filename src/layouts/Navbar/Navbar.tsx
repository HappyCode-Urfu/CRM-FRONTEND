import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { useState } from 'react'

export const Navbar = () => {
  const [selectedDate, setSelectedDay] = useState(new Date())
  return (
    <div className={s.container}>
      <div className={s.cabinet}>
        <NavLink to={CABINET_ROUTE}>Личный кабинет</NavLink>
      </div>
      <MiniCalendar
        selectedDate={selectedDate}
        selectDate={(date) => setSelectedDay(date)}
      />
    </div>
  )
}
