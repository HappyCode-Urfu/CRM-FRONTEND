import { useState } from 'react'
import s from './WorkSchedule.module.scss'
import { Button } from 'components/UI/Button/Button.tsx'

const WorkSchedule = () => {
  const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
  const employees = [
    'Сотрудник 1',
    'Сотрудник 2',
    'Сотрудник 3',
    'Сотрудник 1',
    'Сотрудник 2',
    'Сотрудник 3',
    'Сотрудник 1',
    'Сотрудник 2',
    'Сотрудник 3',
    'Сотрудник 1',
    'Сотрудник 2',
    'Сотрудник 3',
  ]

  const [currentMonth, setCurrentMonth] = useState(new Date())

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const renderWeekDays = () => {
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate()
    const weekDays = []

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
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

  const renderDaysEmployee = () => {
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate()
    const days = []

    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(<div key={i} className={s.dayEmployee}></div>)
    }

    return days
  }

  const handlePreviousMonth = () => {
    const previousMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    )
    setCurrentMonth(previousMonth)
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    setCurrentMonth(nextMonth)
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.selectors}>
          <Button onClick={handlePreviousMonth}>&lt;</Button>
          <span>{currentMonth.toLocaleString('default', { month: 'long' })}</span>
          <span>{currentMonth.toLocaleString('default', { year: 'numeric' })}</span>
          <Button onClick={handleNextMonth}>&gt;</Button>
        </div>
        <div className={s.days}>{renderWeekDays()}</div>
      </div>
      <div className={s.graphics}>
        {employees.map((employee) => (
          <div key={employee} className={s.employ}>
            <div className={s.name}>
              <span>{employee}</span>
            </div>
            <div className={s.daysEmployee}>{renderDaysEmployee()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkSchedule
