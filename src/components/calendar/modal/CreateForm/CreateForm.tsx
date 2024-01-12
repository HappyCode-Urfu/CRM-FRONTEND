import { useForms } from '../index.ts'
import s from './CreateForm.module.scss'
import React, { ChangeEvent, useEffect } from 'react'
import { Select } from 'components/UI/Select/Select.tsx'
import { delSession } from 'store/reducers/Events/ActionCreators.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { getAllEmployee } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { getAllCategories } from 'store/reducers/Category/CategoryActionCreators.ts'
import {
  getAllServices,
  getIdService,
} from 'store/reducers/Service/ServiceActionCreators.ts'
import { categorySlice } from 'store/reducers/Category/CategorySlice.ts'

interface IProps {
  formType: string
  hoveredTime?: string | null
  hoveredColumn?: string | null
}

export const CreateForm: React.FC<IProps> = ({
  hoveredColumn,
  hoveredTime,
  formType,
}) => {
  const dispatch = useTypedDispatch()
  const { dataId, employees } = useTypedSelector((state) => state.departmentReducer)

  const { data: categoryList, categoryId } = useTypedSelector(
    (state) => state.categoryReducer
  )
  const { selectCategoryId } = categorySlice.actions
  const { dataId: ServiceId } = useTypedSelector((state) => state.serviceReducer)

  const CategoryList = categoryList.map((val) => ({
    value: val.id,
    label: val.name,
  }))

  const handleSelectCategoryId = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectCategoryId(event.target.value))
  }

  const employeesList = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }))

  const filterEmploy = employeesList.filter((val) => val.value === ServiceId.employeeId)

  useEffect(() => {
    dispatch(getAllCategories({ departmentId: dataId?.id }))
    dispatch(getAllEmployee({ departmentId: dataId?.id }))
  }, [dispatch, dataId])

  const {
    useData,
    setUseData,
    handleSubmit,
    handleSelectEmployeeChange,
    handleEditSubmit,
    ServiceList,
    handleSelectServiceNameChange,
  } = useForms({ hoveredColumn, hoveredTime, formType })

  useEffect(() => {
    dispatch(getAllServices({ categoryId: categoryId }))
  }, [categoryId, dispatch])

  useEffect(() => {
    dispatch(getIdService({ serviceId: useData.serviceName }))
  }, [dispatch, useData.serviceName])

  return (
    <form
      className={s.form}
      onSubmit={formType === 'create' ? handleSubmit : handleEditSubmit}
    >
      {formType === 'create' && (
        <div className={s.formGroup}>
          <label htmlFor="task">Выберите Категорию</label>
          <div className={s.InputBlock}>
            <Select
              def={true}
              value={categoryId}
              options={CategoryList}
              onChange={handleSelectCategoryId}
            />
          </div>
        </div>
      )}

      {formType === 'create' && categoryId !== undefined && (
        <div className={s.formGroup}>
          <label htmlFor="task">Выберите Услугу</label>
          <div className={s.InputBlock}>
            <Select
              def={true}
              value={useData.serviceId}
              options={ServiceList}
              onChange={handleSelectServiceNameChange}
            />
          </div>
        </div>
      )}

      {formType === 'create' && useData.serviceName !== '' && (
        <div className={s.formGroup}>
          <label htmlFor="task">Выберите Сотрудника</label>
          <div className={s.InputBlock}>
            <Select
              def={true}
              value={useData.employeeId}
              options={filterEmploy}
              onChange={handleSelectEmployeeChange}
            />
          </div>
        </div>
      )}

      {formType === 'edit' && (
        <div className={s.formGroup}>
          <label htmlFor="task">Имя Сотрудника</label>
          <div className={s.InputBlock}>
            <Select
              def={false}
              disabled={true}
              value={useData.employeeId}
              options={employeesList}
              onChange={handleSelectEmployeeChange}
            />
          </div>
        </div>
      )}

      {formType === 'edit' && (
        <div className={s.formGroup}>
          <label htmlFor="task">Название услуги</label>
          <div className={s.InputBlock}>
            <input type="text" id="name" disabled value={useData.serviceName} />
          </div>
        </div>
      )}

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

      {formType === 'edit' && (
        <button
          type="button"
          onClick={() => dispatch(delSession({ sessionsId: useData.sessionId }))}
        >
          Удалить
        </button>
      )}
      <button type="submit">{formType === 'create' ? 'Отправить' : 'Обновить'}</button>
    </form>
  )
}
