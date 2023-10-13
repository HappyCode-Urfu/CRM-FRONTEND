import React from 'react'
import s from './TaskGrid.module.scss'

interface TaskGridProps {
  selectedWeek: Date
}

const TaskGrid: React.FC<TaskGridProps> = ({ selectedWeek }) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(selectedWeek)
    day.setDate(selectedWeek.getDate() + i)
    return day
  })

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className={s.task}>
      {days.map((day) => (
        <div key={day.toISOString()} className={s.day}>
          {hours.map((hour) => (
            <div key={hour} className={s.hour}>
              {minutes.map((minute) => (
                <div key={minute} className={s.minutes}></div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TaskGrid
