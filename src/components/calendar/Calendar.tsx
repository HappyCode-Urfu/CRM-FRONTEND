import { TaskGrid, WeekHeader, TimeColumn, UseCalendar } from './index.ts'
import s from './Calendar.module.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/redux.ts'
import { getAllEvents } from 'store/reducers/Events/ActionCreators.ts'

const Calendar = () => {
  const dispatch = useAppDispatch()
  const { selectedWeek, handlePrevWeek, handleNextWeek } = UseCalendar()
  const { events, error, isLoading } = useAppSelector(
    (state) => state.eventReducer
  )

  useEffect(() => {
    dispatch(getAllEvents())
  }, [])

  return (
    <div className={s.calendar}>
      {isLoading && <h1>Идет загрузка</h1>}
      {error && <h1>{error}</h1>}
      <WeekHeader
        selectedWeek={selectedWeek}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      <div className={s.body}>
        <TimeColumn />
        <TaskGrid events={events} selectedWeek={selectedWeek} />
      </div>
    </div>
  )
}

export default Calendar
