import React from 'react'
import s from './WeekHeader.module.scss'

interface WeekHeaderProps {
  selectedWeek: Date
  onPrevWeek: () => void
  onNextWeek: () => void
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({
  selectedWeek,
  onPrevWeek,
  onNextWeek,
}) => {
  const weekdays = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']

  const renderWeekDays = () => {
    const weekStart = new Date(selectedWeek)
    const weekDays = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      const isActive = day.getDay() === new Date().getDay()

      weekDays.push(
        <div key={i} className={`${s.day} ${isActive ? s.active : ''}`}>
          <span>{weekdays[i]}</span>
          <span>{day.getDate()}</span>
        </div>
      )
    }

    return weekDays
  }

  return (
    <div className={s.header}>
      <div className={s.selectors}>
        <button onClick={onPrevWeek}>&lt;</button>
        <button onClick={onNextWeek}>&gt;</button>
      </div>
      <div className={s.days}>{renderWeekDays()}</div>
    </div>
  )
}
