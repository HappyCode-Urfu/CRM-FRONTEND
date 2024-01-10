import s from './CategoryCompany.module.scss'
import { Button } from 'components/UI/Button/Button.tsx'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { memo, useEffect, useState } from 'react'
import {
  createCategory,
  delIdCategory,
  getAllCategories,
} from 'store/reducers/Category/CategoryActionCreators.ts'
import Map from 'components/map/Map.tsx'
import { useParams } from 'react-router-dom'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { CABINET_ROUTE, COMPANIES_ROUTE, SERVICE_COMPANY } from 'utils/constsRoutes.ts'
import {
  delEmployeeId,
  getAllEmployee,
  getIdDepartment,
} from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { Input } from 'components/UI/input/Input.tsx'
import { ServiceForm } from 'components/company/ServiceForm/ServiceForm.tsx'
import { jwtDecode, JwtPayload } from 'jwt-decode'

const CategoryCompany = memo(() => {
  const dispatch = useTypedDispatch()
  const { data, isLoading, error } = useTypedSelector((state) => state.categoryReducer)
  const { dataId, employees } = useTypedSelector((state) => state.departmentReducer)
  const { id } = useParams()
  const [formType, setFormType] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [employeeId, setEmployeeId] = useState<string | undefined>('')
  let accId: JwtPayload
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('Access token not found')
  }
  // eslint-disable-next-line prefer-const
  accId = jwtDecode(accessToken)
  const openForm = (type: string) => {
    setFormType(type)
    setShowModal(true)
  }
  const [useData, setUseData] = useState({
    isNewCategory: false,
    newCategoryName: '',
  })

  const handleAddCategory = () => {
    setUseData({ ...useData, isNewCategory: true })
  }

  const handleCancelAddCategory = () => {
    setUseData((prevState) => ({
      ...prevState,
      isNewCategory: false,
      newCategoryName: '',
    }))
  }

  const handleSaveCategory = () => {
    dispatch(createCategory({ departmentId: id, name: useData.newCategoryName }))
    handleCancelAddCategory()
  }

  useEffect(() => {
    dispatch(getIdDepartment({ Id: id }))
    dispatch(getAllCategories({ departmentId: id }))
    dispatch(getAllEmployee({ departmentId: id }))
  }, [dispatch, id])

  return (
    <>
      <div className={s.container}>
        {isLoading && <Loading />}
        {error && <h1>{error}</h1>}
        {!isLoading && !error && (
          <>
            <div className={s.title}>
              <h2>{dataId?.name}</h2>
              <NavButton route={CABINET_ROUTE} children={'Вернуться'} />
            </div>
            <div className={s.info}>
              <div className={s.main}>
                <h2>Информация</h2>
                <span>Сфера деятельности: {dataId?.businessArea}</span>
                <span>Номер телефона: {dataId?.phoneNumber}</span>
                <span>Адрес: {dataId?.location.address}</span>
                <span>
                  Режим работы: {dataId?.workMode.startTime} - {dataId?.workMode.endTime}
                </span>
                <NavButton
                  route={COMPANIES_ROUTE + '/' + id}
                  children={'Редактировать'}
                />
              </div>
              <div className={s.map}>
                <Map
                  latitude={dataId?.location.latitude}
                  longitude={dataId?.location.longitude}
                />
              </div>
            </div>
            <div className={s.list}>
              {employees.length == 0 ? (
                <>
                  <h2>Сотрудники отсутствуют</h2>
                  <Button
                    children={'Добавить'}
                    onClick={() => openForm('CreateEmployee')}
                  />
                </>
              ) : (
                <>
                  <div className={s.title}>
                    <h2>Сотрудники:</h2>
                    {employees.length != 0 && (
                      <Button
                        children={'Добавить'}
                        onClick={() => openForm('CreateEmployee')}
                      />
                    )}
                  </div>
                  {employees.map((res) => (
                    <div className={s.element}>
                      {res.name}
                      <div>
                        <Button
                          children={'Ред.'}
                          onClick={() => {
                            openForm('EditEmployee')
                            setEmployeeId(res.id)
                          }}
                        />
                        {accId.sub !== res.id && (
                          <Button
                            children={'Удалить'}
                            onClick={() =>
                              dispatch(
                                delEmployeeId({ departmentId: id, employeeId: res.id })
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className={s.list}>
              {data.length == 0 && !useData.isNewCategory ? (
                <>
                  <h2>Категории отсутствуют</h2>
                  <Button children={'Создать'} onClick={handleAddCategory} />
                </>
              ) : (
                <>
                  <div className={s.title}>
                    <h2>Категории:</h2>
                    {data.length != 0 && (
                      <Button children={'Создать'} onClick={handleAddCategory} />
                    )}
                  </div>
                  {useData.isNewCategory && (
                    <div className={s.element}>
                      <Input
                        children={'Введите название'}
                        value={useData.newCategoryName}
                        onChange={(e) =>
                          setUseData({ ...useData, newCategoryName: e.target.value })
                        }
                      />
                      <div>
                        <Button onClick={handleSaveCategory}>Сохранить</Button>
                        <Button onClick={handleCancelAddCategory}>Отменить</Button>
                      </div>
                    </div>
                  )}
                  {data.map((res) => (
                    <div className={s.element} key={res.id}>
                      {res.name}
                      <div className={s.buttons}>
                        <NavButton
                          route={SERVICE_COMPANY + '/' + res.id}
                          children={'Посмотреть'}
                        />
                        <Button
                          children={'Удалить'}
                          onClick={() =>
                            dispatch(delIdCategory({ departmentId: res.id }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <ServiceForm
        id={id}
        employeeId={employeeId}
        employee={employees}
        showModal={showModal}
        setShowModal={setShowModal}
        formType={formType}
        setFormType={setFormType}
      />
    </>
  )
})

export default CategoryCompany
