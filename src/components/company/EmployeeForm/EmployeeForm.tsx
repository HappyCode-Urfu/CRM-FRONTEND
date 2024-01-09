import s from 'components/company/ServiceForm/CreateForm/CreateForm.module.scss'
import { FormEvent, useState } from 'react'
import { useTypedDispatch } from 'hooks/redux.ts'
import { daysNumb, IEmployee } from 'models/IEmployee.ts'
import {
  addEmployee,
  editEmployee,
} from 'store/reducers/Departaments/DepartmentActionCreators.ts'

interface IProps {
  id: string | undefined
  type: string
  employeeId?: string | undefined
  employee?: IEmployee<daysNumb>
}

export const EmployeeForm = ({ id, employee, employeeId, type }: IProps) => {
  const dispatch = useTypedDispatch()
  const [useData, setUseData] = useState({
    name: employee?.name ?? '',
    email: employee?.email ?? '',
    workDays: employee?.workDays ?? [],
    workDaysList: [
      {
        value: '0',
        label: 'ВС',
      },
      {
        value: '1',
        label: 'ПН',
      },
      {
        value: '2',
        label: 'ВТ',
      },
      {
        value: '3',
        label: 'СР',
      },
      {
        value: '4',
        label: 'ЧТ',
      },
      {
        value: '5',
        label: 'ПТ',
        s,
      },
      {
        value: '6',
        label: 'СБ',
      },
    ],
    workMode:
      employee?.workMode !== null
        ? {
            startTime: employee?.workMode.startTime,
            endTime: employee?.workMode.endTime,
          }
        : {
            startTime: '',
            endTime: '',
          },
  })

  const handleDaySelection = (value: daysNumb) => {
    const selectedDays = useData.workDays.includes(value as daysNumb)
      ? useData.workDays.filter((day) => day !== value)
      : [...useData.workDays, value as daysNumb]

    setUseData({ ...useData, workDays: selectedDays })
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IEmployee<daysNumb> = {
      name: useData.name,
      email: useData.email,
      workDays: useData.workDays,
      workMode: {
        startTime: useData.workMode.startTime,
        endTime: useData.workMode.endTime,
      },
    }
    dispatch(addEmployee({ departmentId: id, data }))
  }

  const handleEditFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IEmployee<daysNumb> = {
      id: employeeId,
      name: useData.name,
      email: useData.email,
      workDays: useData.workDays,
      workMode: {
        startTime: useData.workMode.startTime,
        endTime: useData.workMode.endTime,
      },
    }
    dispatch(editEmployee({ departmentId: id, data }))
  }

  return (
    <form
      className={s.form}
      onSubmit={type === 'CreateEmployee' ? handleFormSubmit : handleEditFormSubmit}
    >
      <div className={s.formGroup}>
        <label htmlFor="name">Имя Сотрудника</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="name"
            value={useData.name}
            onChange={(e) => setUseData({ ...useData, name: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="description">Почта</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="description"
            value={useData.email}
            onChange={(e) => setUseData({ ...useData, email: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="priceFrom">Начало Рабочего Дня</label>
        <div className={s.InputBlock}>
          <input
            type="time"
            id="priceFrom"
            value={useData.workMode.startTime}
            onChange={(e) =>
              setUseData({
                ...useData,
                workMode: { ...useData.workMode, startTime: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="priceTo">Конец рабочего Дня</label>
        <div className={s.InputBlock}>
          <input
            type="time"
            id="priceTo"
            value={useData.workMode.endTime}
            onChange={(e) =>
              setUseData({
                ...useData,
                workMode: { ...useData.workMode, endTime: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="workDays">Дни Работы</label>
        {useData.workDaysList.map((day) => (
          <div key={day.value} className={s.InputBlock}>
            <label htmlFor={`workDay${day.value}`}>
              <input
                type="checkbox"
                id={`workDay${day.value}`}
                checked={useData.workDays.includes(day.value as daysNumb)}
                onChange={() => handleDaySelection(day.value as daysNumb)}
              />
              {day.label}
            </label>
          </div>
        ))}
      </div>

      <button type="submit">
        {type === 'CreateEmployee' ? 'Отправить' : 'Обновить'}
      </button>
    </form>
  )
}
