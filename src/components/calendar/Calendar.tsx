import React, { useState } from 'react'
import WeekHeader from './WeekHeader/WeekHeader.tsx'
import TimeColumn from './TimeColumn/TimeColumn.tsx'
import TaskGrid from './TaskGrid/TaskGrid.tsx'
import s from './Calendar.module.scss'

const Calendar: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date())

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

  return (
    <div className={s.calendar}>
      <WeekHeader
        selectedWeek={selectedWeek}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      <div className={s.body}>
        <TimeColumn />
        <TaskGrid selectedWeek={selectedWeek} />
      </div>
    </div>
  )
}

export default Calendar
