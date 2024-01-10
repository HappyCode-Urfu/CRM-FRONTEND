import s from './Navbar.module.scss'
import { CABINET_ROUTE, LOGIN } from 'utils/constsRoutes.ts'
import { MiniCalendar } from 'components/miniCalendar/MiniCalendar.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { eventSlice } from 'store/reducers/Events/EventSlice.ts'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'components/UI/Button/Button.tsx'
import { memo } from 'react'

export const Navbar = memo(() => {
  const navigate = useNavigate()
  const { dateSelect, events } = useTypedSelector((state) => state.eventReducer)
  const { selectDate } = eventSlice.actions
  const dispatch = useTypedDispatch()

  const logoutAction = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate(LOGIN)
  }

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
      <div className={s.widgets}></div>
      <Button onClick={logoutAction}>Выйти из профиля</Button>
    </div>
  )
})
