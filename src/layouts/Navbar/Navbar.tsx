import s from './Navbar.module.scss'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { NavButton } from 'components/cabinet-module/UI/NavButton/NavButton.tsx'
import { useAppDispatch, useAppSelector } from 'hooks/redux.ts'
import { eventSlice } from 'store/reducers/Events/EventSlice.ts'

export const Navbar = () => {
  const { dateSelect } = useAppSelector((state) => state.eventReducer)
  const { selectDate } = eventSlice.actions
  const dispatch = useAppDispatch()

  return (
    <div className={s.container}>
      <div className={s.cabinet}>
        <NavButton route={CABINET_ROUTE} children={'Личный кабинет'} />
      </div>
      <MiniCalendar
        selectedDate={dateSelect}
        selectDate={(date) => dispatch(selectDate(date))}
      />
    </div>
  )
}
