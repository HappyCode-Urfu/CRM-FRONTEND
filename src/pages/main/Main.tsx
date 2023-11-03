import Calendar from 'components/calendar/Calendar.tsx'
import s from './Main.module.scss'

export const Main = () => {
  return (
    <div className={s.container}>
      <Calendar />
    </div>
  )
}
