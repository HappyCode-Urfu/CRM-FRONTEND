import { eventSlice } from 'store/reducers/Events/EventSlice.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'

export const UseCalendar = () => {
  const { dateSelect } = useTypedSelector((state) => state.eventReducer)
  const { selectDate } = eventSlice.actions
  const dispatch = useTypedDispatch()

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
