import { useForms } from '../index.ts'
import s from './CreateForm.module.scss'
import React from 'react'
import { Select } from 'components/UI/Select/Select.tsx'

interface IProps {
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const CreateForm: React.FC<IProps> = ({ hoveredColumn, hoveredTime }) => {
  const { useData, setUseData, handleSubmit, handleSelectEmployeeChange, EmployeeList } =
    useForms({ hoveredColumn, hoveredTime })

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.formGroup}>
        <label htmlFor="task">Название задачи</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="task"
            value={useData.serviceName}
            onChange={(e) => setUseData({ ...useData, serviceName: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="date">Дата проведения</label>
        <div className={s.InputBlock}>
          <input
            type="date"
            id="date"
            value={useData.visitDate}
            onChange={(e) => setUseData({ ...useData, visitDate: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="startTime">Время начала задачи</label>
        <div className={s.InputBlock}>
          <input
            type="time"
            id="startTime"
            value={useData.startTime}
            onChange={(e) => setUseData({ ...useData, startTime: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="endTime">Время окончания задачи</label>
        <div className={s.InputBlock}>
          <input
            type="time"
            id="endTime"
            value={useData.endTime}
            onChange={(e) => setUseData({ ...useData, endTime: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="task">Имя Клиента</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="task"
            value={useData.clientName}
            onChange={(e) => setUseData({ ...useData, clientName: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="task">Почта Клиента</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="task"
            value={useData.clientEmail}
            onChange={(e) => setUseData({ ...useData, clientEmail: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="task">Номер телефона Клиента</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="task"
            value={useData.clientPhoneNumber}
            onChange={(e) =>
              setUseData({ ...useData, clientPhoneNumber: e.target.value })
            }
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <div className={s.InputBlock}>
          <Select
            children={'Сотрудник'}
            value={useData.employeeId}
            options={EmployeeList}
            onChange={handleSelectEmployeeChange}
          />
        </div>
      </div>

      <button type="submit">Отправить</button>
    </form>
  )
}
