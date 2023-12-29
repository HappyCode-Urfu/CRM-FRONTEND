import s from './Navbar.module.scss'
import { CABINET_ROUTE } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { eventSlice } from 'store/reducers/Events/EventSlice.ts'
import { WidgetsButton } from 'components/UI/WidgetsButton/WidgetsButton.tsx'
import { NavLink } from 'react-router-dom'
import { ServiceRoute } from 'layouts/Navbar/routing.ts'
import { Button } from 'components/UI/Button/Button.tsx'
import { memo } from 'react'

export const Navbar = memo(() => {
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
        <WidgetsButton name={'Настройки записи'} router={ServiceRoute} />
      </div>
      <Button>Выйти из профиля</Button>
    </div>
  )
})
