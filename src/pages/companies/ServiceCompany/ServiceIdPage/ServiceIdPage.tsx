import s from './ServiceIdPage.module.scss'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIdService } from 'store/reducers/Service/ServiceActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { Button } from 'components/UI/Button/Button.tsx'
import { ServiceForm } from 'components/company/ServiceForm/ServiceForm.tsx'
import { Option } from 'components/UI/Select/Select.tsx'

const ServiceIdPage = () => {
  const dispatch = useTypedDispatch()
  const EmployeeList = JSON.parse(localStorage.getItem('Employee') || '[]') as Option[]
  const { dataId, isLoading, error } = useTypedSelector((state) => state.serviceReducer)
  const { id } = useParams()
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
  }

  useEffect(() => {
    dispatch(getIdService({ serviceId: id }))
  }, [dispatch, id])

  return (
    <div className={s.container}>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.title}>
            <h2>{dataId?.name}</h2>
          </div>
          <div className={s.info}>
            <div className={s.main}>
              <h2>Информация</h2>
              <span>Описание: {dataId?.description}</span>
              <span>
                Цена: {dataId?.priceFrom} Руб.{' '}
                {dataId?.priceTo !== 0 ? `- ${dataId.priceTo} Руб.` : ''}
              </span>
              <span>Часы работы: {dataId.duration.split('.')[0]}</span>
              <span>Есть Онлайн запись?: {dataId.isOnlineAvailable ? 'Да' : 'Нет'}</span>
              {dataId.isOnlineAvailable && (
                <span>Название Онлайн записи: {dataId.onlineNameRecord}</span>
              )}
              <span>
                Сoтрудник:{' '}
                {EmployeeList.find((res) => res.value == dataId.employeeId)?.label}
              </span>
              <span>
                Формат: {dataId.serviceType === 'group' ? 'Групповой' : 'Индивидуальный'}
              </span>
              <Button children={'Ред.'} onClick={() => openForm('edit')} />
            </div>
          </div>
          <ServiceForm
            id={id}
            dataId={dataId}
            showModal={showModal}
            setShowModal={setShowModal}
            formType={formType}
            setFormType={setFormType}
          />
        </>
      )}
    </div>
  )
}

export default ServiceIdPage
