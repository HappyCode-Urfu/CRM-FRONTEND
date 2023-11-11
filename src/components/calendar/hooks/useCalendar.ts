import { eventSlice } from 'store/reducers/Events/EventSlice.ts'
import { useAppDispatch, useAppSelector } from 'hooks/redux.ts'

export const UseCalendar = () => {
  const { dateSelect } = useAppSelector((state) => state.eventReducer)
  const { selectDate } = eventSlice.actions
  const dispatch = useAppDispatch()

  const handlePrevWeek = () => {
    const newWeek = new Date(dateSelect)
    newWeek.setDate(dateSelect.getDate() - 7)
    dispatch(selectDate(newWeek))
  }

  const handleNextWeek = () => {
    const newWeek = new Date(dateSelect)
    newWeek.setDate(dateSelect.getDate() + 7)
    dispatch(selectDate(newWeek))
  }

  return {
    dateSelect,
    handlePrevWeek,
    handleNextWeek,
  }
}
