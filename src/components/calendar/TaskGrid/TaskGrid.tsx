import React, { useState } from 'react'
import s from './TaskGrid.module.scss'
import { hours, minutes } from '../../../utils/constsTimes.ts'
import Modal from '../../modal/Modal.tsx'
import { IEvents } from '../../../models/IEvents.ts'

interface TaskGridProps {
  selectedWeek: Date
  events: IEvents[]
}

const TaskGrid: React.FC<TaskGridProps> = ({ selectedWeek, events }) => {
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)

  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(selectedWeek)
    day.setDate(selectedWeek.getDate() + i)
    return day
  })

  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
  }

  return (
    <div className={s.task}>
      {days.map((day) => (
        <div key={day.toISOString()} className={s.day}>
          {hours.map((hour) => (
            <div key={hour} className={s.hour}>
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={s.minutes}
                  onClick={() => openForm('create')}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        formType={formType}
        setFormType={setFormType}
      />
    </div>
  )
}

export default TaskGrid
