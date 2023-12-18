import React from 'react'
import s from './WeekHeader.module.scss'
// import { Button } from 'components/UI/Button/Button.tsx'

interface WeekHeaderProps {
  selectedWeek: Date
  onPrevWeek: () => void
  onNextWeek: () => void
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({
  selectedWeek,
  // onPrevWeek,
  // onNextWeek,
}) => {
  const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const renderWeekDays = () => {
    const weekStart = new Date(selectedWeek)
    const weekDays = []

    for (let i = 0; i < 7; i++) {
      const day = new Date()
      day.setDate(weekStart.getDate() + i)
      const isToday = isSameDay(day, new Date())
      const weekdayIndex = (day.getDay() + 6) % 7

      weekDays.push(
        <div key={i} className={`${s.day}`}>
          <div className={`${s.dayActiveBorder} ${isToday ? s.active : ''}`}>
            <span>{weekdays[weekdayIndex]}</span>
            <span>{day.getDate()}</span>
          </div>
        </div>
      )
    }

    return weekDays
  }

  return (
    <div className={s.header}>
      <div className={s.selectors}>
        {/*<Button onClick={onPrevWeek}>&lt;</Button>*/}
        {/*<Button onClick={onNextWeek}>&gt;</Button>*/}
      </div>
      <div className={s.days}>{renderWeekDays()}</div>
    </div>
  )
}
