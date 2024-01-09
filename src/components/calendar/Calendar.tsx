import { TaskGrid, WeekHeader, TimeColumn, UseCalendar } from './index.ts'
import s from './Calendar.module.scss'
import { memo, useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { getAllSessions } from 'store/reducers/Events/ActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'

const Calendar = memo(() => {
  const dispatch = useTypedDispatch()
  const { handlePrevWeek, handleNextWeek, dateSelect } = UseCalendar()
  const { events, error, isLoading } = useTypedSelector((state) => state.eventReducer)

  function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const startDate = new Date(dateSelect.getFullYear(), dateSelect.getMonth(), 1)
    const endDate = new Date(dateSelect.getFullYear(), dateSelect.getMonth() + 1, 0)
    dispatch(
      getAllSessions({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      })
    )
  }, [dispatch, dateSelect])

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
})

export default Calendar
