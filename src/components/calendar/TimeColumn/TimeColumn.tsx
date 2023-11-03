import React from 'react'
import s from './TimeColumn.module.scss'
import { hours } from 'utils/constsTimes.ts'

export const TimeColumn: React.FC = () => {
  return (
    <div className={s.timeColumn}>
      {hours.map((hour) => (
        <div key={hour} className={s.hour}>{`${hour}:00`}</div>
      ))}
    </div>
  )
}
