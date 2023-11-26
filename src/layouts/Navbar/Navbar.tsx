import s from './Navbar.module.scss'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { eventSlice } from 'store/reducers/Events/EventSlice.ts'
import { WidgetsButton } from 'components/UI/WidgetsButton/WidgetsButton.tsx'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  const { dateSelect, events } = useTypedSelector((state) => state.eventReducer)
  const { selectDate } = eventSlice.actions
  const dispatch = useTypedDispatch()

  return (
    <div className={s.container}>
      <div className={s.cabinet}>
        <NavLink
          className={s.buttonCabinet}
          to={CABINET_ROUTE}
          children={'Личный кабинет'}
        />
      </div>
      <MiniCalendar
        events={events}
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
    </div>
  )
}
