import s from './CreateForm.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Option, Select } from 'components/UI/Select/Select.tsx'
import { useTypedDispatch } from 'hooks/redux.ts'
import { IService } from 'models/IService.ts'
import {
  createService,
  updateService,
} from 'store/reducers/Service/ServiceActionCreators.ts'

interface IProps {
  id: string | undefined
  dataId?: IService
  type: string
}

export const ServiceCreateForm = ({ id, dataId, type }: IProps) => {
  const dispatch = useTypedDispatch()
  const EmployeeList = JSON.parse(localStorage.getItem('Employee') || '[]') as Option[]
  console.log(EmployeeList)
  const [serviceData, setServiceData] = useState({
    name: dataId?.name ?? '',
    priceFrom: dataId?.priceFrom ?? 0,
    priceTo: dataId?.priceTo ?? 0,
    duration: dataId?.duration.split('.')[0] ?? '',
    isOnlineAvailable: dataId?.isOnlineAvailable ?? false,
    onlineNameRecord: dataId?.onlineNameRecord ?? '',
    description: dataId?.description ?? '',
    serviceType: dataId?.serviceType ?? '0',
    list: [
      {
        value: '0',
        label: 'Индивидуальная',
      },
      {
        value: '1',
        label: 'Групповая',
      },
    ],
    employeeList: EmployeeList,
    employeeId: dataId?.employeeId ?? '',
  })

  console.log(serviceData)

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setServiceData({ ...serviceData, serviceType: event.target.value })
  }

  const handleSelectEmployeeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setServiceData({ ...serviceData, employeeId: event.target.value })
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IService = {
      employeeId: serviceData.employeeId,
      name: serviceData.name,
      priceFrom: serviceData.priceFrom,
      priceTo: serviceData.priceTo,
      duration: serviceData.duration,
      isOnlineAvailable: serviceData.isOnlineAvailable,
      onlineNameRecord: serviceData.onlineNameRecord,
      description: serviceData.description,
      serviceType: serviceData.serviceType,
    }
    dispatch(createService({ Id: id, data }))
  }

  const handleEditFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data: IService = {
      employeeId: serviceData.employeeId,
      name: serviceData.name,
      priceFrom: serviceData.priceFrom,
      priceTo: serviceData.priceTo,
      duration: serviceData.duration,
      isOnlineAvailable: serviceData.isOnlineAvailable,
      onlineNameRecord: serviceData.onlineNameRecord,
      description: serviceData.description,
      serviceType: serviceData.serviceType,
    }
    dispatch(updateService({ Id: dataId?.id, data }))
  }

  return (
    <form
      className={s.form}
      onSubmit={type === 'create' ? handleFormSubmit : handleEditFormSubmit}
    >
      <div className={s.formGroup}>
        <label htmlFor="name">Название Услуги</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="name"
            value={serviceData.name}
            onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="description">Описание услуги (Необязательно)</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="description"
            value={serviceData.description}
            onChange={(e) =>
              setServiceData({ ...serviceData, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="priceFrom">Цена от</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="priceFrom"
            value={serviceData.priceFrom}
            onChange={(e) =>
              setServiceData({ ...serviceData, priceFrom: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="priceTo">Цена до (Необязательно)</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="priceTo"
            value={serviceData.priceTo}
            onChange={(e) =>
              setServiceData({ ...serviceData, priceTo: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <label htmlFor="duration">Количество часов</label>
        <div className={s.InputBlock}>
          <input
            type="text"
            id="duration"
            value={serviceData.duration}
            onChange={(e) => setServiceData({ ...serviceData, duration: e.target.value })}
          />
        </div>
      </div>

      <div className={s.formGroup}>
        <input
          type="checkbox"
          id="duration"
          checked={serviceData.isOnlineAvailable}
          onChange={() =>
            setServiceData({
              ...serviceData,
              isOnlineAvailable: !serviceData.isOnlineAvailable,
            })
          }
        />
        <label htmlFor="duration">Запись в Онлайн формате?</label>
      </div>

      {serviceData.isOnlineAvailable && (
        <div className={s.formGroup}>
          <label htmlFor="onlineNameRecord">Название для Записи</label>
          <div className={s.InputBlock}>
            <input
              type="text"
              id="onlineNameRecord"
              value={serviceData.onlineNameRecord}
              onChange={(e) =>
                setServiceData({ ...serviceData, onlineNameRecord: e.target.value })
              }
            />
          </div>
        </div>
      )}

      <Select
        children={'Формат'}
        value={serviceData.serviceType}
        options={serviceData.list}
        onChange={handleSelectChange}
      />

      <Select
        children={'Сотрудник'}
        value={serviceData.employeeId}
        options={serviceData.employeeList}
        onChange={handleSelectEmployeeChange}
      />

      <button type="submit">{type === 'create' ? 'Отправить' : 'Обновить'}</button>
    </form>
  )
}
