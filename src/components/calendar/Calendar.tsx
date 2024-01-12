import { TaskGrid, WeekHeader, TimeColumn, UseCalendar } from './index.ts'
import s from './Calendar.module.scss'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { getAllSessions } from 'store/reducers/Events/ActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'
import {
  getAllEmployee,
  getDepartment,
} from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { Select } from 'components/UI/Select/Select.tsx'
import { departmentSlice } from 'store/reducers/Departaments/DepartmentSlice.ts'

const Calendar = memo(() => {
  const dispatch = useTypedDispatch()
  const { handlePrevWeek, handleNextWeek, dateSelect } = UseCalendar()
  const { events, error, isLoading } = useTypedSelector((state) => state.eventReducer)
  const { data } = useTypedSelector((state) => state.departmentReducer)
  const { selectId } = departmentSlice.actions
  const [departmentId, setDepartmentId] = useState('')
  const departmentList = data.map((val) => ({
    value: val.id,
    label: val.name,
  }))

  const handleSelectDepartmentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDepartmentId(event.target.value)
  }

  function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getAllEmployee({ departmentId: departmentId !== '' ? departmentId : data[0]?.id })
    )
    dispatch(selectId(departmentId))
  }, [dispatch, departmentId, selectId, data])

  useEffect(() => {
    const startDate = new Date(dateSelect.getFullYear(), dateSelect.getMonth(), 1)
    const endDate = new Date(dateSelect.getFullYear(), dateSelect.getMonth() + 1, 0)
    dispatch(
      getAllSessions({
        departmentId: departmentId !== '' ? departmentId : data[0]?.id,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      })
    )
  }, [dispatch, dateSelect, departmentId, data])

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
          <div className={s.filter}>
            <Select
              defaultValue={departmentId}
              value={departmentId}
              def={false}
              options={departmentList}
              onChange={handleSelectDepartmentChange}
            />
          </div>
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
