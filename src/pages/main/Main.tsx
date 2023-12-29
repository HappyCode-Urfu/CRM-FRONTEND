import Calendar from 'components/calendar/Calendar.tsx'
import s from './Main.module.scss'
import { memo } from 'react'

const Main = memo(() => {
  return (
    <div className={s.container}>
      <Calendar />
    </div>
  )
})

export default Main
