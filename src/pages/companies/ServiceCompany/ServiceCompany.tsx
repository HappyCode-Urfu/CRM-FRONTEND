import s from './ServiceCompany.module.scss'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { useEffect, useState } from 'react'
import {
  delIdService,
  getAllServices,
} from 'store/reducers/Service/ServiceActionCreators.ts'
import { useParams } from 'react-router-dom'
import { Loading } from 'components/loading/Loading.tsx'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { SERVICE_COMPANY_ROUTE } from 'utils/constsRoutes.ts'
import { Button } from 'components/UI/Button/Button.tsx'
import { ServiceForm } from 'components/company/ServiceForm/ServiceForm.tsx'
import { getAllEmployee } from 'store/reducers/Departaments/DepartmentActionCreators.ts'

const ServiceCompany = () => {
  const dispatch = useTypedDispatch()
  const { data, isLoading, error } = useTypedSelector((state) => state.serviceReducer)
  const { id } = useParams()
  const departId = JSON.parse(localStorage.getItem('departmentId') || '')
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
  }

  useEffect(() => {
    dispatch(getAllEmployee({ departmentId: departId }))
  }, [dispatch, departId])

  useEffect(() => {
    dispatch(getAllServices({ categoryId: id }))
  }, [dispatch, id])

  return (
    <div className={s.container}>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.title}>
            <h2>Услуги:</h2>
            <Button children={'Создать'} onClick={() => openForm('create')} />
          </div>
          <div className={s.list}>
            {data.length == 0 && <h2>Услуги отсутствуют</h2>}
            {data.map((res) => (
              <div className={s.element} key={res.id}>
                {res.name}
                <div className={s.buttons}>
                  <NavButton
                    route={SERVICE_COMPANY_ROUTE + '/' + res.id}
                    children={'Посмотреть'}
                  />
                  <Button
                    children={'Удалить'}
                    onClick={() => dispatch(delIdService({ Id: res.id }))}
                  />
                </div>
              </div>
            ))}
          </div>
          <ServiceForm
            id={id}
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

export default ServiceCompany
