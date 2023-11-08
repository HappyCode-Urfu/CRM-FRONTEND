import s from './Navbar.module.scss'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { useState } from 'react'
import { NavButton } from 'components/cabinet-module/UI/NavButton/NavButton.tsx'

export const Navbar = () => {
  const [selectedDate, setSelectedDay] = useState(new Date())
  return (
    <div className={s.container}>
      <div className={s.cabinet}>
        <NavButton route={CABINET_ROUTE} children={'Личный кабинет'} />
      </div>
      <MiniCalendar
        selectedDate={selectedDate}
        selectDate={(date) => setSelectedDay(date)}
      />
    </div>
  )
}
