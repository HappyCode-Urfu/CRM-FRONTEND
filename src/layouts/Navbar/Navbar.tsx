import s from './Navbar.module.scss'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { useAppDispatch, useAppSelector } from 'hooks/redux.ts'
import { eventSlice } from 'store/reducers/Events/EventSlice.ts'
import { WidgetsButton } from 'components/UI/WidgetsButton/WidgetsButton.tsx'
import { Button } from 'components/UI/Button/Button.tsx'

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
      <div className={s.widgets}>
        <h3 style={{ color: 'white' }}>Виджеты:</h3>
        <WidgetsButton name={'Сотрудники'} />
        <WidgetsButton name={'Клиенты'} />
        <WidgetsButton name={'Аналитика'} />
        <WidgetsButton name={'Финансы'} />
        <WidgetsButton name={'Склад'} />
        <WidgetsButton name={'Онлайн запись'} />
      </div>
      <div className={s.other}>
        <Button children={'Выйти'} />
      </div>
    </div>
  )
}
