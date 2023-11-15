import { TaskGrid, WeekHeader, TimeColumn, UseCalendar } from './index.ts'
import s from './Calendar.module.scss'
import { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { getAllEvents } from 'store/reducers/Events/ActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'

const Calendar = () => {
  const dispatch = useTypedDispatch()
  const { handlePrevWeek, handleNextWeek, dateSelect } = UseCalendar()
  const { events, error, isLoading } = useTypedSelector((state) => state.eventReducer)

  useEffect(() => {
    dispatch(getAllEvents())
  }, [])

  return (
    <div className={s.calendar}>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <WeekHeader
            selectedWeek={dateSelect}
            onPrevWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
          />
          <div className={s.body}>
            <TimeColumn />
            <TaskGrid events={events} selectedWeek={dateSelect} />
          </div>
        </>
      )}
    </div>
  )
}

export default Calendar
