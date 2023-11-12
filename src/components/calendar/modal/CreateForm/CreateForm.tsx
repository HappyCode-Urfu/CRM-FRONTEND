import { useForms } from '../index.ts'
import s from './CreateForm.module.scss'
import React from 'react'

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const CreateForm: React.FC<IProps> = ({
  setShowModal,
  hoveredColumn,
  hoveredTime,
}) => {
  const {
    task,
    setTask,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    errors,
    handleSubmit,
  } = useForms({ setShowModal, hoveredColumn, hoveredTime })

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.formGroup}>
        <label htmlFor="task">Название задачи</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {errors.task && <span className={s.error}>{errors.task}</span>}
      </div>

      <div className={s.formGroup}>
        <label htmlFor="date">Дата проведения</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <span className={s.error}>{errors.date}</span>}
      </div>

      <div className={s.formGroup}>
        <label htmlFor="startTime">Время начала задачи</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        {errors.startTime && (
          <span className={s.error}>{errors.startTime}</span>
        )}
      </div>

      <div className={s.formGroup}>
        <label htmlFor="endTime">Время окончания задачи</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        {errors.endTime && <span className={s.error}>{errors.endTime}</span>}
      </div>

      <button type="submit">Отправить</button>
    </form>
  )
}
