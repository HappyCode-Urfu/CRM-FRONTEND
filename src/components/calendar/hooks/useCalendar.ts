import { useState } from 'react'

const UseCalendar = () => {
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date())

  const handlePrevWeek = () => {
    const newWeek = new Date(selectedWeek)
    newWeek.setDate(selectedWeek.getDate() - 7)
    setSelectedWeek(newWeek)
  }

  const handleNextWeek = () => {
    const newWeek = new Date(selectedWeek)
    newWeek.setDate(selectedWeek.getDate() + 7)
    setSelectedWeek(newWeek)
  }

  return {
    selectedWeek,
    handlePrevWeek,
    handleNextWeek,
  }
}

export default UseCalendar
