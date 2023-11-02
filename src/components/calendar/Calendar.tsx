import WeekHeader from './WeekHeader/WeekHeader.tsx'
import TimeColumn from './TimeColumn/TimeColumn.tsx'
import TaskGrid from './TaskGrid/TaskGrid.tsx'
import s from './Calendar.module.scss'
import useCalendar from './hooks/useCalendar.ts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { useEffect } from 'react'
import { getAllEvents } from '../../store/reducers/Events/ActionCreators.ts'

const Calendar = () => {
  const dispatch = useAppDispatch()
  const { selectedWeek, handlePrevWeek, handleNextWeek } = useCalendar()
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
