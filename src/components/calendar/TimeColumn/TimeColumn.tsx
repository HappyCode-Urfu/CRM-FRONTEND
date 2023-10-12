import React from 'react'
import s from './TimeColumn.module.scss'

const TimeColumn: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className={s.timeColumn}>
      {hours.map((hour) => (
        <div key={hour} className={s.hour}>{`${hour}:00`}</div>
      ))}
    </div>
  )
}

export default TimeColumn
